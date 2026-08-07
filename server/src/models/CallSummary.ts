import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';
import { snowflake } from '../utils/snowflake';
import { Call } from './Call';

export class CallSummary extends Model<InferAttributes<CallSummary>, InferCreationAttributes<CallSummary>> {
  declare id: CreationOptional<string>;
  declare callId: ForeignKey<Call['id']>;
  declare transcript: CreationOptional<string | null>;
  declare keyPoints: CreationOptional<string[] | null>;
  declare actionItems: CreationOptional<string[] | null>;
  declare rawResponse: CreationOptional<any>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initCallSummary(sequelize: Sequelize) {
  CallSummary.init(
    {
      id: {
        type: DataTypes.BIGINT,
        defaultValue: () => snowflake.generate(),
        primaryKey: true,
      },
      transcript: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      keyPoints: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      actionItems: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      rawResponse: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'call_summaries',
    }
  );
  return CallSummary;
}
