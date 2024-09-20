const router = require('express').Router();
const cors = require('cors');
const { testAPIController } = require("../../controllers/homepageController");


router.get("/testAPI", cors(), testAPIController);

module.exports = router;