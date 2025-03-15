import { Sequelize } from "sequelize-typescript";
import dotenv, { configDotenv } from 'dotenv'
dotenv.config()


console.log('DB URL:', process.env.DATABASE_URL);
const db = new Sequelize(process.env.DATABASE_URL,{
    models: [__dirname + '/../models/**/*.ts'],
    logging: false
})


export default db