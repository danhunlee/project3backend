module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // Giving the User model a name of type STRING
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    // email: {
    //   type: DataTypes.TEXT,
    //   allowNull: false,
    // },
    // userName: {
    //   type: DataTypes.STRING,
    //   // allowNull: false,
    // }
    });

  User.associate = function(models) {
    // Associating User with Posts
    // When an User is deleted, also delete any associated Posts
    User.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };

  return User;
};
