import { Sequelize } from 'sequelize';

 const sequelize = new Sequelize(
    process.env.DATA_BASE_NAME,
    process.env.DATA_BASE_USER,
    process.env.DATA_BASE_PASSWORD,
    {
        dialect: process.env.DATA_BASE_DIALECT,
        host: process.env.DATA_BASE_LOCALHOST,
        port: process.env.DATA_BASE_PORT,
    }
);

export default sequelize;