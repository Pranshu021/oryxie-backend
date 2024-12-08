require('dotenv').config();
const jwt = require('jsonwebtoken');
const {userServices} = require('../services/userServices')
const supertokens = require("supertokens-node");
const Session = require("supertokens-node/recipe/session");
const ThirdParty = require("supertokens-node/recipe/thirdparty");

const tokenGenerator = async(req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) res.status(401).json({"error": "Unauthorized Access"});

    const user = await userServices.getUser({refresh_tokens: refreshToken});
    if(!user) res.status(403).json({"error": "Invalid Token"})

    jwt.verify(refreshToken, process.env.DEV_JWT_REFRESH_TOKEN, (err, user) => {
        if(err) res.status(403).json({"error": "Something went wrong"})
        
        const new_token = jwt.sign({username: user.username}, process.env.DEV_JWT_ACCESS_TOKEN, {expiresIn: "1h"});
        res.status(200).json({"message": "Token Refreshed", "token": new_token});
    })

}

module.exports = {
    tokenGenerator,
}