const router = require('express').Router();
const asyncHandler = require('../../middleware/async-handler');
const { authenticateUser } = require('../../middleware/auth-user');
const { Course, User } = require('../../models');



router.get('/', asyncHandler(async (req, res) => {
  const courses = await Course.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }

  });
  res.json(courses);
}));

// GET route for a single course - commenting out function asyncHandler until middleware is setup
router.get('/:id', asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id, {
    include: {
      model: User
    }
  });
  if (course === undefined || course === null) {
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
        materialsNeeded: course.materialsNeeded,
        userId: course.userId
      },
    });
  }
}));

router.post('/', authenticateUser, asyncHandler(async (req, res) => {
  const course = await Course.create(req.body);
  res.location(`/api/courses/${course.id}`).status(201).end()
}));

module.exports = router;
