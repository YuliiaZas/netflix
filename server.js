require('dotenv').config();

const path = require('path');
const express = require('express');
const app = express();

const morgan = require('morgan');
const mongoose = require('mongoose');

const {authMiddleware} = require('./back-end/src/middlewares/authMiddleware');
const {usersArray} = require('./back-end/src/data/users');
const {usersRegistration} = require('./back-end/src/services/userService');

const {NetflixError} = require('./back-end/src/utils/errors');

const {authRouter} = require('./back-end/src/controllers/authController');
const {showsRouther} = require('./back-end/src/controllers/showsController');
const {friendsRouther} = require('./back-end/src/controllers/friendsController');


app.use(express.static(__dirname + '/front-end/dist/netflix'));

app.use(express.json());
app.use(morgan('tiny'));


app.use('/api/auth', authRouter);
app.use('/api/shows', [authMiddleware], showsRouther);
app.use('/api/friends', [authMiddleware], friendsRouther);

app.use((err, req, res, next) => {
  if (err instanceof NetflixError) {
    return res.status(err.status).json({
        message: err.message,
        status: err.status
    });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/front-end/dist/netflix/index.html'));
});

app.use((req, res, next) => {
  res.status(404).json({
    message: `The requested URL ${req.url} was not found`,
  });
});


(async () => {
  try {
    await mongoose.connect(process.env.DB_PATH, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    usersArray.forEach(usersRegistration);

    app.listen(process.env.PORT || 8081);
    console.error(`Server startup: ${process.env.PORT || 8081}`);
  } catch (err) {
    console.error(`Error with server startup: ${err.message}`);
  }
})();