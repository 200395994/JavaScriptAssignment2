'use strict';
var express = require('express');
var router = express.Router();
var Advertise = require('../models/advertisment');


/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

//list of all advertisement
router.get('/advertisment', function (req, res) {
    Advertise.find(function (err, advertisment) {
        if (err) console.log(err);
        else res.render('advertisment', { alladvertisment: advertisment });
    });
});

//Add Advertisement 
router.get('/advertisment/add', isLoggedIn, function (req, res) {
    var id = req.params.id;
    res.render('add');
});

//Adding advertisement into database 
router.post('/advertisment/add', isLoggedIn, function (req, res) {
    var id = req.params.id;
    Advertise.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category
    }, function (err, Advertise) {
        if (err) console.log(err);
        else {
            console.log('Add added : ' + Advertise);
            res.render('added', { advertisment: Advertise.title });
        }
    });
});

//Deleting advertisement here
router.get('/advertisment/delete/:id', isLoggedIn, function (req, res) {
    var id = req.params.id;
    Advertise.deleteOne({ _id: id }, function (err) {
        console.log(id);
        if (err)
            console.log('advertisment : ' + id + 'not found!');
        else
            res.redirect('/advertisment');
    });
});




//Edit A Product Page
router.get('/advertisment/edit/:id', isLoggedIn, function (req, res) {
    var id = req.params.id;

    Advertise.findById(id, function (err, product) {
        if (err)
            res.send('advertisment : ' + id + 'not found!');
        else
            res.render('editAdd', { advertisment: product });
    });
});

//Edit a Advertisement and save to DB
router.post('/advertisment/edit', isLoggedIn, function (req, res) {
    var id = req.body.id;
    var editedAdvertisment = {
        _id: id,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
    };
    Advertise.updateOne({ _id: id }, editedAdvertisment, function (err) {
        if (err) res.send('advertisment: ' + id + ' not found!');
        else {
            console.log('advertisment' + id + ' updated!');
            res.redirect('/advertisment');
        }
    });

});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('Not authenticated!');
    res.redirect('/signIn');
}



module.exports = router;
