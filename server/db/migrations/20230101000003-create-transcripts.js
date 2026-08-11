"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("transcripts", {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      call_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      speaker_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      start_offset_seconds: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      end_offset_seconds: {
        type: Sequelize.INTEGER,
        allowNull: true,
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

    await queryInterface.addIndex("transcripts", ["call_id"]);
    await queryInterface.addIndex("transcripts", ["speaker_id"]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("transcripts");
  },
};
