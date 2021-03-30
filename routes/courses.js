const express = require('express');
const router = express.Router();
const { Course } = require('../models');

/* Handler function to wrap each route. */
function asyncHandler(cb) {
    return async (req, res, next) => {
      try {
        await cb(req, res, next);
      } catch (error) {
        // Forward error to the global error handler
        next(error);
      }
    };
  }

router.get('/courses', asyncHandler(async(req, res) => {
    const courses = await Course.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        }
    });
    console.log(res.json(courses));
}));

module.exports = router;