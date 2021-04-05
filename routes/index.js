const router = require('express').Router();
const apiRoutes = require('./api');
const pageNotFound = require('../middleware/pageNotFound');
const errorHandler = require('../middleware/error-handler');

router.get('/', (req, res) => {
    res.json({
      message: 'Welcome to the REST API project!',
    });
  });

router.use('/api', apiRoutes);

router.use(pageNotFound);
router.use(errorHandler);

module.exports = router;