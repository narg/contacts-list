var express = require('express');
var request = require('request');
var router = express.Router();

/**
 * GET home page
 */
router.get('/', function(req, res) {
  res.render('index', { title: 'Contacts List' });
});

module.exports = router;
