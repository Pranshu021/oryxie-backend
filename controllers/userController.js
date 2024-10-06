const { User } = require('../models/')
const { userSignUpSchema } = require('../validations')
const { customErrorandLog } = require('../utils/helpers')
const { userService } = require('../services')
const bcrypt = require('bcrypt');
const connectDB = require('../utils/db');


require('dotenv').config();

const testUser = async(req, res) => {
    try {
        connectDB();
        let userNameExists = await userService.getUser({ username: "alex" })
        console.log(userNameExists)
        return res.json({"message": "User API working"})
    }
    catch(error) {
        console.log(error)
    }
}

const userSignUp = async(req, res) => {
    const validatedData = userSignUpSchema.validate(req.body)
    if(validatedData.error) {
        res.status(400).json({'error': "Something went wrong! Invalid Request"});
        customErrorandLog('validationError', validatedData.error.details[0].message, validatedData.error.details[0].message, 'error');
    }
    const {username, email, password} = validatedData.value;
    console.log("Password: ", password)

    let usernameExists = await userService.getUser({ username });
    let emailExists = await userService.getUser({ email });
    if(usernameExists) {
        res.status(400).json({"message": "User already exists"});
    } else if(emailExists) {
        res.status(400).json({"message": "E-mail already exists"});
    } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const userCreate = await userService.signUpUser({
            username,
            email,
            password: hashedPass,
            location: "",
            movies_watched: [],
            shows_watched: [],
            last_login: "",
            created_at: new Date().toISOString(),
            modified_at: new Date().toISOString()
        });

        if(userCreate.error) {
            res.status(500).json({'error': "Something went wrong! Invalid Request"});
            customErrorandLog('DatabaseError', error, error, 'error');
        }

        res.status(200).json({'message': 'User created successfully'})
    }
}

module.exports = {
    testUser,
    userSignUp
}