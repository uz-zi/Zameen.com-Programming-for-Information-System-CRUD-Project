const User = require("../models/users.model");
const PropertyPost = require('../models/proprtyPosts.model');
const sequelize = require("../config");
const bcrypt = require("bcrypt");

const signUpUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.Password, 10);
    console.log("Hashed password:", hashedPassword);
    const newUser = await User.create({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Email: req.body.Email,
      Password: hashedPassword,
      PhoneNumber: req.body.PhoneNumber,
    });

    res.status(201).json({ message: "User created successfully", userId: newUser.UserID });
  } catch (error) {
    console.error("Error in signUpUser: ", error);
    res.status(500).send(error.message);
  }
};

const signInUser = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    console.log("===========", req.body);

    if (!Email || !Password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ where: { Email } });
    console.log("================found email")

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(Password, user.Password);
    console.log("Plain password:", Password);
    console.log("Hashed password from DB:", user.Password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    console.log("================found password")

    return res.status(200).json({
      userId: user.UserID,
      role: user.role,
      message: "Login successful",
    });

  } catch (error) {
    console.error("Error in signInUser:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const userProfile = async (req, res) => {
  try {
    const userId = req.query.id;

    const user = await User.findOne({
      where: { UserID: userId },
      attributes: { exclude: ['Password'] }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    console.log("----------", user)
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const createPropertyPost = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      propertyType,
      address,
      city,
      area,
      bedrooms,
      bathrooms,
      sizeInSqFt,
    } = req.body;

    const newPost = await PropertyPost.create({
      Title: title,
      Description: description,
      Price: price,
      PropertyType: propertyType,
      Address: address,
      City: city,
      Area: area,
      Bedrooms: bedrooms || null,
      Bathrooms: bathrooms || null,
      SizeInSqFt: sizeInSqFt,
      UserID: 1
    });

    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error('Create Post Error:', error);
    res.status(500).json({ message: 'Failed to create post', error: error.message });
  }
};

module.exports = {
  signInUser,
  signUpUser,
  userProfile,
  createPropertyPost
}