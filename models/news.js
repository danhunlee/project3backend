module.exports = function(sequelize, DataTypes) {
    var News = sequelize.define("News", {
      // Giving the User model a name of type STRING
    title: {
        unique: true,
        type: DataTypes.STRING,
        allowNull: false,
      },
      summary: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      link: {
        type: DataTypes.STRING,
      },
      });
  
  
    return News;
};
  