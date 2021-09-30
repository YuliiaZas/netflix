const {User} = require('../models/userModel');

const getShowsByUserId = async (_id) => {
  const { shows } = await User.findOne({_id});
  return shows || [];
};
  
const putShowsArrToUser = async (showIdsArr, userId) => {
  const user = await User.findOneAndUpdate({_id: userId},
    {$set: {shows: showIdsArr}}, {new: true, rawResult: true},
    (err, doc) => {
      if (err) {
        throw new InvalidRequestError(`Invalid request: ${err}`);
      }
    });

  if (!user.lastErrorObject.updatedExisting) {
    throw new DataError(`Shows list for user ${_id} wasn't updated`);
  }
};

module.exports = {
  getShowsByUserId,
  putShowsArrToUser,
};
