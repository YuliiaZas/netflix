const {User} = require('../models/userModel');
const {registration} = require('./authService');

const usersRegistration = async (userData) => {
  let userInDB = await User.findOne({email: userData.email});
  if (!userInDB) {
    console.log(userData.email, 'is absent');
    registration(userData)
  }
};

module.exports = {
  usersRegistration,
};
