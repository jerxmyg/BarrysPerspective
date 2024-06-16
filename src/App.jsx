import { useState } from 'react'
import './App.css'
import { Tweet } from 'react-tweet'

export const IndexPage = () => <Tweet id="1628832338187636740" />

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
  

    <div className="tweetbox">
      <div className="tweets"> <Tweet id="1789684389778956499" /> </div>
      <div className="tweets"> <Tweet id="1780642682445967548" /> </div>
      <div className="tweets"> <Tweet id="1780642682445967548" /> </div>
      </div>
  
    </>

  )
}

export default App
/* 
      <Tweet id="1789684389778956499" /> 
      <Tweet id="1780642682445967548" />
      <Tweet id="1777797186878689782" /> 
*/