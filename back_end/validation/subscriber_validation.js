const Joi = require('joi');

const subscriber_validation = Joi.object({
    email: Joi
        .string()
        .email({ minDomainSegments: 2 })
        .custom((value, helper) => {
            const emailArr = value.split('.');
            if (emailArr.pop() == 'co') return helper.message("We are not accepting subscriptions from Colombia emails.");
            return true
        })
});

//custom validation


module.exports = subscriber_validation;