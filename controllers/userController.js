const connectDB = require('../utils/db')

const testUser = async(req, res) => {
    try {
        connectDB();
        return res.json({"message": "User API working"})
    }
    catch(error) {
        console.log("hello")
    }
}

module.exports = {
    testUser
}