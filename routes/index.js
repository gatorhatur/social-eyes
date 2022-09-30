const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).send({message: 'You have attempted to use a route that does not exist!'});
});

module.exports = router;
