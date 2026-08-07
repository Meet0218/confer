import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';
import { snowflake } from '../utils/snowflake';
import { User } from './User';

export class Payment extends Model<InferAttributes<Payment>, InferCreationAttributes<Payment>> {
  declare id: CreationOptional<string>;
  declare userId: ForeignKey<User['id']>;
  declare stripeSessionId: string;
  declare stripeCustomerId: CreationOptional<string | null>;
  declare amount: number;
  declare currency: CreationOptional<string>;
  declare status: string;
  declare metadata: CreationOptional<any>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initPayment(sequelize: Sequelize) {
  Payment.init(
    {
      id: {
        type: DataTypes.BIGINT,
        defaultValue: () => snowflake.generate(),
        primaryKey: true,
      },
      stripeSessionId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stripeCustomerId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'usd',
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      metadata: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'payments',
    }
  );
  return Payment;
}
