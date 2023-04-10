const express = require('express');
const container = require('../../../../Infrastructures/container');
// const container = require('../../../../Infrastructures/container');
const AuthenticationsHandler = require('./handler');

const authenticationRoute = express.Router();
const handler = new AuthenticationsHandler(container);

authenticationRoute.post('/login', handler.postAuthenticationHandler);
authenticationRoute.post('/register', handler.postRegistrationHandler);

module.exports = authenticationRoute;
