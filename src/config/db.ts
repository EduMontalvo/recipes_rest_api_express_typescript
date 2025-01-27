import { Sequelize } from "sequelize-typescript";
import dotenv, { configDotenv } from 'dotenv'
dotenv.config()

const db = new Sequelize(process.env.DATABASE_URL,{
    models: [__dirname + '/../models/**/*.ts']
})

export default db