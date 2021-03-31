const router = require('express').Router();
const apiRoutes = require('./api');

router.get('/', (req, res) => {
    res.json({
      message: 'Welcome to the REST API project!',
    });
  });

router.use('/api', apiRoutes);

module.exports = router;