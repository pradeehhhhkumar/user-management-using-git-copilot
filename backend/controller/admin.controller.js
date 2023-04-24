const AdminModel = require("../Models/AdminModel");
const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const createToken = require("../utils/createToken");

const controller = {
  // write sample register function with async
  register: async (req, res) => {
    try {
      const admin = await AdminModel.create(req.body);
      console.log("Admin :: ", admin);
      // send response for admin registration
      res.status(200).json({
        status: "success",
        message: "Admin registered successfully",
        data: admin,
      });
    } catch (error) {
      // send response for admin registration failed
      res.status(400).json({
        status: "failure",
        message: "Admin registration failed",
        data: error,
      });
    }
  },
  // write sample login function with async
  login: async (req, res) => {
    try {
      const admin = await AdminModel.findOne({ email: req.body?.email });
      // send response for invalid emailId
      if (!admin) {
        return res.status(400).json({
          status: "failure",
          message: "Invalid email or password",
        });
      } else {
        const isValidPassword = await bcrypt.compare(
          req.body?.password,
          admin.password
        );
        // send response for invalid password
        if (!isValidPassword) {
          return res.status(400).json({
            status: "failure",
            message: "Invalid email or password",
          });
        } else {
          const token = createToken(admin._id);
          // send response for admin login
          return res.status(200).json({
            status: "success",
            message: "Admin logged in successfully",
            data: { admin, token },
          });
        }
      }
    } catch (error) {
      // send response for admin login failure
      return res.status(400).json({
        status: "failure",
        message: "Admin login failed",
        data: { error },
      });
    }
  },
  // write sample getAllUsers function with async
  getAllUsers: async (req, res) => {
    try {
      // send response for getAllUsers
      const users = await UserModel.find();
      return res.status(200).json({
        status: "success",
        message: "Get all users successfully",
        data: users,
      });
    } catch (error) {
      console.error(error);
      // send response for getAllUsers failure
      return res.status(400).json({
        status: "failure",
        message: "Get all users failed",
        data: { error },
      });
    }
  },
  updateUser: async (req, res) => {
    try {
      const user = await UserModel.findByIdAndUpdate(req.params?.id, req.body, {
        new: true,
      });
      // send response for user details update
      return res.status(200).json({
        status: "success",
        message: "User details updated successfully",
        data: user,
      });
    } catch (error) {
      // send response for user details update failure
      return res.status(400).json({
        status: "failure",
        message: "User details update failed",
        data: { error },
      });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await UserModel.findByIdAndDelete(req.params?.id);
      // send response for user details delete
      return res.status(200).json({
        status: "success",
        message: "User details deleted successfully",
        data: user,
      });
    } catch (error) {
      // send response for user details delete failure
      return res.status(400).json({
        status: "failure",
        message: "User details delete failed",
        data: { error },
      });
    }
  },
};

module.exports = controller;
