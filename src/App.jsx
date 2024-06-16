import { useState } from 'react'
import { Tweet } from 'react-tweet'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'
import TweetPage from "./pages/TweetPage"
import SiteClosed from "./pages/SiteClosed"




function App() {

  return (
    <Router>
      <div>
      <Link to="/">
          <button>Home</button>
        </Link>

      <Link to="/tweetpage">
          <button>Go to TweetPage</button>
       </Link>

        <Routes>
        <Route path="/" element={<SiteClosed />} />
        <Route path="/tweetpage" element={<TweetPage />} />
        </Routes>
      </div>
    </Router>


  )
}

export default App
