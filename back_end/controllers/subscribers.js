const express = require('express');
const router = express.Router();
const Subscriber = require('./../models/subscriber_model.js');
const subscriber_validation = require('./../validation/subscriber_validation.js');
const Email_list = require('./../models/subscriber_email_model.js');
const { sequelize } = require('./../database/database_connection.js');

//////////////////////////////////////////////////// CREATE TABLE(only test task's controller) ////////////////////////////////////////////////////////
router.post('/create_sync_table', async (req, res) => {

    //create new Subscriber table
    await Subscriber.sync()
        .then(status => console.log(status))
        .catch(err => console.log(err))

    //sync Subscriber table with model
    await Subscriber.sync({ alter: true })
        .then(status => console.log(status))
        .catch(err => console.log(err))

    //create new Email_list table
    await Email_list.sync()
        .then(status => console.log(status))
        .catch(err => console.log(err))

    //sync Email_list table with model
    await Email_list.sync({ alter: true })
        .then(status => console.log(status))
        .catch(err => console.log(err))

});

//////////////////////////////////////////////////// VALIDATE AND STORE SUBSCRIBER IN THE DATABASE /////////////////////////////////////////////////
router.post('/new', async (req, res) => {

    //request's body
    const data = req.body;
    let email = data.email;

    //validate email input and check if not colombian??
    const validation = await subscriber_validation.validate(data);

    if (validation.error) return res.status(300).json({ status: false, message: validation.error.details[0].message });

    //standartise case
    email = email.toLowerCase();

    //checks if subscriber's email is unique
    const exists = await Subscriber.findOne({
        where: {
            email: email
        }
    });

    if (exists) return res.status(400).json({ status: false, message: 'Email is already subscribed' });

    //store unique email providers in database
    const emailArr = email.split('@');
    const email_provider = emailArr.pop(); //get email provider with domain

    const NOTuniqueEmail = await Email_list.findOne({            //check if provider is unique
        where: {
            uniqueEmail: email_provider
        }
    });
                                          
    if (!NOTuniqueEmail) {
        try {
            await Email_list.create({                                                             //store unique provider in database
                uniqueEmail: email_provider
            })
        } catch (err) {
            return res.status(400).json({ status: false, message: "Subscription error"})        //abort if error
        }
    }

    //store subscriber after successful validation
    await Subscriber.create({ email: email })
        .then(status => { return res.status(200).json({ status: true, message: "Successful subscription" })})      //send success status
        .catch((err) => { return res.status(400).json({status: false,message: "Subscription error"})})             //send fail status
    
});

/////////////////////////////////////////////////////// GET LIST OF SUBSCRIBERS AND FILTER THEM /////////////////////////////////////////////////////////////
router.get('/show/', async (req, res) => {

    //get every possible queue or use default value
    const email = req.query.email || ''
    const order = req.query.order || 'createdAt'
    const direction = req.query.direction || 'DESC'


    try {

        //custom query for: filter, sort, order operations
        const [results, metadata] = await sequelize.query(`SELECT * from subscribers WHERE email LIKE "%${email}" ORDER BY ${order} ${direction}`);

        //get every email provider from database
        const providers = await Email_list.findAll({
            attributes: ['uniqueEmail']
        });

        //success status
        res.status(200).json({ status: true, provider: providers, result: results });

    } catch (err) {

        //fail status
        res.status(400).json({ status: false, message: err.message });

    }

});

///////////////////////////////////////////////////// DELETE LIST OF EMAILS FROM DATABASE /////////////////////////////////////////////////////////////
router.delete('/delete', async (req, res) => {

    //store subscription's ids in array ## json format - {emailsToDelete: [1,2,...n]}
    const emailsIDArr = req.body.emailsToDelete;

    //get every email provider from database
    const providers = await Email_list.findAll({
        attributes: ['uniqueEmail']
    });

    //destroy subscriptions
    const numberOFDestoyedRows = await Subscriber.destroy({
        where: {
            id: emailsIDArr
        }
    });

    if (numberOFDestoyedRows == 0 || !numberOFDestoyedRows) return res.status(400).json({status: false, message: "Nothing was deleted"});

    //iterate all provider in array

   /* 
      providers.map((provider) => {
        console.log(provider.uniqueEmail);
    });
   */

    //check if email provider exists in subscriber's table and destroy email provider if not

    for (let i = 0; i < providers.length; i++) {

        [results, metadata] = await sequelize.query(`SELECT email from subscribers where email like '%${providers[i].uniqueEmail}'`);

        //if subscriber with iterated provider is not existent anymore then destroy provider from email_lists table
        if (results.length == 0) {
            await Email_list.destroy({
                where: {
                    uniqueEmail: providers[i].uniqueEmail
                }
            });
        }
    }

    return res.status(200).json({ status: true, message: `Number of removed subscriptions: ${numberOFDestoyedRows}`});

});

module.exports = router;