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
  Images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
});

// Define association
User.hasMany(PropertyPost, { foreignKey: "UserID", onDelete: "CASCADE" });
PropertyPost.belongsTo(User, { foreignKey: "UserID" });

module.exports = PropertyPost;
