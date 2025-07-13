const User = require('./users.model');
const PropertyPost = require('./proprtyPosts.model');

User.hasMany(PropertyPost, { foreignKey: "UserID", onDelete: "CASCADE" });
PropertyPost.belongsTo(User, { foreignKey: "UserID" });

module.exports = {
  User,
  PropertyPost
};
