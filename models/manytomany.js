module.exports = function(sequelize, DataTypes) {
    var UserToCreateEvents = sequelize.define("UserToCreateEvents", {
      // Giving the User model a name of type STRING
      users_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      createBoardgames_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
      });
  
      UserToCreateEvents.associate = function(models) {
      // Associating User with Posts
      // When an User is deleted, also delete any associated Posts
      UserToCreateEvents.belongsToMany(models.User, {
        as: "events",  
        through: "name_events",
        foreignKey: "UserToCreateEventsId"
      });
    };
  
    return UserToCreateEvents;
  };
  