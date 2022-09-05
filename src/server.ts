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
    // test()
}
)

interface IMatchID {
    matchID: string
}

interface IMove {
    matchID: string,
    x: number,
    y: number
}

io.on('connection', (socket) => {
    const playerID = socket.id
    console.log('connected', playerID)


    socket.on('join', ({matchID}:IMatchID, callback) => {
        const match = new Match(matchID)
        match.connectPlayer(playerID)
        callback({match})
        socket.broadcast.emit(`update-${matchID}`, {match})
        console.log('player', playerID, 'conectou na partida', matchID)
    })

    socket.on('exit', ({matchID}:IMatchID) => {
        const match = new Match(matchID)
        match.disconnectPlayer(playerID)
        socket.broadcast.emit(`update-${matchID}`, {match})
    })

    // make it better (safer) later
    socket.on('move', ({matchID, x, y}:IMove, callback) => {
        const match = new Match(matchID)
        match.changePlayerPosition(playerID, x, y)
        callback({match})
        socket.broadcast.emit(`update-${matchID}`, {match})
    })
})

export {app, io}
