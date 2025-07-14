//https://github.com/uz-zi/CultureConnect
//https://github.com/uz-zi/Automotive-Studio
const { DataTypes } = require("sequelize");
const sequelize = require("../config");
const User = require("./users.model");

const PropertyPost = sequelize.define("PropertyPost", {
  PostID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  Price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  PropertyType: {
    type: DataTypes.ENUM("house", "plot", "apartment"),
    allowNull: false
  },
  Address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  City: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Area: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Bedrooms: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Bathrooms: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  SizeInSqFt: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  Image: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = PropertyPost;
