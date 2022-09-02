import { IMatch } from "./@types/IMatch"
import { createMatch, Match, matches } from "./match"
import { v4 as uuidv4 } from 'uuid'

const matchExample:IMatch = {
    id: uuidv4(),
    size: 30,
    players: []
}

const playerID = 'ADUBADBADADA'

export function test(){
    console.log('= Efeutando teste = ')
    console.log('Criando partida..')
    createMatch(matchExample)
    const match = new Match(matchExample.id)
    console.log('1',matches[0])
    match.connectPlayer(playerID)
    console.log('2',matches[0])
    match.changePlayerPosition(playerID, 10, 10)
    console.log('3',matches[0])
    match.disconnectPlayer(playerID)
    console.log('4',matches[0])
}