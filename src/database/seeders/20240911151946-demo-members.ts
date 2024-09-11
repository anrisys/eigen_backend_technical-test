import { QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('Members', [
      {
        code: 'M001',
        name: 'Angga',
      },
      {
        code: 'M002',
        name: 'Ferry',
      },
      {
        code: 'M003',
        name: 'Putri',
      },
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('Members', null, {});
  },
};
