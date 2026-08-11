"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("call_summaries", {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      call_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true,
      },
      summary_text: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      key_points: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      action_items: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      generated_by: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      generated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("call_summaries");
  },
};
