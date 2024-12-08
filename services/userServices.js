const { customErrorandLog } = require('../utils/helpers')
const connectDB = require('../utils/db');
const { User } = require('../models/')


const signUpUser = async(userData) => {
    connectDB();

    const user = new User(userData)
    try {
        await user.save();
        return user
    } catch(error) {
        return {"error": error}
    }
}

const getUser = (searchParameters) => {
    const user = User.find(searchParameters);
    return user;
}

const updateUserRefreshToken = (userId, refreshToken) => {
    try {
        const updatedUser = User.findByIdAndUpdate(userId, { $push: {refresh_tokens: refreshToken} });
        return updatedUser;
    } catch(error) {
        return {"error": error}
    }
}

const userService = {
    signUpUser,
    getUser,
    updateUserRefreshToken
}

module.exports = userService