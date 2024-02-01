import express from "express"
import http from "http"
import dotenv from "dotenv"
import router from "./routers"
import { connectToDatabase } from "./db"

dotenv.config()

const app = express()


const server = http.createServer(app)

const PORT = 3000;
const host = "127.0.0.1"

server.listen(PORT, host, () => {
    // http://127.0.0.1:3000
    console.log(`Server is running on ${host}:${PORT}`);
})

connectToDatabase()


app.use("/", router())