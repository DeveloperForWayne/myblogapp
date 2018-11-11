const User = require('../models/user');

// /login
exports.showLogin = function (req, res, next) {
    res.render('user/login', { message: '' });
};

exports.validate = function (req, res, next) {
    User.findOne({ 'name': req.body.name }, function (err, user) {
        // if there are any errors, return the error before anything else
        if (err) { return handleError(err); }
        else if (!user) { res.render('user/login', { message: 'No user found.' }) }
        // if the user is found but the password is wrong
        else if (user.password != req.body.password) { res.render('user/login', { message: 'Wrong password.' }) }
        // all is well 
        else {
            res.redirect('/blog');
        }

    });
};

exports.showRegister = function (req, res, next) {
    res.render('user/register', { message: '' });
};

exports.register = function (req, res, next) {
    User.findOne({ 'name': req.body.name }, function (err, user) {
        // if there are any errors, return the error
        if (err) { return handleError(err); }
        // check to see if theres already a user with that email
        if (user) {
            res.render('user/register', { message: 'That name is already taken.' })
        }
        else {

            // if there is no user with that name
            // create the user
            let newUser = new User();

            // set the user's local credentials
            newUser.name = req.body.name;
            newUser.password = req.body.password;

            // save the user
            newUser.save(function (err) {
                if (err) throw err;
                res.render('user/register', { message: 'User Successfully Created.' })
            });
        }
    });
};