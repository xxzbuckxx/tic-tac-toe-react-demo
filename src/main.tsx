import React from 'react'
import ReactDOM from 'react-dom/client'
import Game from './Game/Game'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="main-container">
      <Game />
      <h1 className="title">Tic Tac Toe</h1>
    </div>
  </React.StrictMode>
)