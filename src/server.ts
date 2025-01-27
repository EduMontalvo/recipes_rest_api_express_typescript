import express from "express";
import router from "./router";
import db from "./config/db";

async function connectDB () {
    try{
        await db.authenticate()
        db.sync()
        console.log('CONEXION EXITOSA A LA BD')
    }catch(error){
        console.log(error)
        console.log('ERROR AL CONECTARSE A LA DB')
    }
}

connectDB()

const server = express()

server.use(express.json())

server.use('/api/recipes', router)

export default server