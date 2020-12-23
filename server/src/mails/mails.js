const path = require('path');
const emails = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

var transport = emails.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "694a2bcbf09231",
    pass: "73b94eafce95b4"
  }
});

transport.use('compile', hbs({
  viewEngine: 'handlebars',
  viewPath: path.resolve('./src/resources/'),
  extName: '.html'
}));

module.exports = transport;