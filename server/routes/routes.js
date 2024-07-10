const express = require('express');
const route = express.Router();
const render = require('../services/render');
const controller = require("../controller/controller");

route.get('/', render.login);
route.get('/SignUp', render.signup);
route.get('/index', render.index);
route.get('/explore', render.explore);


//API

route.post('/api/users', controller.create);
route.post('/api/login', controller.login);
route.post('/api/uploadpost', controller.uploadpost);
route.get('/api/explore', controller.explore);
route.get('/api/index', controller.index);


module.exports = route;