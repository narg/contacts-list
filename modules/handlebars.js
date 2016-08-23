/**
 *
 * @since 22/08/16
 * @author Necip Arg <neciparg@gmail.com>
 */

var _ = require('lodash');
var hbs = require('hbs');
var paginate = require('handlebars-paginate');

var handlebars = hbs.create();
handlebars.registerHelper('fullName', function(name) {
    if (name) {
        return _.upperFirst(name.title) + ' ' + _.upperFirst(name.first) + ' ' + _.upperFirst(name.last);
    }

    return name;
});

// TODO: Paginate helper does not work well when pageCount is zero
handlebars.registerHelper('paginate', paginate);

handlebars.registerHelper('fillForm', paginate);

handlebars.registerPartials(__dirname + '/../views/partials');

module.exports = handlebars.__express;
