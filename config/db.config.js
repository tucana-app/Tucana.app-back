require("dotenv").config();
require("dotenv").config({ path: "../.env" });

module.exports = {
  development: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      useUTC: false, // for reading from database
    },
    timezone: "-06:00", // for writing to database
  },
  production: {
    url: process.env.DATABASE_URL,

    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
      useUTC: false, // for reading from database
    },
    timezone: "-06:00", // for writing to database
  },
};
