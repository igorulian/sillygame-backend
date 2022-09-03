import { IPlayer } from "./IPlayer";

export interface IMatch {
    id: string,
    name: string,
    size: number,
    max: number,
    players: IPlayer[],
}