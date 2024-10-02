'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Companies', 'nit', {
      type: Sequelize.STRING,
      allowNull: false, // Mantener la restricción de no nulo
      unique: false, // Quitar la restricción de unicidad
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Companies', 'nit', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true, // Restaurar la restricción de unicidad
    });
  }
};
