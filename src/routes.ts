import { createMatch, Match, matches } from "./match"
import { app } from "./server"
import { IMatch } from "./@types/IMatch"
import { v4 as uuidv4 } from 'uuid'
import { Router } from "express"


const routes:Router = Router()

const MAX = 30

routes.post('/match', (req,res) => {
    try{
        const {name, size, max} = req.body
        const match:IMatch = {
            max: max ? (max <= MAX ? max : 30 ) : 10,
            name: name || 'placeholder',
            id: uuidv4(),
            size: size || 30,
            players: []
        }
        createMatch(match)
        return res.status(200).send(match)
    }catch(error){
        console.log(error)
        return res.status(400).send({message: 'Não foi possível cirar a partida'})
    }
})

routes.get('/match/:id', (req, res) => {
    try{
        const match = new Match(req.params.id)

        if(!match.id)
            return res.status(400).send({message: 'Não foi buscar a partida'})

        return res.status(200).send(match)
    }catch(error){
        console.log(error)
        return res.status(400).send({message: 'Não foi buscar a partida'})
    }
})

routes.get('/matches', (req, res) => {
    try{
        return res.status(200).send(matches)
    }catch(error){
        console.log(error)
        return res.status(400).send({message: 'Não foi listar as partidas'})
    }
})

export default routes