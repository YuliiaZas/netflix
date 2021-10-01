const express = require('express');
const router = new express.Router();

const {
  getAllFriendsByUserId,
  searchUsersByEmail,
  addFriendToUser,
  deleteFriendFromUser,
} = require('../services/friendsService');

const {tryCatchWrapper} = require('../utils/apiUtils');

const {
  DataError,
  InvalidRequestError,
} = require('../utils/errors');

router.get('/', tryCatchWrapper(async (req, res) => {
  const {userId} = req.user;
  const friendsInfo = await getAllFriendsByUserId(userId);
  if (!friendsInfo) {
    throw new InvalidRequestError(`Invalid request`);
  }
  res.json(friendsInfo);
}));

router.get('/search/:value', tryCatchWrapper(async (req, res) => {
  const {userId} = req.user;
  const value = req.params.value;
  const newfriends = await searchUsersByEmail(value, userId);
  res.json(newfriends || []);
}));

router.patch('/add/:id', tryCatchWrapper(async (req, res) => {
  const {userId} = req.user;
  const friendId = req.params.id;
  try {
    await addFriendToUser(friendId, userId);
    await addFriendToUser(userId, friendId);
  } catch (error) {
    throw new DataError(`Friend ${friendId} wasn't added to user ${userId}. Error: ${error}`);
  }
  res.json({message: `Friend ${friendId} was added to user ${userId}`});
}));

router.patch('/remove/:id', tryCatchWrapper(async (req, res) => {
  const {userId} = req.user;
  const friendId = req.params.id;
  try {
    await deleteFriendFromUser(friendId, userId);
    await deleteFriendFromUser(userId, friendId);
  } catch (error) {
    throw new DataError(`Friend ${friendId} wasn't removed from user ${userId}. Error: ${error}`);
  }
  res.json({message: `Friend ${friendId} was removed from user ${userId}`});
}));

module.exports = {
  friendsRouther: router,
};
