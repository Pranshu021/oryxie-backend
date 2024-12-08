const router = require('express').Router();
const authenticate = require('../middlewares/authenticate');


router.use('/api/v1', authenticate, require('./api'));


module.exports = router;