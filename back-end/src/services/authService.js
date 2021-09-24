const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config({path: '../../../.env'});

const {User} = require('../models/userModel');

const {
  AuthError,
  DataError,
} = require('../utils/errors');

const registration = async (userData) => {
  const {email, password} = userData;
  const user = new User({
    email,
    password: await bcrypt.hash(password, 10),
  });
  try {
    await user.save();
  } catch (err) {
    throw new DataError(`Email ${email} have been already registered`);
  }
};


const login = async ({email, password}) => {
  const user = await User.findOne({email});

  if (!user) {
    console.log('!user')
    throw new AuthError('Invalid email or password');
  }

  if (!(await bcrypt.compare(password, user.password))) {
    console.log('!password')
    throw new AuthError('Invalid email or password');
  }

  console.log(jwt.sign({
    _id: user._id,
    email: user.email,
  }, process.env.SECRET));

  return jwt.sign({
    _id: user._id,
    email: user.email,
  }, process.env.SECRET);
};


module.exports = {
  registration,
  login,
};
