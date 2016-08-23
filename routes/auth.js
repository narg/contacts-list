/**
 *
 * @since 20/08/16
 * @author Necip Arg <neciparg@gmail.com>
 */

var express = require('express');
var router = express.Router();
var authenticator = require('../modules/authenticator');

/**
 * Login via username and password
 */
router.post('/', authenticator.authenticate('local', {
    successRedirect: '/contacts',
    failureRedirect: '/'
}), function (req, res) {
    res.json(req.user);
});

/**
 * Login via GitHub
 */
router.get('/github', authenticator.authenticate('github'));

/**
 * Handle GitHub redirect request
 */
router.get('/github/callback', authenticator.authenticate('github', {
    successRedirect: '/contacts',
    failureRedirect: '/'
}));

/**
 * Login via Facebook
 */
router.get('/facebook', authenticator.authenticate('facebook'));

/**
 * Handle Facebook redirect request
 */
router.get('/facebook/callback', authenticator.authenticate('facebook', {
    successRedirect: '/contacts',
    failureRedirect: '/'
}));

/**
 * Login via Twitter
 */
router.get('/twitter', authenticator.authenticate('twitter'));

/**
 * Handle Twitter redirect request
 */
router.get('/twitter/callback', authenticator.authenticate('twitter', {
    successRedirect: '/contacts',
    failureRedirect: '/'
}));

/**
 * Login via LinkedIn
 */
router.get('/linkedin', authenticator.authenticate('linkedin'));

/**
 * Handle LinkedIn redirect request
 */
router.get('/linkedin/callback', authenticator.authenticate('linkedin', {
    successRedirect: '/contacts',
    failureRedirect: '/'
}));

/**
 * Login via Instagram
 */
router.get('/instagram', authenticator.authenticate('instagram'));

/**
 * Handle Instagram redirect request
 */
router.get('/instagram/callback', authenticator.authenticate('instagram', {
    successRedirect: '/contacts',
    failureRedirect: '/'
}));

/**
 * Login via Foursquare
 */
router.get('/foursquare', authenticator.authenticate('foursquare'));

/**
 * Handle Foursquare redirect request
 */
router.get('/foursquare/callback', authenticator.authenticate('foursquare', {
    successRedirect: '/contacts',
    failureRedirect: '/'
}));

module.exports = router;
