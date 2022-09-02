import { IPlayer } from "./@types/IPlayer"
import { Match, matches } from "./match"
import { getRandomPlayerPosition } from "./util/random"

interface IData {
    id: string
}

export function exitMatch(playerID:string){
    const matchesWithPlayer = matches.filter(match =>
        match.players.filter(player => player.id === playerID).length > 0
    )
    // const match = new Match()
}