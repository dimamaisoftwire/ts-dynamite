import { Gamestate, BotSelection } from '../models/gamestate';

class Bot {
    dynamiteRemaining = 100;
    oppDynamiteCount = 0;
    opponentDrawResponses = [];
    checkDynamiteDrawResponse() : boolean {
        let setOfResponses = new Set(this.opponentDrawResponses);
        if(setOfResponses.size==1 && this.opponentDrawResponses.length>1){
            if(setOfResponses[0] == "D"){
                return true;
            }
        }
        return false;
    }
    makeMove(gamestate: Gamestate): BotSelection {
        // Keeping track of opponents dynamite
        if (gamestate.rounds.length > 0 && gamestate.rounds[gamestate.rounds.length - 1].p2 === 'D'){
            this.oppDynamiteCount ++;
        }
        // Check if opponent kept doing dynamite last N moves
        function checkLastMoves(n:number, move:BotSelection){
            if(gamestate.rounds.length < n) return false;
            let last = gamestate.rounds[gamestate.rounds.length-1].p2;
            for(let i = gamestate.rounds.length-1; i > gamestate.rounds.length-n; i--){
                if(gamestate.rounds[i].p2 !== last || last !== "D"){
                    return false;
                }
            }
            return true;
        }
        function checkLastDraw(){ // Check if last game was draw
            if(gamestate.rounds.length===0) return true;
            const lastMove = gamestate.rounds.length-1;
            return (gamestate.rounds[lastMove].p1 === gamestate.rounds[lastMove].p2);
        }
        // Keeping track of opponents draw responses
        if(gamestate.rounds.length > 1){
            if(gamestate.rounds[gamestate.rounds.length-2].p1 == gamestate.rounds[gamestate.rounds.length-2].p2){
                this.opponentDrawResponses.push(gamestate.rounds[gamestate.rounds.length-1]);
            }
        }

        const baseMoves: BotSelection[] = ['R', 'P' ,'S'];
        let selection = baseMoves[Math.floor(Math.random() * baseMoves.length)];

        if(checkLastDraw()&&this.dynamiteRemaining>0){
            selection = "D";
        }
        if(checkLastMoves(3,"D") || this.checkDynamiteDrawResponse()){
            selection = "W";
        }
        if(selection == "D"){
            this.dynamiteRemaining--;
        }
        return selection;
    }
}

export = new Bot();