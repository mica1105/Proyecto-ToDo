'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING
      },
      fechaCreacion: {
        type: Sequelize.DATE
      },
      fechaResolucion: {
        type: Sequelize.DATE
      },
      descripcion: {
        type: Sequelize.STRING
      },
      prioridad: {
        type: Sequelize.INTEGER
      },
      fechaLimite: {
        type: Sequelize.DATE
      },
      estado: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('items');
  }
};