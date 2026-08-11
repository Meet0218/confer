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
import { Call } from "./Call";

export class CallSummary extends Model<
  InferAttributes<CallSummary>,
  InferCreationAttributes<CallSummary>
> {
  declare id: CreationOptional<string>;
  declare callId: ForeignKey<Call["id"]>;
  declare summaryText: string;
  declare keyPoints: CreationOptional<any | null>;
  declare actionItems: CreationOptional<any | null>;
  declare generatedBy: CreationOptional<string | null>;
  declare generatedAt: CreationOptional<Date>;
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
      callId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        field: "call_id",
      },
      summaryText: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "summary_text",
      },
      keyPoints: {
        type: DataTypes.JSONB,
        allowNull: true,
        field: "key_points",
      },
      actionItems: {
        type: DataTypes.JSONB,
        allowNull: true,
        field: "action_items",
      },
      generatedBy: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "generated_by",
      },
      generatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "generated_at",
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
      tableName: "call_summaries",
      underscored: true,
    },
  );
  return CallSummary;
}
