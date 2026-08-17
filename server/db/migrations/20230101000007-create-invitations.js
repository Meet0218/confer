"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("invitations", {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      call_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      invited_user_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      invited_email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      token_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      used_at: {
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

    await queryInterface.addIndex("invitations", ["call_id"]);
    await queryInterface.addIndex("invitations", ["invited_user_id"]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("invitations");
  },
};
