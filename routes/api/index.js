
const router = require('express').Router();

router.use('/test', require('./testApi'));
router.use('/user', require('./userRoutes'));

module.exports = router;