const User = require("../models/users.model");
const sequelize = require("../config");
const bcrypt = require("bcrypt");

const signUpUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.pass, 10);
    const newUser = await User.create({
      FirstName: req.body.fname,
      LastName: req.body.lname,
      Email: req.body.email,
      Password: hashedPassword,
      PhoneNumber: req.body.pnum,
    });

    res.status(201).json({ message: "User created successfully", userId: newUser.UserID });
  } catch (error) {
    console.error("Error in signUpUser: ", error);
    res.status(500).send(error.message);
  }
};

const signInUser = async (req, res) => {
  try {
    await sequelize.sync();

    const { email, pass } = req.body;
    const user = await User.findOne({
      where: { Email: email },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(pass, user.Password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      user_ID: user.UserID,
      role: user.role,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error in signInUser:", error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  signInUser,
  signUpUser,
}