module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    eventTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
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
    maxOfPlayers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1]
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1]
    },
    UserId: {
      type: DataTypes.INTEGER,
      // allowNull: false,

    }
  });

  Post.associate = function(models) {
    // We're saying that a Post should belong to an User
    // A Post can't be created without an User due to the foreign key constraint
    Post.belongsTo(models.User, {
      foreignKey: {
        // allowNull: false
      }
    });
  };

  return Post;
};
