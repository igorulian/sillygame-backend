import { IMatch } from "./@types/IMatch"
import { IPlayer } from "./@types/IPlayer"

export const matches:IMatch[] = []

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

    constructor(id:string){
        const match = this.getMatchFromArray(id)

        if(id && match){
            Object.assign(this, match)
        }else{
            console.log('Partida não existente')
        }
    }

    destroy(){
        Object.assign(matches, matches.filter(match => match.id !== this.id))
    }

    getPlayers(){
        const match = this.getMatchFromArray()
        return match.players
    }

    addPlayer(player:IPlayer){
        const match = this.getMatchFromArray()
        match.players.push(player)
        this.updateClass()
    }
}