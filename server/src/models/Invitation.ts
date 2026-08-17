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

export class Invitation extends Model<
  InferAttributes<Invitation>,
  InferCreationAttributes<Invitation>
> {
  declare id: CreationOptional<string>;
  declare callId: ForeignKey<Call["id"]>;
  declare invitedUserId: CreationOptional<ForeignKey<User["id"]> | null>;
  declare invitedEmail: CreationOptional<string | null>;
  declare tokenHash: CreationOptional<string>;
  declare usedAt: CreationOptional<Date | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initInvitation(sequelize: Sequelize) {
  Invitation.init(
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
      invitedUserId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: "invited_user_id",
      },
      invitedEmail: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "invited_email",
      },
      tokenHash: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "token_hash",
      },
      usedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "used_at",
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
      tableName: "invitations",
      underscored: true,
    },
  );

  return Invitation;
}
