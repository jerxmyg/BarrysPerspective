import React, { useEffect, useState } from "react";
import { useCart } from "../components/CartContext";
import { useParams, useNavigate } from "react-router-dom";
import fetchProducts from "../components/shopifyService"; // Ensure the service path is correct
import "./ProductPage.css";

const ProductPage = ({ products }) => {
  const { productId } = useParams(); // Extract productId from the URL
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const findProduct = (fetchedProducts) => {
      // Handle Shopify product ID format: extract numeric ID
      return fetchedProducts.find((p) => p.id.split("/").pop() === productId);
    };

    if (!products || products.length === 0) {
      // Fetch products if not already available
      const fetchProductData = async () => {
        try {
          const fetchedProducts = await fetchProducts();
          const foundProduct = findProduct(fetchedProducts);
          setProduct(foundProduct);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProductData();
    } else {
      // Use the existing products array
      const foundProduct = findProduct(products);
      setProduct(foundProduct);
      setLoading(false);
    }
  }, [productId, products]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <p>Product not found!</p>;
  }
  
  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity: 1 },
    });
  };
  const formatCurrency = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="product-page">
      <div className="product-page_left">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-page_right">
        <h1>{product.title}</h1>
        <p> {product.currency} {formatCurrency(product.price)}</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </div>
  );
};

export default ProductPage;
