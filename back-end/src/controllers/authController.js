const express = require('express');
const router = new express.Router();

const {
  login,
} = require('../services/authService');

const {tryCatchWrapper} = require('../utils/apiUtils');

router.post('/login', tryCatchWrapper(async (req, res, next) => {
  const {email, password} = req.body;
  try {
    const token = await login({email, password});
    res.json({token});
  } catch (error) {
    return next(error);
  }
}));

module.exports = {
  authRouter: router,
};
