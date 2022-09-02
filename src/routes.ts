import { createMatch, Match } from "./match";
import { app } from "./server";
import { IMatch } from "./@types/IMatch";
import { v4 as uuidv4 } from 'uuid';
import { Request, Router } from "express";


const routes:Router = Router()

routes.get('/cratematch', (req:Request,res) => {
    try{
        const match:IMatch = {
            id: uuidv4(),
            size: req.body.size || 30,
            players: []
        }
        createMatch(match)

        const mathc = new Match(match.id)
        console.log(mathc)
        return res.status(200).send(mathc)
    }catch(error){
        console.log(error)
        return res.status(500).send({message: 'Não foi possível cirar a partida'})
    }
})

export default routes