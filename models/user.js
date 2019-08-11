module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // Giving the User model a name of type STRING
    userName: {
      unique: true,
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
    });
  User.associate = function(models) {
    // Associating User with Posts
    // When an User is deleted, also delete any associated Posts
    User.belongsToMany(models.Event, {
      through: "userEvent",
      as: "users",
      foreignKey: "userId",
      otherKey: "eventId",
      onDelete: "cascade"
    });
  };

  return User;
};
