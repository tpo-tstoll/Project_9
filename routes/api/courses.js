const router = require('express').Router();
const { asyncHandler } = require('../../middleware/async-handler');
const { authenticateUser } = require('../../middleware/auth-user');
const { Course, User } = require('../../models');

router.get('/', asyncHandler(async (req, res) => {
  const courses = await Course.findAll({
    include: {
      model: User
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }

  }),
  const courseSearch = courses.map((courses) => ({
    course: {
      id: course.id,
      title: course.title,
      description: course.description,
      estimatedTime: course.estimatedTime,
      materialsNeeded: course.materialsNeeded,
      userId: course.userId,
      userFname: course.User.firstName,
      userLname: course.User.lastName,
      userEmail: course.User.emailAddress
    },
  }))
  res.json({ courses, courseSearch });
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
  try {
    const course = await Course.create(req.body);
  res.location(`/api/courses/${course.id}`).status(201).end() 
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

router.put('/:id', authenticateUser, asyncHandler( async(req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    const userId = req.currentUser.id;
    if (userId === course.userId) {
      await course.update(req.body)
      res.status(204).end();
    } else {
      res.status(403).end();
    }
  } catch(error) {
    console.log('ERROR: ', error.name);
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    }
  }

}));

router.delete('/:id', authenticateUser, asyncHandler( async(req, res) => {
  const course = await Course.findByPk(req.params.id);
  const userId = req.currentUser.id;
  if (userId === course.userId) {
    await course.destroy();
    res.status(204).end();
  } else {
    res.status(403).end()
  }
}));

module.exports = router;
