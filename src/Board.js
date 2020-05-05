import React from 'react';
import './style.css';
import Squares from './Square';
// import Snapshot from './Snapshot';
import {TurnContext, SetTurnContext} from './Game';

function Board() {
    const [boardState, setBoardState] = React.useState((new Array(9).fill(null)));
    const [stages, setStages] = React.useState([]);
    const turn = React.useContext(TurnContext);
    const setTurn = React.useContext(SetTurnContext);
    let arr = [...boardState];
    console.log(arr);

    function declareWinner(boardState) {
        const conditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < conditions.length; i++) {
            const [first, second, third] = conditions[i];

            if (boardState[first] && boardState[second] === boardState[first] && boardState[third] === boardState[first]) {
                return boardState[first];
            }
        }
        return null;
    }

    const winner = declareWinner(boardState);

    let status;
    if (winner) {
        status = `The winner is ${winner}`;
    }


    function clickHandler(num) {
        if (!winner && !boardState[num]) {
            const stagesCopy = [...stages];
            const boardCopy = [...boardState];
            
            boardCopy[num] = turn;
            stagesCopy.push(boardCopy);
            
            setBoardState(boardCopy);
            setStages(stagesCopy);

            setTurn(() => {
                if (turn === 'X') {
                    return 'O';
                }
                return 'X';
            });
        }
    }

    function moveToStage(step) {
        const boardInHistory = [...stages];
        setBoardState(boardInHistory[step]);
    }

    function goToStart() {
        setBoardState(new Array(9).fill(null));
        setStages([]);
    }

    const differentStages = stages.map((stage) => {
        const desc = `Go to move #${stage+1}`;
        return (
            <li key={stage}>
                <button onClick={() => moveToStage(stage)}>{desc}</button>
            </li>
        );
    });


    return (
        <div className="board">
            <div className="rows">
                <Squares click={() => clickHandler(0)} value={boardState[0]} arr={arr} setBoardState={setBoardState}/>
                <Squares click={() => clickHandler(1)} value={boardState[1]}/>
                <Squares click={() => clickHandler(2)} value={boardState[2]}/>
            </div>
            <div className="rows">
                <Squares click={() => clickHandler(3)} value={boardState[3]}/>
                <Squares click={() => clickHandler(4)} value={boardState[4]}/>
                <Squares click={() => clickHandler(5)} value={boardState[5]}/>
            </div>
            <div className="rows">
                <Squares click={() => clickHandler(6)} value={boardState[6]}/>
                <Squares click={() => clickHandler(7)} value={boardState[7]}/>
                <Squares click={() => clickHandler(8)} value={boardState[8]}/>
            </div>
            <h1>{status}</h1>
            <div className="game-info">
                <ol>
                <button onClick={goToStart}>Restart</button>
                {differentStages}
                </ol>
              </div>
        </div>
    );
}

export default Board;