const router = require('express').Router();
const cors = require('cors');
const { testUser, userSignUp, userLogin } = require('../../controllers/userController');

router.get('/test', cors(), testUser);
router.post('/signup', cors(), userSignUp);
router.post('/login', cors(), userLogin)


module.exports = router;