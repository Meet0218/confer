import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';
import { snowflake } from '../utils/snowflake';
import { User } from './User';

export class Call extends Model<InferAttributes<Call>, InferCreationAttributes<Call>> {
  declare id: CreationOptional<string>;
  declare roomName: string;
  declare hostId: ForeignKey<User['id']>;
  declare status: CreationOptional<string>;
  declare startedAt: CreationOptional<Date>;
  declare endedAt: CreationOptional<Date | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initCall(sequelize: Sequelize) {
  Call.init(
    {
      id: {
        type: DataTypes.BIGINT,
        defaultValue: () => snowflake.generate(),
        primaryKey: true,
      },
      roomName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active',
      },
      startedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      endedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'calls',
    }
  );
  return Call;
}
