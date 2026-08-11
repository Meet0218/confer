"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("subscriptions", {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      stripe_subscription_id: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
      },
      plan: {
        type: Sequelize.ENUM("FREE", "PRO"),
        allowNull: false,
        defaultValue: "FREE",
      },
      status: {
        type: Sequelize.ENUM("ACTIVE", "PAST_DUE", "CANCELED"),
        allowNull: false,
        defaultValue: "ACTIVE",
      },
      current_period_start: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      current_period_end: {
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

    await queryInterface.addIndex("subscriptions", ["user_id"]);
    await queryInterface.addIndex("subscriptions", ["status"]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("subscriptions");
  },
};
