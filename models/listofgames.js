module.exports = function(sequelize, DataTypes) {
    var ListOfGames = sequelize.define("ListOfGames", {
      gameTitle: {
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
  
    ListOfGames.associate = function(models) {
      // We're saying that a Post should belong to an User
      // A Post can't be created without an User due to the foreign key constraint
      ListOfGames.belongsTo(models.User, {
        foreignKey: {
          allowNull: true
        }
      });
    };
  
    return ListOfGames;
  };