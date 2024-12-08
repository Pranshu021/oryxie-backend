const router = require('express').Router();
const cors = require('cors');
const { testUser, userSignUp, userLogin, userDashboard, userTokenGenerate, userLogout } = require('../../controllers/userController');

router.get('/test', cors({origin: 'http://localhost:3000', credentials: true}), testUser);
router.get('/dashboard', cors({origin: 'http://localhost:3000', credentials: true}), userDashboard);

router.post('/signup', cors({origin: 'http://localhost:3000', credentials: true}), userSignUp);
router.post('/login', cors({origin: 'http://localhost:3000', credentials: true}), userLogin);
router.get('/session', cors({origin: 'http://localhost:3000', credentials: true}), userTokenGenerate);
router.get('/logout', cors({origin: 'http://localhost:3000', credentials: true}), userLogout);



module.exports = router;