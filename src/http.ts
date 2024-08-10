import express from 'express'
import http from 'http'
import path from 'path'
import { Server } from 'socket.io'

const app = express()

app.use(express.static(path.join(__dirname, '..', 'public')))

//server para as rotas
const serverHttp = http.createServer(app)

//server para rotas de comunicação
const io = new Server(serverHttp)

export { serverHttp, io }