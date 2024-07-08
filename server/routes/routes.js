const express = require('express');
const route = express.Router();
const render = require('../services/render');
const controller = require("../controller/controller");

route.get('/', render.login);
route.get('/SignUp', render.signup);
route.get('/index', render.index);

//API

route.post('/api/users', controller.create);
route.post('/api/login', controller.login);

module.exports = route;