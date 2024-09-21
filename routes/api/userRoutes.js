const router = require('express').Router();
const cors = require('cors');
const {testUser} = require('../../controllers/userController');

router.get('/test', cors(), testUser);

module.exports = router;