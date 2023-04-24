// imports
const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const createToken = require("../utils/createToken");

const controller = {
  // write sample register function with async
  register: async (req, res) => {
    try {
      // register controller for user
      const user = await UserModel.create(req.body);
      console.log("User :: ", user);
      // send response for user registration
      return res.status(200).json({
        status: "success",
        message: "User registered successfully",
        data: { user },
      });
    } catch (error) {
      console.log(error);
      // send response for user registration failure
      return res.status(400).json({
        status: "failure",
        message: "User registration failed",
        data: { error },
      });
    }
  },
  // write sample login function with async
  login: async (req, res) => {
    try {
      // login controller for user
      const user = await UserModel.findOne({ email: req.body?.email });
      // send response for invalid emailId
      if (!user) {
        return res.status(400).json({
          status: "failure",
          message: "Invalid email or password",
        });
      } else {
        const isValidPassword = await bcrypt.compare(
          req.body?.password,
          user.password
        );
        // send response for invalid password
        if (!isValidPassword) {
          console.log("Hey there");
          return res.status(400).json({
            status: "failure",
            message: "Invalid email or password",
          });
        } else {
          const token = createToken(user._id);
          // send response for user login
          return res.status(200).json({
            status: "success",
            message: "User logged in successfully",
            data: { user, token },
          });
        }
      }
    } catch (error) {
      // send response for user login failure
      return res.status(400).json({
        status: "failure",
        message: "User login failed",
        data: { error },
      });
    }
  },
  getUserDetails: async (req, res) => {
    try {
      const user = await UserModel.findById(req.params?.id);
      // send response for user details
      return res.status(200).json({
        status: "success",
        message: "User details fetched successfully",
        data: user,
      });
    } catch (error) {
      // send response for user details failure
      return res.status(400).json({
        status: "failure",
        message: "User details failed",
        data: { error },
      });
    }
  },
};

module.exports = controller;
