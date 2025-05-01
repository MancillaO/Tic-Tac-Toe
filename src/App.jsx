import React, { useState } from 'react'
import { WinnerModal } from './components/WinnerModal.jsx'
import { Board } from './components/Board.jsx'
import { Turns } from './components/Turns.jsx'
import { checkWinner, checkEndGame } from './logic/board.js'
import { TURNS } from './constants.js'
import confetti from 'canvas-confetti'
import './App.css'

export default function App () {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
    setTurn(turn === TURNS.X ? TURNS.O : TURNS.X)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reiniciar juego</button>
      <Board board={board} updateBoard={updateBoard} />
      <Turns turn={turn} />
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}
