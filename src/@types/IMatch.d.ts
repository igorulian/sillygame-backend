import { IPlayer } from "./IPlayer";

export interface IMatch {
    id: string,
    size: number,
    players: IPlayer[],
}