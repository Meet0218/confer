require('dotenv').config();

const url = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/confer';

module.exports = {
  development: {
    url,
    dialect: 'postgres',
  },
  test: {
    url,
    dialect: 'postgres',
  },
  production: {
    url,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
