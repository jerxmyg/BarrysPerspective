import React, { useEffect, useState } from 'react';
import fetchProducts from '../components/shopifyService';
import './Shop.css'


export const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="product-list">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.price} {product.currency}</p>
          </div>
        ))
      ) : (
        <div>No products available</div>
      )}
    </div>
  );
};

export default Shop;










/*export const Shop = () => {
    return (
        <div>
            <h1> Capsule #??? </h1>
            <div className="product-listing">
                <img className="product-img" src={IMAGE} alt='default'/>
                <h2> Item #1 </h2>
                <h3> $50.00 </h3>
            </div>

            <div className="product-listing">
                <img className="product-img" src={IMAGE} alt='default'/>
                <h2> Item #2 </h2>
                <h3> $50.00 </h3>
            </div>

            <div className="product-listing">
                <img className="product-img" src={IMAGE} alt='default'/>
                <h2> Item #3 </h2>
                <h3> $50.00 </h3>
            </div>

            <div className="product-listing">
                <img className="product-img" src={IMAGE} alt='default'/>
                <h2> Item #4 </h2>
                <h3> $50.00 </h3>
            </div>

            <div className="product-listing">
                <img className="product-img" src={IMAGE} alt='default'/>
                <h2> Item #5 </h2>
                <h3> $50.00 </h3>
            </div>

            <div className="product-listing">
                <img className="product-img" src={IMAGE} alt='default'/>
                <h2> Item #6 </h2>
                <h3> $50.00 </h3>
            </div>
        </div>

    )
} */