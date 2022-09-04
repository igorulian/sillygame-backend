import { IMatch } from "./@types/IMatch"
import { IPlayer } from "./@types/IPlayer"
import { getRandomPlayerPosition } from "./util/random"

export let matches:IMatch[] = []

export function createMatch(match:IMatch){
    matches.push(match)
}

export class Match {
    id: string
    players: IPlayer[]
    size: number

    private getMatchFromArray(id:string = this.id){
        const matchesWithId:IMatch[] = matches.filter(match => match.id === id)
        const existMatch = matchesWithId.length === 1
        return existMatch ? matchesWithId[0] : null
    }
    
    private updateClass(){
        const match = this.getMatchFromArray()
        Object.assign(this, match)
    }
    
    private addPlayer(player:IPlayer){
        const match = this.getMatchFromArray()

        if(!match) 
            return console.log('[Match - addPlayer] - Match não existe')

        const playerAlreadyConnected = match.players.filter(p => p.id === player.id).length > 0
        
        if(playerAlreadyConnected) 
            return console.log('[Match - addPlayer] - Jogador já conectado')

        match.players.push(player)
        this.updateClass()
    }

    constructor(id:string){
        const match = this.getMatchFromArray(id)

        if(id && match){
            Object.assign(this, match)
        }else{
            console.log('[Match - constructor] Partida não existente')
        }
    }

    destroy(){
        matches = matches.filter(match => match.id !== this.id)
    }

    getPlayers(){
        const match = this.getMatchFromArray()
        if(!match) 
            return console.log('[Match - getPlayers] - Match não existe')

        return match.players
    }


    connectPlayer(playerID: string){
        const player:IPlayer = { 
            id: playerID,
            x: getRandomPlayerPosition(),
            y: getRandomPlayerPosition()
        }
        this.addPlayer(player)
        this.updateClass()
    }

    disconnectPlayer(playerID: string){
        const match = this.getMatchFromArray()
        if(!match) return
        const players = match.players.filter(player => player.id !== playerID)
        match.players = players
        this.updateClass()
    }

    changePlayerPosition(playerID:string, x:number, y:number){
        const match = this.getMatchFromArray()
        if(!match) return
        const playersWithID = match.players.filter(player => player.id === playerID)

        if(playersWithID.length > 0){
            if(playersWithID.length !== 1)
                console.log('WARN [Match - changePlayerPosition] - Mais de um jogador encontrado na partida')

            const player = playersWithID[0]
            const playerIndex = match.players.indexOf(player)
            player.x = x
            player.y = y
            
            match.players[playerIndex] = player
        }else{
            return console.log('[Match - changePlayerPosition] - Jogador não encontrado')
        }
        this.updateClass()
    }
}