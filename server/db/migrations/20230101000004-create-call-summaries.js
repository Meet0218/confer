'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('call_summaries', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      callId: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: 'calls',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      transcript: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      keyPoints: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      actionItems: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      rawResponse: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('call_summaries');
  }
};
