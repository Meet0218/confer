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

export enum CallStatus {
  SCHEDULED = "SCHEDULED",
  ONGOING = "ONGOING",
  ENDED = "ENDED",
  CANCELLED = "CANCELLED",
}

export class Call extends Model<
  InferAttributes<Call>,
  InferCreationAttributes<Call>
> {
  declare id: CreationOptional<string>;
  declare roomName: string;
  declare hostId: ForeignKey<User["id"]>;
  declare title: CreationOptional<string | null>;
  declare status: CreationOptional<CallStatus>;
  declare startedAt: CreationOptional<Date | null>;
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
        field: "room_name",
      },
      hostId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "host_id",
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("SCHEDULED", "ONGOING", "ENDED", "CANCELLED"),
        allowNull: false,
        defaultValue: CallStatus.SCHEDULED,
      },
      startedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "started_at",
      },
      endedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "ended_at",
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
      tableName: "calls",
      underscored: true,
    },
  );
  return Call;
}
