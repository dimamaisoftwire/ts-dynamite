import { Gamestate, BotSelection } from '../models/gamestate';

class Bot {
    dynamiteRemaining = 100;
    makeMove(gamestate: Gamestate): BotSelection {
        if(gamestate.rounds.length === 0){
            return "D";
        }
        switch(gamestate.rounds[gamestate.rounds.length-1].p2){
            case "R": {
                return "P";
            }
            case "P": {
                return "S";
            }
            case "S": {
                return "R";
            }
            case "D": {
                return "W";
            }
            case "W": {
                return "R";
            }
        }
        return 'P';
    }
}

export = new Bot();
