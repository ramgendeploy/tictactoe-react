import { useState, useEffect } from 'react'

import './Game.css'

function App() {
  const [ttt, setTTT] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [gamestart, setGameStart] = useState(false)
  const [player, setPlayer] = useState(false)
  const [lastWon, setLastWon] = useState('-')
  const [moves, setMoves] = useState(0)

  const checkWin = () => {
    const checks = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    let flag = false
    checks.forEach((pos) => {
      if (ttt[pos[0]] === ttt[pos[1]] && ttt[pos[1]] === ttt[pos[2]]) {
        if (!(ttt[pos[0]] === 0)) {
          flag = true
        }
      }
    })
    if (flag) {
      setTTT([...[0, 0, 0, 0, 0, 0, 0, 0, 0]])
      setLastWon(player === true ? 'X' : 'O')
      setGameStart(false)
      setMoves(0)
    }
    if (moves === 9) {
      setTTT([...[0, 0, 0, 0, 0, 0, 0, 0, 0]])
      setLastWon('-')
      setGameStart(false)
      setMoves(0)
    }
  }

  const pick = (index) => {
    // verify if already selected...
    setGameStart(true)
    if (ttt[index] === 0) {
      ttt[index] = player === false ? 1 : 2
      setTTT([...ttt])
      setPlayer(!player)
      setMoves(moves + 1)
    }
    // console.log(ttt)
  }

  useEffect(() => {
    if (gamestart) {
      checkWin()
    }
  })

  return (
    <div className="container">
      <div className="Game">
        {ttt.map((position, i) => {
          let text = '_'
          switch (position) {
            case 0:
              text = '_'
              break
            case 1:
              text = 'X'
              break
            case 2:
              text = 'O'
              break
          }
          return (
            <div className="blk" key={i} onClick={() => pick(i)}>
              {text}
            </div>
          )
        })}
      </div>
      <div className="hud">
        <p>Current player: {player === false ? 'X' : 'O'}</p>
        <p>Last Won: {lastWon}</p>
      </div>
    </div>
  )
}

export default App
