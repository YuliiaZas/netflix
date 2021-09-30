const mongoose = require('mongoose');

const User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
  },
  age: {
    type: Number,
  },
  shows: [
    {
      type: Number
    }
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId
    }
  ],
});

module.exports = {
  User,
};
