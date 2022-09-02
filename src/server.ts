import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'

const PORT_IO = 3333
const PORT_HTTP = 2222

const app = express()
app.use(cors())
const server = http.createServer(app);
const io = new Server(server)

server.listen(PORT_IO, () =>
    console.log(`Socket.io ouvindo na porta ${PORT_IO}`)
)

app.listen(PORT_HTTP, () => 
    console.log(`Http ouvindo na porta ${PORT_HTTP}`)
)

io.on('connection', (socket) => {
    console.log('connected', socket.id);
})

export {app, io}
