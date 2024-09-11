import { QueryInterface, DataTypes } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('penalties', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      borrowing_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'borrowings',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      imposed_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      due_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    queryInterface.dropTable('penalties');
  },
};
