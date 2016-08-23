/**
 *
 * @since 22/08/16
 * @author Necip Arg <neciparg@gmail.com>
 */

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
var isAuthenticated = function(req, res, next) {
    // Check user stored in session or not
  if (req.user) {
    return next();
  }

    // If a user isn't logged in, then redirect to start page
  res.redirect('/');
};

module.exports = isAuthenticated;
