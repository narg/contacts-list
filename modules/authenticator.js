/**
 *
 * @since 20/08/16
 * @author Necip Arg <neciparg@gmail.com>
 */

var request = require('request');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GitHubStrategy = require('passport-github2').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var LinkedInStrategy = require('passport-linkedin').Strategy;
var InstagramStrategy = require('passport-instagram').Strategy;
var FoursquareStrategy = require('passport-foursquare').Strategy;

var config = require('../config/config.json');

/**
 * Local Strategy
 */
passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
},
    function(req, username, password, done) {
      request.post(config.api.host + '/auth', {
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password,
          body: req.body
        })
      }, function(error, response, body) {
            //Check for error
        if (error) {
          return done(null, body);
        }

        body = JSON.parse(body);

            //Check for right status code
        if (response.statusCode !== 200) {
          return done(body);
        }

            // Save token
        req.session.token = response.headers['authorization'];
        done(null, body);
      });
    }
));

/**
 * This function created to avoid duplicated rows in social strategies
 * @param accessToken
 * @param refreshToken
 * @param profile
 * @param done
 */
var handleSocialLogin = function(req, accessToken, refreshToken, profile, done) {
  console.log({
    id: profile.id,
    provider: profile.provider,
    accessToken: accessToken,
    refreshToken: refreshToken,
    data: profile
  });
  request.post(config.api.host + '/auth/social', {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: profile.id,
      provider: profile.provider,
      accessToken: accessToken,
      refreshToken: refreshToken,
      data: profile
    })
  }, function(error, response, body) {
        //Check for error
    if (error) {
      return done(error);
    }

    body = JSON.parse(body);

        //Check for right status code
    if (response.statusCode !== 200) {
      return done(body);
    }

        // Save token
    req.session.token = response.headers['authorization'];
    done(null, body);
  });
};

/**
 * GitHub Strategy
 */
passport.use(new GitHubStrategy({
  clientID: config.passport.strategies.github.clientId,
  clientSecret: config.passport.strategies.github.clientSecret,
  callbackURL: config.passport.strategies.github.callbackUrl,
  passReqToCallback: true
},
    handleSocialLogin
));

/**
 * Facebook Strategy
 */
passport.use(new FacebookStrategy({
  clientID: config.passport.strategies.facebook.clientId,
  clientSecret: config.passport.strategies.facebook.clientSecret,
  callbackURL: config.passport.strategies.facebook.callbackUrl,
  passReqToCallback: true
},
    handleSocialLogin
));

/**
 * Twitter Strategy
 */
passport.use(new TwitterStrategy({
  consumerKey: config.passport.strategies.twitter.consumerKey,
  consumerSecret: config.passport.strategies.twitter.consumerSecret,
  callbackURL: config.passport.strategies.twitter.callbackUrl,
  passReqToCallback: true
},
    handleSocialLogin
));

/**
 * LinkedIn Strategy
 */
passport.use(new LinkedInStrategy({
  consumerKey: config.passport.strategies.linkedin.consumerKey,
  consumerSecret: config.passport.strategies.linkedin.consumerSecret,
  callbackURL: config.passport.strategies.linkedin.callbackUrl,
  passReqToCallback: true
},
    handleSocialLogin
));

/**
 * Instagram Strategy
 */
passport.use(new InstagramStrategy({
  clientID: config.passport.strategies.instagram.clientId,
  clientSecret: config.passport.strategies.instagram.clientSecret,
  callbackURL: config.passport.strategies.instagram.callbackUrl
},
    handleSocialLogin
));

/**
 * Foursquare Strategy
 */
passport.use(new FoursquareStrategy({
  clientID: config.passport.strategies.foursquare.clientId,
  clientSecret: config.passport.strategies.foursquare.clientSecret,
  callbackURL: config.passport.strategies.foursquare.callbackUrl
},
    handleSocialLogin
));

/**
 *
 */
passport.serializeUser(function(user, done) {
  done(null, user);
});

/**
 *
 */
passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;
