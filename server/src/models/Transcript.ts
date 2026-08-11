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

export class Transcript extends Model<
  InferAttributes<Transcript>,
  InferCreationAttributes<Transcript>
> {
  declare id: CreationOptional<string>;
  declare callId: ForeignKey<Call["id"]>;
  declare speakerId: CreationOptional<ForeignKey<User["id"]> | null>;
  declare text: string;
  declare startOffsetSeconds: CreationOptional<number | null>;
  declare endOffsetSeconds: CreationOptional<number | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initTranscript(sequelize: Sequelize) {
  Transcript.init(
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
      speakerId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: "speaker_id",
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      startOffsetSeconds: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "start_offset_seconds",
      },
      endOffsetSeconds: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "end_offset_seconds",
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
      tableName: "transcripts",
      underscored: true,
    },
  );
  return Transcript;
}
