'use strict';
const router = require('express').Router();
const { asyncHandler } = require('../../middleware/async-handler');
const { authenticateUser } = require('../../middleware/auth-user');
const { User } = require('../../models');
const bcrypt = require('bcryptjs');

// Get User
router.get('/', authenticateUser, asyncHandler((req, res) => {
  const user = req.currentUser;

  res.status(200).json({
    name: `${user.firstName} ${user.lastName}`,
    email: user.emailAddress
  });
}));

// Post route to create a new user
router.post('/', asyncHandler(async (req, res) => {
  try {
    const user = req.body;
    console.log(user);
    if (user.password === undefined || user.password.length < 8) {
      await User.create(user);
      await res.location('/').status(201).end();
    } else {
      user.password = bcrypt.hashSync(user.password);
      await User.create(user);
      await res.location('/').status(201).end();
    }
    } catch (error) {
      console.log('ERROR: ', error.name);
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    }
  }
}));

module.exports = router;
