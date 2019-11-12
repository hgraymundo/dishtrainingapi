'use strict'

var nodemailer = require('nodemailer');
var type='';
var sub_url='';
const FROM = 'malinchi2018@gmail.com'
var SUBJECT_ACTIVATE_ACCOUNT = ''
var BODY = ''
// var URL_ = 'https://dishtraining.herokuapp.com'
var URL_ = 'https://dishtraining.herokuapp.com'

var transporter  = nodemailer.createTransport ({
  service: 'gmail',
  auth: {
    user: 'malinchi2018',
    pass: 'd3v3l0p3r'
  }
}) 

exports._send_mail = function (_to, _hash, type) {
  if(type ==  "recovery-password") {
    sub_url ="/recovery-password/";
    SUBJECT_ACTIVATE_ACCOUNT ="Dish - Recovery password";
    BODY = "<img src='cid:logo_dish'/>&nbsp;<p style='color: #be1a24;'> <b>Dish - Recover password:</b></p> "
  }
  if(type == "active-account") {
    sub_url ="/active-account?id=";
    SUBJECT_ACTIVATE_ACCOUNT = " Dish - Activate account";
    BODY = "<img src='cid:logo_dish'/>&nbsp;<p style='color: #be1a24;'> <b>Dish - Activate account:</b></p> "
  }


  var mailOptions = {
    from: FROM,
    to: _to,
    subject: SUBJECT_ACTIVATE_ACCOUNT,
    html:'<style> a { text-decoration: none; color: #000 !important;}</style>' + BODY + "<div style='border: 2pt solid #be1a24; color: #000 !important; padding:10px; border-radius: 3px; '>" + URL_ + sub_url + _hash +"</div>",
    attachments: [{
        filename: 'dish-logo.png',
        path: 'public/logo/logo_dish.png',
        cid: 'logo_dish' //same cid value as in the html img src
    }]
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if(err) {
      console.log(err)
    } else {
      console.log(info)
    }
  })
}


exports._send_inquiry = function (_body, _email, _mobile) {
  SUBJECT_ACTIVATE_ACCOUNT = " Dish - Request Received";
  BODY = "Request received from " + _email + "<br>" + _body + "<br> with mobile: " + _mobile;
  var mailOptions = {
    from: FROM,
    to: "malinchi2018@gmail.com",
    subject: SUBJECT_ACTIVATE_ACCOUNT,
    html:'<style> a { text-decoration: none; color: #FFF !important;}</style>' + BODY + "<div style='border: 2pt solid #be1a24; color: #FFFFFF !important; padding:10px; border-radius: 3px; '></div>",
    attachments: [{
        filename: 'dish_logo.png',
        path: 'public/logo/dish_logo.png',
        cid: 'logo_dish' //same cid value as in the html img src
    }]
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if(err) {
      console.log(err)
    } else {
      console.log(info)
    }
  })
}