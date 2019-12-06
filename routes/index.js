'use strict';
var express = require('express');
var router = express.Router();

/* get home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

/* get header page. */
router.get('/header', function (req, res) {
    res.render('header', { title: 'Express' });
});

/* get register page. */
router.get('/register', function (req, res) {
    res.render('register', { title: 'Express' });
});

/* get SignIn page. */
router.get('/login', function (req, res) {
    res.render('login', { title: 'Express' });
});


/* get footer page. */
router.get('/footer', function (req, res) {
    res.render('footer', { title: 'Express' });
});


module.exports = router;
