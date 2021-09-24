const {User} = require('../models/userModel');

const getShowsByUserId = async (_id) => {
  const libraryShows = await Show.find({users: _id}, {__v: 0});
  return libraryShows || [];
};

const putShowToUser = async (showId, userId) => {
  User.findOneAndUpdate({_id: userId}, 
    {$push: {shows: showId}}, {new: true},
    (err, doc) => {
      if (err) {
        throw new InvalidRequestError(`Invalid request: ${err}`);
      }
    });
};

const deleteShowFromUser = async (showId, userId) => {
  User.findOneAndUpdate({_id: userId, shows: showId}, 
    {$pull: {shows: showId}}, {new: true},
    (err, doc) => {
      if (err) {
        throw new InvalidRequestError(`Invalid request: ${err}`);
      }
    });
};

module.exports = {
  getShowsByUserId,
  putShowToUser,
  deleteShowFromUser,
};
