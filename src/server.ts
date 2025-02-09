import express from "express";
import router from "./router";
import db from "./config/db";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs, { swaggerUiOptions } from "./config/swagger";


export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.cyan('CONEXION EXITOSA A LA BD'))
    } catch (error) {
        // console.log(error)
        console.log('ERROR AL CONECTARSE A LA DB')
    }
}

connectDB()

const server = express()

server.use(express.json())

server.use('/api/recipes', router)
//? Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, swaggerUiOptions))

export default server