const {User} = require('../models/userModel');

const getAllFriendsByUserId = async (_id) => {
  const friends = await User.find({friends: _id}, {__v: 0});
  console.log(friends)
  return friends || [];
};

const searchUsersByNameOrEmail = async (value, userId) => {
  const users = await User.find({
    $or: [
      {username: {$regex: `${value}`, $options: 'i'}},
      {email: {$regex: `${value}`, $options: 'i'}}
    ],
    friends: {$ne: {_id: userId}}
  });
  return users || [];
};

const addFriendToUser = async (friendId, userId) => {
  User.findOneAndUpdate({_id: userId, friends: {$ne: friendId}}, 
    {$push: {friends: friendId}}, {new: true},
    (err, doc) => {
      if (err) {
        throw new InvalidRequestError(`Invalid request: ${err}`);
      }
    });
};

const deleteFriendFromUser = async (friendId, userId) => {
  User.findOneAndUpdate({_id: userId, friends: friendId}, 
    {$pull: {friends: friendId}}, {new: true},
    (err, doc) => {
      if (err) {
        throw new InvalidRequestError(`Invalid request: ${err}`);
      }
    });
};

module.exports = {
  getAllFriendsByUserId,
  searchUsersByNameOrEmail,
  addFriendToUser,
  deleteFriendFromUser,
};
