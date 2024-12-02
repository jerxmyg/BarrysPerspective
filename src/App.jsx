import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'
import { Navbar } from './components/Navbar';
import { TweetPage } from './pages/TweetPage';
import { SiteClosed } from './pages/SiteClosed';
import { Shop } from './pages/Shop';
import CartPage from './pages/CartPage';


function App() {

  return (
    <div className="Navbar">
      <Navbar />
      <Routes>
        <Route path='*' element={<Shop/>} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/tweets' element={<TweetPage/>} />
      </Routes>
    </div>


  )
}

export default App


