'use strict'

var config = require('../config');
var sendgrid = require('sendgrid')(config.sendgridkey);

exports.send= async (to, subject, body) =>{
    await sendgrid.send({
        to: to,
        from:'rocharui@ipvc.pt',
        subject: subject,
        html:body
    });
}