import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import routes from './routes'
import { joinMatch } from './controller'

const PORT_IO = 3333
const PORT_HTTP = 2222

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api', routes)

const server = http.createServer(app);
const io = new Server(server)

server.listen(PORT_IO, () =>
    console.log(`Socket.io ouvindo na porta ${PORT_IO}`)
)

app.listen(PORT_HTTP, () => 
    console.log(`Http ouvindo na porta ${PORT_HTTP}`)
)

io.on('connection', (socket) => {
    const {id} = socket
    console.log('connected', socket.id)

    socket.on('join', (match:string) => {
        joinMatch(id, match)
    })
})

export {app, io}
