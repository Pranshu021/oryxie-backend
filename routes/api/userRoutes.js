const router = require('express').Router();
const cors = require('cors');
const { testUser, userSignUp} = require('../../controllers/userController');

router.get('/test', cors(), testUser);
router.post('/signup', cors(), userSignUp);


module.exports = router;