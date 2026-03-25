import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import { useNavigate } from 'react-router-dom';
import "./App.css";

const CartItem = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to extract numerical cost from strings like "$15"
  const parseCost = (costStr) => {
    return parseFloat(costStr.replace('$', ''));
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + parseCost(item.cost) * item.quantity, 0).toFixed(2);
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
      alert("Coming Soon - Thank you for your purchase!");
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: '#2e7d32', marginBottom: '20px' }}>Your Shopping Cart</h2>
      <div>
        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <p>Your cart is empty.</p>
            <button className="continue-shopping-btn" style={{marginTop: '20px'}} onClick={handleContinueShopping}>
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            {cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">{item.cost}</div>
                  <div className="cart-item-total">Unit Total: ${(parseCost(item.cost) * item.quantity).toFixed(2)}</div>
                  <button className="cart-item-delete" onClick={() => handleRemove(item)}>Remove</button>
                </div>
                <div className="cart-item-quantity">
                  <button className="quantity-btn" onClick={() => handleDecrement(item)}>-</button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button className="quantity-btn" onClick={() => handleIncrement(item)}>+</button>
                </div>
              </div>
            ))}
            <div className="cart-summary">
              <h2 className='main_cart_amount'>Total Amount: ${calculateTotalAmount()}</h2>
              <button className="continue-shopping-btn" onClick={handleContinueShopping}>Continue Shopping</button>
              <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartItem;