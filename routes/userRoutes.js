const express = require('express')
const userRouter = express.Router()

userRouter.get("/", (req, res) => {
    res.json({"message": "Fetching user"})
})

module.exports = userRouter