import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'
import { Navbar } from './components/Navbar';
import { TweetPage } from './pages/TweetPage';
import { SiteClosed } from './pages/SiteClosed';
import { Shop } from './pages/Shop';
import { Catalog } from './pages/Catalog'
import ProductPage from './components/ProductPage'
import CartPage from './pages/CartPage';


function App() {

  return (
    <div className="App-content">
      <Navbar />
      <Routes>
        <Route path='*' element={<Shop/>} />
        <Route path="/shop/product/:productId" element={<ProductPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/tweets' element={<TweetPage/>} />
        <Route path='/catalog' element={<Catalog/>} />
      </Routes>
    </div>


  )
}

export default App


