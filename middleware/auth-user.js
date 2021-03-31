'use strict';
const auth = require('basic-auth');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

exports.authenticateUser = async (req, res, next) => {
  const credentials = auth(req);
  let message;

  if (credentials) {
    const user = await User.findOne({ where: { emailAddress: credentials.emailAddress } });
    if (user) {
      const authenticated = bcrypt.compareSync(credentials.pass, user.password);
      if (authenticated) {
        console.log(`${user.emailAddress} has been successfully authenticated!`);
        req.currentUser = user;
      } else {
        message = `${user.emailAddress} could not be authenticated`;
      }
    } else {
      message = 'User could not be located.';
    }
  } else {
    message = 'Auth header not found';
  }

  if (message) {
    console.warn(message);
    res.status(401).json({ message: 'Access Denied, Goodbye..' });
  } else {
    next();
  }
};
