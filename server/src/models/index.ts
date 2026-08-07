import { Sequelize, DataTypes, Model } from 'sequelize';
import * as dotenv from 'dotenv';
import path from 'path';


dotenv.config({ path: path.join(__dirname, '../../.env') });

const dbUrl = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/confer';

export const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  logging: false, // Set to console.log to see SQL queries
});

// Import models (will define them next)
import { initUser } from './User';
import { initCall } from './Call';
import { initCallParticipant } from './CallParticipant';
import { initPayment } from './Payment';
import { initCallSummary } from './CallSummary';

export const User = initUser(sequelize);
export const Call = initCall(sequelize);
export const CallParticipant = initCallParticipant(sequelize);
export const Payment = initPayment(sequelize);
export const CallSummary = initCallSummary(sequelize);

// Setup associations
User.hasMany(Call, { foreignKey: 'hostId', as: 'hostedCalls' });
Call.belongsTo(User, { foreignKey: 'hostId', as: 'host' });

Call.hasMany(CallParticipant, { foreignKey: 'callId', as: 'participants' });
CallParticipant.belongsTo(Call, { foreignKey: 'callId' });

User.hasMany(CallParticipant, { foreignKey: 'userId' });
CallParticipant.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Payment, { foreignKey: 'userId' });
Payment.belongsTo(User, { foreignKey: 'userId' });

Call.hasOne(CallSummary, { foreignKey: 'callId' });
CallSummary.belongsTo(Call, { foreignKey: 'callId' });
