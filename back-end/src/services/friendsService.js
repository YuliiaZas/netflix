const {User} = require('../models/userModel');

const getAllFriendsByUserId = async (_id) => {
  const { friends } = await User.findOne({_id});
  const friendsArr = await User.find({_id: friends}, {_id: 1, email: 1, shows: 1})
  return friendsArr || [];
};

const searchUsersByEmail = async (value, userId) => {
  const users = await User.find({
    email: {$regex: `${value}`, $options: 'i'},
    friends: {$ne: {_id: userId}}
  }, {_id: 1, email: 1, shows: 1});
  return users || [];
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

const addFriendToUser = async (friendId, userId) => {
  User.findOneAndUpdate({_id: userId, friends: {$ne: friendId}}, 
    {$push: {friends: friendId}}, {new: true},
    (err, doc) => {
      if (err) {
        throw new InvalidRequestError(`Invalid request: ${err}`);
      }
    });
}

module.exports = {
  getAllFriendsByUserId,
  searchUsersByEmail,
  addFriendToUser,
  deleteFriendFromUser,
};
