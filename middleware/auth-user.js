'use strict';
const auth = require('basic-auth');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

exports.authenticateUser = async (req, res, next) => {
  const credentials = auth(req);
  let message;

<<<<<<< HEAD
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
=======
    if (credentials) {
        const user = await User.findOne({ where: {emailAddress: credentials.name} })
        if (user) {
            const authenticated = bcrypt.compareSync(credentials.pass, user.password);
            if (authenticated) {
                console.log(`${user.emailAddress} has been successfully authenticated!`);
                req.currentUser = user;
            } else {
                message = `${user.emailAddress} could not be authenticated`;
            }
        } else {
            message = `User could not be located.`;
        }
    } else {
        message = 'Access Denied, Goodbye..';
>>>>>>> f4b568b3ec386f608f5fee91fb8effe47b304b4e
    }
  } else {
    message = 'Auth header not found';
  }

<<<<<<< HEAD
  if (message) {
    console.warn(message);
    res.status(401).json({ message: 'Access Denied, Goodbye..' });
  } else {
    next();
  }
};
=======
    if (message) {
        console.warn(message);
        res.status(401).json(message);
    } else {
        next();
    }

}
>>>>>>> f4b568b3ec386f608f5fee91fb8effe47b304b4e
