import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import routes from './routes'
import { Match } from './match'
import { test } from './test'

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

app.listen(PORT_HTTP, () => {
    console.log(`Http ouvindo na porta ${PORT_HTTP}`)
    test()
}
)

io.on('connection', (socket) => {
    const playerID = socket.id
    console.log('connected', playerID)


    socket.on('join', (matchID:string) => {
        const match = new Match(matchID)
        match.connectPlayer(playerID)
    })

    socket.on('exit', (matchID:string) => {
        const match = new Match(matchID)
        match.disconnectPlayer(playerID)
    })

    // make it better (safer) later
    socket.on('move', (matchID:string, x:number, y:number) => {
        const match = new Match(matchID)
        match.changePlayerPosition(playerID, x, y)
    })
})

export {app, io}
