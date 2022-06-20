import Square from './Square'
import Board from './Board'
import { useState } from 'react'
import './Game.css'

export default function Game() {

  const [history, setHistory] = useState([{squares: Array(9).fill('')}])
  const [xIsNext, setXIsNext] = useState(true)
  const [stepNumber, setStepNumber] = useState(0)

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  
  function handleClick(i: number) {
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O'
    setHistory(history.concat([{squares: squares}]))
    setStepNumber(history.length)
    setXIsNext(!xIsNext)
  }

  function jumpTo(step: number) {
    console.log("Jumping to move", step)
    setHistory(history.slice(0, step + 1))
    setStepNumber(step)
    setXIsNext((step % 2) === 0)
  }

  // Inefficent? redifining component on every render
  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start'
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
  })

  let status;
  if (winner) {
    status = 'Winner: ' + winner
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O')
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board 
          squares={current.squares} 
          onClick={(i: number) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <h2>{status}</h2>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function calculateWinner(squares: Array<string>) {

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
