import React from 'react';
import './style.css';
import Board from './Board';

export const TurnContext = React.createContext();
export const SetTurnContext = React.createContext();

function Game(){
    const [turn, setTurn] = React.useState('X');
    
    return (
    <div>
        <h1>It's your turn player {turn}</h1>
        <TurnContext.Provider value={turn}>
            <SetTurnContext.Provider value={setTurn}>
                <Board />
            </SetTurnContext.Provider>
        </TurnContext.Provider>
    </div>
    );
}

export default Game;