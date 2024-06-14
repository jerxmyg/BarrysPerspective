import { useState } from 'react'
import './App.css'
import background from "./assets/bpstockimg1.png"
function App() {

  return (
    <>
    <div className="box">
    <h1>Barry's Perspective</h1>
      <h2>Site Closed</h2>
      <div className="card">
        <label for="password" name="password">Password: </label>
        <input type="text" id="password" name="password" placeholder="Password..."></input>
      </div>
    </div>
    </>
  )
}

export default App
