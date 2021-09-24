const jwt = require('jsonwebtoken');
const {AuthError} = require('../utils/errors');

require('dotenv').config({path: '../../../.env'});

const authMiddleware = (req, res, next) => {
  const {authorization} = req.headers;

  if (!authorization) {
    throw new AuthError('Please, provide "authorization" header');
  }

  const [, token] = authorization.split(' ');

  if (!token) {
    throw new AuthError('Please, include token to request');
  }

  try {
    const tokenPayload = jwt.verify(token, process.env.SECRET);
    req.user = {
      userId: tokenPayload._id,
      email: tokenPayload.email,
    };
    next();
  } catch (err) {
    throw new AuthError('Wrong token');
  }
};

module.exports = {
  authMiddleware,
};
