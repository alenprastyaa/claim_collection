const { Sequelize } = require("sequelize");

const Db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER || "alen",
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres",
        logging: false,
    }
);


module.exports = Db;
