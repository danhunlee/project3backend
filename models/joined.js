module.exports = function(sequelize, DataTypes) {
    var joinedEvent = sequelize.define("JoinedEvent", {
      eventId:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
      }

    });
  
    // joinedEvent.associate = function(models) {
    //   // We're saying that a Post should belong to an User
    //   // A Post can't be created without an User due to the foreign key constraint
    //   joinedEvent.belongsToMany(models.Event, { through: "GamesEvent" });
    //   User.hasMany(Picture, { foreignKey: 'uid' })

    // };
  
    return joinedEvent;
  };