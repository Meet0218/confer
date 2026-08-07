import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';
import { snowflake } from '../utils/snowflake';
import { Call } from './Call';
import { User } from './User';

export class CallParticipant extends Model<InferAttributes<CallParticipant>, InferCreationAttributes<CallParticipant>> {
  declare id: CreationOptional<string>;
  declare callId: ForeignKey<Call['id']>;
  declare userId: ForeignKey<User['id']>;
  declare joinedAt: CreationOptional<Date>;
  declare leftAt: CreationOptional<Date | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initCallParticipant(sequelize: Sequelize) {
  CallParticipant.init(
    {
      id: {
        type: DataTypes.BIGINT,
        defaultValue: () => snowflake.generate(),
        primaryKey: true,
      },
      joinedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      leftAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'call_participants',
    }
  );
  return CallParticipant;
}
