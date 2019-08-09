'use strict';

// Run using `npx sequelize-cli db:seed:all`

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('games', [{
      gameName: 'Catan',
      gameDescript: 'A fun game for settlers',
      totalTimesPlayed: 100,
      maxOfPlayers: 4,
      picture: 'https://images.app.goo.gl/7Y1bSmGuaJ7yHNba8',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('games', {gameName: 'Catan'}, {});
  }
};
