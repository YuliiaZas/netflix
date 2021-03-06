const express = require('express');
const router = new express.Router();

const {
  getShowsByUserId,
  putShowToUser,
  deleteShowFromUser,
  putShowsArrToUser,
} = require('../services/showsService');

const {tryCatchWrapper} = require('../utils/apiUtils');

const {
  DataError,
} = require('../utils/errors');

router.get('/', tryCatchWrapper(async (req, res) => {
  const {userId} = req.user;
  const shows = await getShowsByUserId(userId);
  res.json(shows);
}));

router.get('/:userId', tryCatchWrapper(async (req, res) => {
  const userId = req.params.userId;
  const shows = await getShowsByUserId(userId);
  res.json(shows);
}));

router.put('/', tryCatchWrapper(async (req, res) => {
  const {userId} = req.user;
  const showIdsArr = req.body;
  try {
    await putShowsArrToUser(showIdsArr, userId);
  } catch (error) {
    throw new DataError(`Shows ${showIdsArr.join(', ')} aren't added to user ${userId} liked library. Error: ${error}`);
  }
  res.json({message: `Shows ${showIdsArr.join(', ')} are added to user ${userId} liked library`});
}));

module.exports = {
  showsRouther: router,
};
