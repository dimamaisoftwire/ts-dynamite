import { Gamestate, BotSelection } from '../models/gamestate';

class Bot {
    dynamiteRemaining = 100;
    makeMove(gamestate: Gamestate): BotSelection {
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
        function checkDrawDynamiteOpponent(){
            if(gamestate.rounds.length <= 1) return true;
            // Finding last draw
            for(let i=gamestate.rounds.length-2;i>=0;i--){
                if(gamestate.rounds[i].p2 == gamestate.rounds[i].p1){
                    console.log(gamestate.rounds[i+1].p2 === "D");
                    return (gamestate.rounds[i+1].p2 === "D"); // check that the opponents move after draw was dynamite
                }
            }
            return false;
        }

        const baseMoves: BotSelection[] = ['R', 'P' ,'S'];
        let selection = baseMoves[Math.floor(Math.random() * baseMoves.length)];
        if(checkLastDraw()&&this.dynamiteRemaining>0){
            selection = "D";
        }
        if(checkLastMoves(3,"D")){
            selection = "W";
        }
        if(selection == "D"){
            this.dynamiteRemaining--;
        }
        return selection;
    }
}

export = new Bot();