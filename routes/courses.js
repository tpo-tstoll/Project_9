const express = require('express');
const router = express.Router();
const { User, Course } = require('../models');

/* Handler function to wrap each route. */
function asyncHandler (cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      // Forward error to the global error handler
      next(error);
    }
  };
}

router.get('/courses', asyncHandler(async (req, res) => {
  const courses = await Course.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }

  });
  console.log(res.json(courses));
}));

// GET route for a single course - commenting out function asyncHandler until middleware is setup
router.get('/courses/:id', asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id, {
    include: {
      model: User
    }
  });
  if (course === 'undefined' || 'null') {
    const err = new Error('Looks like we don\'t offer that course');
    res.status(400).json(err.message);
    throw err;
  } else {
    res.status(200).json({
      course: {
        id: course.id,
        title: course.title,
        description: course.description,
        estimatedTime: course.estimatedTime,
        materialsNeeded: course.materialsNeeded
      }
    });
  }
}));

module.exports = router;
