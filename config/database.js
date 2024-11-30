import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Determinar si estamos en producción o desarrollo
const isProduction = process.env.NODE_ENV === "production";

// Configuración de la base de datos
const dbConfig = isProduction
    ? {
          username: process.env.MYSQL_USER,
          password: process.env.MYSQL_PASSWORD,
          database: process.env.MYSQL_DATABASE,
          host: process.env.MYSQL_HOST,
          dialect: process.env.DB_DIALECT || "mysql",
          dialectOptions: {
              ssl: {
                  require: true,
                  rejectUnauthorized: false,
              },
          },
      }
    : {
          username: process.env.LOCAL_MYSQL_USER || "root",
          password: process.env.LOCAL_MYSQL_PASSWORD || "1234",
          database: process.env.LOCAL_MYSQL_DATABASE || "regym",
          host: process.env.LOCAL_MYSQL_HOST || "127.0.0.1",
          dialect: process.env.LOCAL_DB_DIALECT || "mysql",
      };

// Crear una nueva instancia de Sequelize
const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        dialectOptions: dbConfig.dialectOptions,
    }
);

// Probar la conexión
sequelize
    .authenticate()
    .then(() => {
        console.log("Conexión a la base de datos establecida con éxito.");
    })
    .catch((error) => {
        console.error("Error al conectar con la base de datos:", error);
    });

export default sequelize;
