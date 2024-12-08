
const router = require('express').Router();

router.use('/', require('./generalRoutes'));
router.use('/user', require('./userRoutes'));




module.exports = router;