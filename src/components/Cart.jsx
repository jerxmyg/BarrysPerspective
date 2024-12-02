import React from "react";
import { useCart } from "./CartContext";
import { createCheckout } from "./shopifyService";

const Cart = () => {
  const { cart, dispatch } = useCart();

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
  };

  const handleCheckout = async () => {
    try {
      const checkoutUrl = await createCheckout(cart);
      window.location.href = checkoutUrl; // Redirect to Shopify checkout
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  if (cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <img src={item.image} alt={item.title} width={50} />
            <h3>{item.title}</h3>
            <p>
              {item.quantity} x {item.currency} {item.price}
            </p>
            <button onClick={() => handleRemove(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default Cart;
