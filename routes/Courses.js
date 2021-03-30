const express = require('express');
const app = express.Router()
// const { asyncHandler } = require('../middleware/asynchandler') - see note 
// const { Course } = require('../models/courses') - commenting out importing the course model as this has not been created yet


//GET route for a single course - commenting out function asyncHandler until middleware is setup
app.get('/api/courses/:id', /* asyncHandler**/ (async (req, res) => {
    const course = await Course(req.params.id);
    if (course) {
      res.json(course).status(200).end();
    } else {
      res.status(404).json({ message: "Looks like we don't offer that course" });
    }
  }));