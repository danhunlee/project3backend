module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define("Event", {
    eventTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    gameName: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    maxPlayers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1]
    },
    dateTime: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    gpsLocation: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });

  Event.associate = function(models) {
    // We're saying that a Post should belong to an User
    // A Post can't be created without an User due to the foreign key constraint
    Event.belongsToMany(models.Games, { through: "GamesEvent" });
    Event.belongsToMany(models.User, { through: "UserEvent" });
    Event.belongsTo(models.JoinedEvent, {
      foreignKey: 'eventId',
      constraints: false,
    });
  };

  return Event;
};
