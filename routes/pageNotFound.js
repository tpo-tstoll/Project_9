const router = require('express').Router();

router.use((req, res, next) => {
  res.status(404).json({
    message: 'Route Not Found'
  });
  next();
});

module.exports = router;