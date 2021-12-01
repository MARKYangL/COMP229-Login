/*!
    - File Name: index.js
    - StudentID: 301217825
    - Student’s Name: Yang Li
    - Date: 2021-10-30
  */
var express = require('express');
var router = express.Router();
var auth = require('../config/auth')

/* 1.GET home page. */
router.get('/', function (req, res, next) {
    res.render('home', { router: 'home' });
});
router.get('/home', function (req, res, next) {
    res.render('home', { router: 'home' });
});


/* 2.GET about me page. */
router.get('/about', function (req, res, next) {
    res.render('about_me', { router: 'about' });
});

/* 3.GET projects page. */
router.get('/projects', function (req, res, next) {
    res.render('projects', { router: 'projects' });
});

/* 4.GET services page. */
router.get('/services', function (req, res, next) {
    res.render('services', { router: 'services' });
});


/* 5.GET contact me page. */
router.get('/contact', function (req, res, next) {
    res.render('contact', { router: 'contact' });
});

/* 6.Get login page */
router.get('/login', function (req, res, next) {
    res.render('login', { router: 'login' })
})

/* 7.Get business contacts page */
router.get('/contacts', auth,function (req, res) {
    const { contacts } = req.session['user'];
    res.render('contacts', {
        router: "businessContacts",
        contacts
    })
})

/* 8.Get add business contacts page */
router.get('/contacts_add', auth, function (req, res) {
    res.render('contacts_add', { router: 'contacts_add' })
})

/* 9.Get update business contacts page */
router.get('/contacts_update', auth, function (req, resp) {
    const { index } = req.query
    const { user } = req.session
    const { contacts } = user
    resp.render('contacts_update', {
        router: 'contacts_update',
        contact: contacts[index],
        index
    })
})

module.exports = router;
