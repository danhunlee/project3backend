module.exports = function(sequelize, DataTypes) {
    var Games = sequelize.define("Games", {
      gameName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      gameDescript: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      totalTimesPlayed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        len: [1]
      },
      maxOfPlayers: {
        type: DataTypes.INTEGER,
        allowNull: false,
        len: [1]
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [1]
      }
    });
  
    // Games.associate = function(models) {
    //   // We're saying that a Post should belong to an User
    //   // A Post can't be created without an User due to the foreign key constraint
    //   Games.belongsToMany(models.Event, { through: "GamesEvent" });

    // };
  
    return Games;
  };