import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import fetchProducts from '../components/shopifyService';
import ProductPage from '../components/ProductPage'; // Update the path if necessary
import './Shop.css';
import './audio.css';
import threedlogo from '../assets/3dlogo.gif';

export const Shop = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to navigate programmatically
  const location = useLocation(); // Hook to get the current route

  const formatCurrency = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleViewProduct = (id) => {
    if (products.length > 0) {
      navigate(`/shop/product/${id.split('/').pop()}`);
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : products.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < products.length - 1 ? prevIndex + 1 : 0
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Check if the current route is the unique product page
  const isProductPage = location.pathname.startsWith('/shop/product/');

  return (
    <div>
      {!isProductPage && (
      <div className="gif-container">
        <img src={threedlogo} alt="GIF" />
      </div>
      )}
      {!isProductPage && (
        <div className="carousel">
          <button className="carousel-button prev" onClick={handlePrev}>
            &#8592;
          </button>
          {products.length > 0 && (
            <div
              className="carousel-item"
              onClick={() => handleViewProduct(products[currentIndex].id)}
            >
              <img src={products[currentIndex].image} alt={products[currentIndex].title} />
              <h2>{products[currentIndex].title}</h2>
              <p>{formatCurrency(products[currentIndex].price)}</p>
            </div>
          )}
          <button className="carousel-button next" onClick={handleNext}>
            &#8594;
          </button>
        </div>
      )}
      <Routes>
        <Route
          path="/shop/product/:productId"
          element={<ProductPage products={products} />}
        />
      </Routes>
      <div className="audio-container">
                <audio controls autoPlay loop>
                    <source src="./audio/music.mp3" type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
    </div>
  );
};

export default Shop;
