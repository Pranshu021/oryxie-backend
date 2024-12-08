const { User } = require("../models/");
const { userSignUpSchema } = require("../validations");
const { customErrorandLog } = require("../utils/helpers");
const { userService } = require("../services");
const bcrypt = require("bcrypt");
const connectDB = require("../utils/db");
const jwt = require("jsonwebtoken");
const environment = process.env.NODE_ENV;
const cookieParser = require('cookie-parser');

require("dotenv").config();

const testUser = async (req, res) => {
  try {
    connectDB();
    let userNameExists = await userService.getUser({ username: "alex" });
    return res.json({ message: "User API working" });
  } catch (error) {
    console.log(error);
  }
};

const userSignUp = async (req, res) => {
  const validatedData = userSignUpSchema.validate(req.body);
  if (validatedData.error) {
    res.status(400).json({ error: "Something went wrong! Invalid Request" });
    customErrorandLog(
      "validationError",
      validatedData.error.details[0].message,
      validatedData.error.details[0].message,
      "error"
    );
  }
  const { username, email, password } = validatedData.value;
  let usernameExists = await userService.getUser({ username });
  let emailExists = await userService.getUser({ email });
  if (usernameExists) {
    res.status(400).json({ message: "User already exists" });
  } else if (emailExists) {
    res.status(400).json({ message: "E-mail already exists" });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const userCreate = await userService.signUpUser({
      username,
      email,
      password: hashedPass,
      refresh_tokens: [],
      location: "",
      movies_watched: [],
      shows_watched: [],
      last_login: "",
      created_at: new Date().toISOString(),
      modified_at: new Date().toISOString(),
    });

    if (userCreate.error) {
      res.status(500).json({ error: "Something went wrong! Invalid Request" });
      customErrorandLog("DatabaseError", error, error, "error");
    }

    res.status(200).json({ message: "User created successfully" });
  }
};

const userLogin = async (req, res) => {
  const usernameOrEmail = req.body.username;
  const password = req.body.password;

  const userExists = await userService.getUser({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  });

  if (userExists.length > 0) {
    bcrypt.compare(password, userExists[0].password, async(err, result) => {
      // console.log("Error and Result", err, result)
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
      } else if (!result) {
        res.status(403).json({ error: "Incorrect username or password" });
      } else {
        userData = {
          username: userExists[0].username,
        };
        const access_token = jwt.sign(userData, process.env.DEV_JWT_ACCESS_TOKEN, { expiresIn: '15m' });
        const refresh_token = jwt.sign(userData, process.env.DEV_JWT_REFRESH_TOKEN, { expiresIn: '30d' });

        res.cookie('refreshToken', refresh_token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: false,
        });

        res.status(200).json({ message: "Login successful", token: access_token });
      }
    });
  } else {
    res.status(401).json({ error: "Incorrect Username or Password" });
  }
};

const userTokenGenerate = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken || refreshToken === "") {
        res.status(401).json({"error": "UNAUTHORIZED"})
    } else {
        jwt.verify(refreshToken, process.env.DEV_JWT_REFRESH_TOKEN, (err, user) => {
            if(err) {
                res.status(500).json({"error": "Something went wrong"}) 
                const logString = "[-] Error while verifying refresh token - " + err;
                customErrorandLog('serverError', err, logString, 'error');
            }
            
            const new_token = jwt.sign({username: user.username}, process.env.DEV_JWT_ACCESS_TOKEN, {expiresIn: "1h"});
            res.status(200).json({"message": "Token Refreshed", "token": new_token});
        })
    }
}

const userLogout = async(req, res) => {
    res.cookie('refreshToken', '', {maxAge: 0, httpOnly: true, secure: false, sameSite: 'lax'});
}


const userDashboard = async (req, res) => {
    res.status(200).json({"message": "Dashboard API is working"});
}

module.exports = {
  testUser,
  userSignUp,
  userLogin,
  userDashboard,
  userTokenGenerate,
  userLogout
};


// Login Code

        // const updateUserRefreshToken = await userService.updateUserRefreshToken(userExists[0].id, refresh_token);
        // if(updateUserRefreshToken.error && updateUserRefreshToken.error !== "") {
        //     res.status(500).json({"error": "Something went Wrong!"});
        //     customErrorandLog("databaseError", updateUserRefreshToken.error, updateUserRefreshToken.error, "error");
        // }