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
import { User } from "./User";

export enum ParticipantRole {
  HOST = "HOST",
  PARTICIPANT = "PARTICIPANT",
}

export class CallParticipant extends Model<
  InferAttributes<CallParticipant>,
  InferCreationAttributes<CallParticipant>
> {
  declare id: CreationOptional<string>;
  declare callId: ForeignKey<Call["id"]>;
  declare userId: ForeignKey<User["id"]>;
  declare role: CreationOptional<ParticipantRole>;
  declare joinedAt: CreationOptional<Date | null>;
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
      callId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "call_id",
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "user_id",
      },
      role: {
        type: DataTypes.ENUM("HOST", "PARTICIPANT"),
        allowNull: false,
        defaultValue: ParticipantRole.PARTICIPANT,
      },
      joinedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "joined_at",
      },
      leftAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "left_at",
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
      tableName: "call_participants",
      underscored: true,
    },
  );
  return CallParticipant;
}
