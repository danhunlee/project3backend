module.exports = function(sequelize, DataTypes) {
    var userEvent = sequelize.define("userEvent", {
        eventId: {
            unique: true,
            type: UUID,
            allowNull: false,
         },
         userId: {
            unique: true,
            type: UUID,
            allowNull: false,
         }


    });

    // Event.associate = function(models) {
    //     Event.hasMany(models.Games, { through: "GamesEvent" });
    //     User.hasMany(models.Games, { through: "GamesEvent" });    
    //   };
}