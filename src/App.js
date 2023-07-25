import { useState } from 'react'
import './App.css'

import { Square } from './components/Square'
import { WinnerModal } from './components/WinnerModal'

import confetti, { reset } from 'canvas-confetti'
import { turns, winnerCombos } from './constants'

const checkWinner = (boardToCheck) => {
  for (const combo of winnerCombos ){
    const [a,b,c] = combo

    if(boardToCheck[a] && 
       boardToCheck[a] === boardToCheck[b] && 
       boardToCheck[a] === boardToCheck[c]){
      return boardToCheck[a]
    }
  }
  return null
}

function App() {
  
  const [ board, setBoard ] = useState( ()=> {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
    

  const [turn, setTurn] = useState( ()=> {  
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? turns.x
  })

  //null no winner
  //false draw
  const [winner, setWinner] = useState(null)

  const checkEndGame = (newBoard) => {
    return newBoard.every((square)=>square !== null)
  }

  const updateBoard = (index) => {
    //check if there is something
    if(board[index] || winner) return
    //update board
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    //change turn
    const newTurn = turn === turns.x ? turns.o : turns.x
    setTurn(newTurn)
    //save turn and board
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    //check if there's a winner
    const newWinner = checkWinner(newBoard)

    if(newWinner){
      setWinner(newWinner)
      confetti()
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(turns.x)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Game Reset</button>
      <section className='game'>
        {
          board.map((_,index) => {
            return (
              <Square 
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turns.x === turn}>
          {turns.x}
        </Square>
        <Square isSelected={turns.o === turn}>
          {turns.o}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App;
