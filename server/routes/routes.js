const express = require('express');

const route = express.Router();

const services = require("../services/render");
const controller = require("../controller/controller");

route.get('/index', services.index);
route.get('/', services.login);
route.get('/SignUp', services.signup);
// route.get('/grades', services.Grades);


// //API

// route.post('/api/users', controller.create);
// route.post('/api/login', controller.login);

module.exports = route;