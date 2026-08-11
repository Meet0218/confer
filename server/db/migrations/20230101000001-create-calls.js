"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("calls", {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      room_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      host_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("SCHEDULED", "ONGOING", "ENDED", "CANCELLED"),
        allowNull: false,
        defaultValue: "SCHEDULED",
      },
      started_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      ended_at: {
        type: Sequelize.DATE,
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

    await queryInterface.addIndex("calls", ["host_id"]);
    await queryInterface.addIndex("calls", ["status"]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("calls");
  },
};
