"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("call_participants", {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      call_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM("HOST", "PARTICIPANT"),
        allowNull: false,
        defaultValue: "PARTICIPANT",
      },
      joined_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      left_at: {
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

    await queryInterface.addIndex("call_participants", ["call_id", "user_id"], {
      unique: true,
      name: "call_participants_call_id_user_id_unique",
    });
    await queryInterface.addIndex("call_participants", ["call_id"]);
    await queryInterface.addIndex("call_participants", ["user_id"]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("call_participants");
  },
};
