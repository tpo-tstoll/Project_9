const express = require('express');
const app = express.Router()
const { User, Course } = require('../models/User')

// const { asyncHandler } = require('../middleware/asynchandler') - see note 


//GET route for a single course - commenting out function asyncHandler until middleware is setup
app.get('/api/courses/:id', /* asyncHandler**/ (async (req, res) => {
    const course = await Course.findByPK(req.params.id, {
      include: {
        model: User
      },
      res.status(200).end()
    });
    if (course === 'undefined') {
      const err = new Error('Looks like we don\'t offer that course');
      err.status = 404;
      throw err;
    } else {
      res.status(404).json({ course: {
        id: course.id,
        title: course.title,
        description: course.description,
        estimatedTime: course.estimatedTime,
        materialsNeeded: course.materialsNeeded
      } } );
    }
  }));