const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const User = sequelize.define("User", {
  UserID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  FirstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  LastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  PhoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Profile_pic: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Bio: {
     type: DataTypes.STRING,
     allowNull: true
  }
});

module.exports = User;
