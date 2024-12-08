const jwt = require('jsonwebtoken')
require('dotenv').config();

const authenticate = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const accessToken = authHeader && authHeader.split(" ")[1];
    const openRoutes = ['/user/login', '/user/about-us', '/user/signup', '/user/session', '/auth/authorisationurl'];

    if (openRoutes.includes(req.path)) {
        return next();
    }

    if(!accessToken) {
        return res.status(401).json({"message": "Unauthorized Access!"});
    }

    jwt.verify(accessToken, process.env.DEV_JWT_ACCESS_TOKEN, async(err, user) => {
        if (err) {
            
            return res.status(403).json({ message: 'Token is invalid or expired' });
        }
        console.log("User: ", user)
        req.user = user;
        next();
    });
    next();
}

module.exports = authenticate;