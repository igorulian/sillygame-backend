import { createMatch } from "./match";
import { app } from "./server";
import { IMatch } from "./@types/IMatch";
import { v4 as uuidv4 } from 'uuid';
import { Request } from "express";


app.get('/cratematch', (req:Request,res) => {
    try{
        const match:IMatch = {
            id: uuidv4(),
            size: req.body.size || 30,
            players: []
        }
        createMatch(match)
        return res.status(200).send(match)
    }catch{
        return res.send(500).send({message: 'Não foi possível cirar a partida'})
    }
})