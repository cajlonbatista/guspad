const Note = require('../controllers/Note');
const User = require('../controllers/User');

const routes = require('express').Router();

routes.post('/register', User.create);
routes.post('/login', User.sicron);
routes.get('/user/:id', User.index);
routes.post('/note', Note.create);

module.exports = routes;