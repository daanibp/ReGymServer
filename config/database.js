import { Sequelize } from "sequelize";
// Usamos `require` para cargar el archivo JSON
import path from "path";

const config = require(path.join(__dirname, "config.json"));

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
    }
);

export default sequelize;
