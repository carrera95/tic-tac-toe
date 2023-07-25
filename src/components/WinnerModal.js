import { Square } from "./Square"

export const WinnerModal = ({ winner, resetGame}) => {
  
  const winnerText = winner === false ? 'Empate' : 'Gano:'

  if (winner === null) return

  return (
    <section className='winner'>
      <div className='text'>
        <h2>{winnerText}</h2>

        <header className='win'>
          {winner && <Square>{winner}</Square>}
        </header>

        <footer>
          <button onClick={resetGame}>Begin again</button>
        </footer>
      </div>
    </section>
  )
}