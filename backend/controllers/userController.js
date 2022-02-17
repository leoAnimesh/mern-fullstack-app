const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");
const asynHandler = require("express-async-handler");
const userModel = require("../models/userModel");

const registerUser = asynHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all feilds");
  }

  //check if user exists
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //hash the password
  const salt = await bycrypt.genSalt(10);
  const hashedPassword = await bycrypt.hash(password, salt);

  // create user
  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: GenerateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asynHandler(async (req, res) => {
  const { email, password } = req.body;

  //check for user email
  const user = await userModel.findOne({ email });

  if (user && (await bycrypt.compare(password, user.password))) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: GenerateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid email and password");
  }
});

const getMe = asynHandler(async (req, res) => {
  const { _id, name, email } = await userModel.findById(req.user.id);
  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

//Generate JWT
const GenerateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
