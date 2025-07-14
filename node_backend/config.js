//https://sequelize.org/docs/v7/databases/postgres/
//https://youtu.be/bOHysWYMZM0?si=4iRR2cj-_IxgaNw2
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  "prgraming_for_information_system", 
  "postgres",
  "Admin", 
  {
    host: "localhost",
    dialect: "postgres",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

module.exports = sequelize;