'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('StarsPlanets', {
      StarId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Stars",
          key: "id"
        }
      },
      PlanetId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Planets",
          key: "id"
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('StarsPlanets');
  }
};