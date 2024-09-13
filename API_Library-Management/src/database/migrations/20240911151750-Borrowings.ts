import { DataTypes, QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('borrowings', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      member_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'members',
          key: 'code',
        },
        onDelete: 'CASCADE',
      },
      book_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'books',
          key: 'code',
        },
        onDelete: 'CASCADE',
      },
      borrowed_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: queryInterface.sequelize.literal('CURRENT_TIMESTAMP'),
      },
      return_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: queryInterface.sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: queryInterface.sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        ),
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    queryInterface.dropTable('borrowings');
  },
};
