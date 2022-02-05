const express = require('express');
const router = express.Router();
const Subscriber = require('./../models/subscriber_model.js');
const subscriber_validation = require('./../validation/subscriber_validation.js');
const Email_list = require('./../models/subscriber_email_model.js');

//////////////////////////////////////////////////// CREATE TABLE(only test task's controller) ////////////////////////////////////////////
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

//////////////////////////////////////////////////// VALIDATE AND STORE SUBSCRIBER IN THE DATABASE /////////////////////////////////////
router.post('/new', async (req, res) => {

    //request's body
    const data = req.body;
    const email = data.email.toLowerCase();

    //validate email input and check if not colombian??
    const validation = await subscriber_validation.validate(data);

    if (validation.error) return res.status(400).json({ status: false, message: validation.error.details[0].message });

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

/////////////////////////////////////////////////////// GET LIST OF ALL SUBSCRIBERS AND FILTER THEM /////////////////////////////////////////////////////////////
router.get('/show/', async (req, res) => {

    const filter = req.query.filter;
    let data = null;

    //filter's conditions(name, date and default is date)
    switch (filter) {

        case 'name':
            data = await Subscriber.findAll({
                order: [
                    ['email', 'ASC']
                ]
            });
        break;

        case 'date':
            data = await Subscriber.findAll({
                order: [
                    ['createdAt', 'DESC']
                ]
            });
        break;

        default:
            data = await Subscriber.findAll({
                order: [
                    ['createdAt', 'DESC']
                ]
            });
         
    }

    //check if data is existent
    if (!data) return res.status(400).json({ status: false, message: 'Unable to retrieve data from the server'})

    //successful fetch
    return res.status(200).json({ status: true, result: data });

});

module.exports = router;