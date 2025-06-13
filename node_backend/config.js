const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("prgraming_for_information_system", "postgres", "Admin", {
  host: "localhost",
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

module.exports = sequelize;