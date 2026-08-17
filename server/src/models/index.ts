import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const dbUrl =
  process.env.DATABASE_URL ||
  "postgres://postgres:postgres@localhost:5432/confer";

export const sequelize = new Sequelize(dbUrl, {
  dialect: "postgres",
  logging: false,
});

import { initUser } from "./User";
import { initCall } from "./Call";
import { initCallParticipant } from "./CallParticipant";
import { initTranscript } from "./Transcript";
import { initCallSummary } from "./CallSummary";
import { initSubscription } from "./Subscription";
import { initPayment } from "./Payment";
import { initInvitation } from "./Invitation";

export const User = initUser(sequelize);
export const Call = initCall(sequelize);
export const CallParticipant = initCallParticipant(sequelize);
export const Transcript = initTranscript(sequelize);
export const CallSummary = initCallSummary(sequelize);
export const Subscription = initSubscription(sequelize);
export const Payment = initPayment(sequelize);
export const Invitation = initInvitation(sequelize);

export * from "./User";
export * from "./Call";
export * from "./CallParticipant";
export * from "./Transcript";
export * from "./CallSummary";
export * from "./Subscription";
export * from "./Payment";
export * from "./Invitation";

// Setup associations (without creating database foreign key constraints)
User.hasMany(Call, {
  foreignKey: "hostId",
  as: "hostedCalls",
  constraints: false,
});
Call.belongsTo(User, { foreignKey: "hostId", as: "host", constraints: false });

Call.hasMany(CallParticipant, {
  foreignKey: "callId",
  as: "participants",
  constraints: false,
});
CallParticipant.belongsTo(Call, { foreignKey: "callId", constraints: false });

User.hasMany(CallParticipant, { foreignKey: "userId", constraints: false });
CallParticipant.belongsTo(User, { foreignKey: "userId", constraints: false });

Call.hasMany(Transcript, {
  foreignKey: "callId",
  as: "transcripts",
  constraints: false,
});
Transcript.belongsTo(Call, { foreignKey: "callId", constraints: false });

User.hasMany(Transcript, {
  foreignKey: "speakerId",
  as: "spokenTranscripts",
  constraints: false,
});
Transcript.belongsTo(User, {
  foreignKey: "speakerId",
  as: "speaker",
  constraints: false,
});

Call.hasOne(CallSummary, {
  foreignKey: "callId",
  as: "summary",
  constraints: false,
});
CallSummary.belongsTo(Call, { foreignKey: "callId", constraints: false });

// Invitations
Call.hasMany(Invitation, {
  foreignKey: "callId",
  as: "invitations",
  constraints: false,
});
Invitation.belongsTo(Call, { foreignKey: "callId", constraints: false });

User.hasMany(Invitation, { foreignKey: "invitedUserId", constraints: false });
Invitation.belongsTo(User, { foreignKey: "invitedUserId", constraints: false });

User.hasMany(Subscription, {
  foreignKey: "userId",
  as: "subscriptions",
  constraints: false,
});
Subscription.belongsTo(User, { foreignKey: "userId", constraints: false });

User.hasMany(Payment, {
  foreignKey: "userId",
  as: "payments",
  constraints: false,
});
Payment.belongsTo(User, { foreignKey: "userId", constraints: false });
