import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import fetchProducts from '../components/shopifyService';
import ProductPage from '../components/ProductPage'; // Update the path if necessary
import './Shop.css';
import './audio.css';



export const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to navigate programmatically

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
      navigate(`/shop/product/${id.split("/").pop()}`);
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Routes>
        {/* Route for displaying the product list */}
        <Route
          path="*"
          element={
            <div className="product-list">
              {products.length > 0 ? (
                products.map((product) => (
                  <div
                    key={product.id}
                    className="product-card"
                    onClick={() => handleViewProduct(product.id)}
                  >
                    <img src={product.image} alt={product.title} />
                    <h2>{product.title}</h2>
                    <p>
                      {product.price} {product.currency}
                    </p>
                  </div>
                ))
              ) : (
                <div>No products available</div>
              )}
              <div className="audio-container">
                <audio controls autoPlay loop>
                  <source src="./audio/music.mp3" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          }
        />

        {/* Route for displaying a specific product */}
        <Route path="/shop/product/:productId" element={<ProductPage products={products} />} />
        
      </Routes>
    </div>
  );
};

export default Shop;