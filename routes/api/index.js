
const router = require('express').Router();

router.use('/test', require('./testApi'));

module.exports = router;