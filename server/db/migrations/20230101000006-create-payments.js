"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("payments", {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      stripe_payment_id: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "usd",
      },
      status: {
        type: Sequelize.ENUM("PENDING", "SUCCEEDED", "FAILED"),
        allowNull: false,
        defaultValue: "PENDING",
      },
      description: {
        type: Sequelize.STRING,
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

    await queryInterface.addIndex("payments", ["user_id"]);
    await queryInterface.addIndex("payments", ["status"]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("payments");
  },
};
