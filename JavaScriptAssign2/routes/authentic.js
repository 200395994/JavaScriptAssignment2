const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');


router.get('/signIn', (req, res, next) => {
    res.render('signIn', {});
});

router.post(
    '/signIn',
    passport.authenticate('local', {
        failure: 'error in email or password',
        failureRedirect: '/signIn',
        successRedirect: '/'
    })
);


router.get('/signUp', (req, res, next) => {
    res.render('signUp', {});
});


router.post('/signUp', (req, res, next) => {

    User.signUp(
        new User({ email: req.body.email }),
        req.body.password,
        function (err, account) {
            if (err) {
          
                console.log(err);
                return res.render('signUp', { account: account });
            }

            passport.authenticate('local')(req, res, function () {
                res.redirect('/');
            });
        }
    );
});

//logout
router.get('/logout', (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});



module.exports = router;