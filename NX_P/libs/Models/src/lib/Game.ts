import { Board } from "./Board";
import { Player } from "./Player";
import { Values } from "./Values";

export interface Game {
    id : string;
    endDate? : Date;
    playerSymbol : Map<string , Values>;
    winner? : Player;
    board : Board;
}