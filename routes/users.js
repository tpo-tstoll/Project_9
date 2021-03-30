'use strict';

const express = require('express');

const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcryptjs');

// Handler function to wrap each route
function asyncHandler (cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

// Post route to create a new user
router.post('/users', asyncHandler(async (req, res) => {
  try {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password);
    await User.create(user);
    await res.location('/').status(201).end();
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
