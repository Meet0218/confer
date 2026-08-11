import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from "sequelize";
import { snowflake } from "../utils/snowflake";
import { User } from "./User";

export enum SubscriptionPlan {
  FREE = "FREE",
  PRO = "PRO",
}

export enum SubscriptionStatus {
  ACTIVE = "ACTIVE",
  PAST_DUE = "PAST_DUE",
  CANCELED = "CANCELED",
}

export class Subscription extends Model<
  InferAttributes<Subscription>,
  InferCreationAttributes<Subscription>
> {
  declare id: CreationOptional<string>;
  declare userId: ForeignKey<User["id"]>;
  declare stripeSubscriptionId: CreationOptional<string | null>;
  declare plan: CreationOptional<SubscriptionPlan>;
  declare status: CreationOptional<SubscriptionStatus>;
  declare currentPeriodStart: CreationOptional<Date | null>;
  declare currentPeriodEnd: CreationOptional<Date | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initSubscription(sequelize: Sequelize) {
  Subscription.init(
    {
      id: {
        type: DataTypes.BIGINT,
        defaultValue: () => snowflake.generate(),
        primaryKey: true,
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "user_id",
      },
      stripeSubscriptionId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
        field: "stripe_subscription_id",
      },
      plan: {
        type: DataTypes.ENUM("FREE", "PRO"),
        allowNull: false,
        defaultValue: SubscriptionPlan.FREE,
      },
      status: {
        type: DataTypes.ENUM("ACTIVE", "PAST_DUE", "CANCELED"),
        allowNull: false,
        defaultValue: SubscriptionStatus.ACTIVE,
      },
      currentPeriodStart: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "current_period_start",
      },
      currentPeriodEnd: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "current_period_end",
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
      },
    },
    {
      sequelize,
      tableName: "subscriptions",
      underscored: true,
    },
  );
  return Subscription;
}
