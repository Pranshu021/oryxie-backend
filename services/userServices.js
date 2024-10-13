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
        console.log(error)
        return {"error": error}
    }
}

const getUser = (searchParameters) => {
    const user = User.find(searchParameters);
    return user;
}

const userService = {
    signUpUser,
    getUser
}

module.exports = userService