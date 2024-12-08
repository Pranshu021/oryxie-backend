const router = require('express').Router();
const cors = require('cors');
const { tokenGenerator } = require('../../controllers/generalReqController')

router.post('/token', cors(), tokenGenerator);

module.exports = router;