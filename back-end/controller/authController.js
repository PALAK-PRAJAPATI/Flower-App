import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../model/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    // user data get Destructure request.body .
    const { name, email, password, phone, address, answer } = req.body;

    // validation.
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone Number is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }

    // Check User.
    const existingUser = await userModel.findOne({ email }); // {key:value}  here key and value are same.
    // existing User.
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register Please Login",
      });
    }

    // hash Password.
    const hashedPassword = await hashPassword(password);

    // user Save.
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully...",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error: error,
    });
  }
};

// LOGIN Controller.
export const loginController = async (req, res) => {
  try {
    // get user email and password destructure request.bodu.
    const { email, password } = req.body;
    // validation.
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // check user.
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not Registered",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    // token.
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully...",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Login",
      error,
    });
  }
};

// forgotpassword controller.
export const forgorPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.send({ message: "Email is Required" });
    }
    if (!answer) {
      res.send({ message: "Answer is Required" });
    }
    if (!newPassword) {
      res.send({ message: "NewPassword is Required" });
    }
    // check.
    const user = await userModel.findOne({ email, answer });
    // validation.
    if (!user) {
      res.status(500).send({
        success: false,
        message: "Email or Answer Invalid",
      });
    }

    // convert new password into hash password.
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully...",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Something Went Wrong",
      error,
    });
  }
};

// test route.
export const testController = async (req, res) => {
  try {
    res.send("Protected Route");
  } catch (error) {
    res.send({ error });
  }
};

// update profile.
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};
