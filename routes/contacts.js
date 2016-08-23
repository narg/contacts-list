/**
 *
 * @since 21/08/16
 * @author Necip Arg <neciparg@gmail.com>
 */

var express = require('express');
var request = require('request');
var router = express.Router();
var logger = require('winston');

var isAuthenticated = require('../modules/isAuthenticated');
var config = require('../config/config.json');

/**
 * List contacts
 */
router.get('/', isAuthenticated, function(req, res) {
    request.get({
        url: config.api.host + '/contacts',
        qs: req.query,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': config.passport.strategies.jwt.authScheme + ' ' + req.session.token
        }
    }, function (error, response, body) {
        //Check for error
        if (error) {
            return res.render('error', {
                title: 'Contacts List Error',
                error: error
            });
        }

        body = JSON.parse(body);

        //Check for right status code
        if (response.statusCode !== 200) {
            return res.render('error', {
                title: 'Contacts List Error',
                error: body
            });
        }

        // Refresh token if exists in response header
        if (response.headers['authorization']) {
            req.session.token = response.headers['authorization'];
        }

        res.render('contacts', {
            title: 'Contacts List',
            contacts: body.contacts,
            pagination: body.pagination
        });
    });
});

/**
 * POST a contact
 */
router.post('/', isAuthenticated, function(req, res) {
    request.post(config.api.host + '/contacts', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': config.passport.strategies.jwt.authScheme + ' ' + req.session.token
        },
        body: JSON.stringify(req.body)
    }, function (error, response, body) {
        //Check for error
        if (error) {
            return res.render('error', {
                title: 'Contacts Create Error',
                error: error
            });
        }

        body = JSON.parse(body);

        //Check for right status code
        if (response.statusCode !== 200) {
            return res.render('error', {
                title: 'Contacts Create Error',
                error: body
            });
        }

        // Refresh token if exists in response header
        if (response.headers['authorization']) {
            req.session.token = response.headers['authorization'];
        }

        res.redirect('/contacts/' + body._id)
    });
});

/**
 * PUT a contact
 */
router.post('/:id', isAuthenticated, function(req, res) {
    request.put(config.api.host + '/contacts/' + req.params.id, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': config.passport.strategies.jwt.authScheme + ' ' + req.session.token
        },
        body: JSON.stringify(req.body)
    }, function (error, response, body) {
        //Check for error
        if (error) {
            return res.render('error', {
                title: 'Contacts Update Error',
                error: error
            });
        }

        body = JSON.parse(body);

        //Check for right status code
        if (response.statusCode !== 200) {
            return res.render('error', {
                title: 'Contacts Update Error',
                error: body
            });
        }

        // Refresh token if exists in response header
        if (response.headers['authorization']) {
            req.session.token = response.headers['authorization'];
        }

        res.redirect('/contacts/' + req.params.id)
    });
});

/**
 * DELETE a contact
 */
router.delete('/:id', isAuthenticated, function(req, res) {
    console.log('delete id =>', req.params.id);
    request.delete({
        url: config.api.host + '/contacts/' + req.params.id,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': config.passport.strategies.jwt.authScheme + ' ' + req.session.token
        }
    }, function (error, response, body) {
        //Check for error
        if (error) {
            return res.render('error', {
                title: 'Contacts Delete Error',
                error: error
            });
        }

        //Check for right status code
        if (response.statusCode !== 200) {
            return res.render('error', {
                title: 'Contacts Delete Error',
                error: body
            });
        }

        // Refresh token if exists in response header
        if (response.headers['authorization']) {
            req.session.token = response.headers['authorization'];
        }

        res.json({
            success: true
        })
    });
});

/**
 * GET a contact
 */
router.get('/:id', isAuthenticated, function(req, res) {
    request.get({
        url: config.api.host + '/contacts/' + req.params.id,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': config.passport.strategies.jwt.authScheme + ' ' + req.session.token
        }
    }, function (error, response, body) {
        //Check for error
        if (error) {
            return res.render('error', {
                title: 'Contacts Get Error',
                error: error
            });
        }

        body = JSON.parse(body);

        //Check for right status code
        if (response.statusCode !== 200) {
            return res.render('error', {
                title: 'Contacts Get Error',
                error: body
            });
        }

        // Refresh token if exists in response header
        if (response.headers['authorization']) {
            req.session.token = response.headers['authorization'];
        }

        res.render('contact', {
            title: 'Contact',
            user: body,
            contacts: body
        });
    });
});

module.exports = router;
