/*!
    - File Name: user.js
    - StudentID: 301217825
    - Student’s Name: Yang Li
    - Date: 2021-11-30
  */
var express = require('express');
var router = express.Router();
var { users } = require("../models/index")
var auth = require('../config/auth')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/* POST login */
router.post('/login', function (req, res, next) {
  users.findOne(req.body).then(user => {
    if (user) {
      if (!user.contacts) {
          user.contacts = []
      }
      req.session['user'] = user;
      res.redirect("/contacts")
    } else {
      res.redirect("/login")
    }
  })
})

/* contact base function*/
const contactsFunction = (req, resp) => {
  // get session user
  const { user } = req.session;
  // get user contacts
  const { contacts } = user;
  // response function
  return (before) => {
    // before function
    // contacts: user contacts
    before(contacts);
    // update user
    users.findOneAndUpdate({
      username: user.username
    }, user).then(() => {
      // redirect contacts page
      resp.redirect('/contacts')
    })
  }
}

/*GET delete contact by index */
router.get('/contacts/delete/:index', auth, function (req, resp) {
  const index = req.params.index
  contactsFunction(req, resp)((contacts) => {
    // delete contact by index
    contacts.splice(index, 1);
  });
})

/* POST Add Contact */
router.post('/contacts/add', auth, function (req, resp) {
  const contact = req.body;
  contactsFunction(req, resp)((contacts) => {
    // push contact to user contacts
    contacts.push(contact)
  });
})

/* POST update contact */
router.post('/contacts/update', auth, function (req, resp) {
  const { index, name, phone, email } = req.body
  contactsFunction(req, resp)((contacts) => {
    // update user contacts by index
    contacts[parseInt(index)] = { name, phone, email }
  });
})

module.exports = router;
