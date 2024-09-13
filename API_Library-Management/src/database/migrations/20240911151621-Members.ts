import { QueryInterface, DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('members', {
      code: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('members');
  },
};
