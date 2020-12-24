const Note = require('../controllers/Note');
const User = require('../controllers/User');

const routes = require('express').Router();

routes.post('/register', User.create);
routes.post('/login', User.sicron);
routes.get('/user/:id', User.index);
routes.post('/verify', User.verify);

routes.post('/note', Note.create);
routes.get('/note', Note.show);
routes.put('/note/:id', Note.update);
routes.delete('/note/:id', Note.destroy);
routes.get('/note/:id', Note.index);
routes.get('/noteuser/:id', Note.userindex);
routes.post('/note/search', Note.search);

module.exports = routes;