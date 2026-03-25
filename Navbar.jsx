import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./App.css";

function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav>
      <div className="nav-logo">
        <Link to="/" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <div style={{ marginRight: '10px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-leaf">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
            </svg>
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Paradise Nursery</h3>
            <p style={{ fontSize: '0.8rem', opacity: '0.8', fontStyle: 'italic', marginTop: '-5px' }}>Where Greenery Meets Serenity</p>
          </div>
        </Link>
      </div>

      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <Link to="/products">Plants</Link>
        <Link to="/cart" className="cart-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart">
            <circle cx="8" cy="21" r="1"/>
            <circle cx="19" cy="21" r="1"/>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
          </svg>
          {totalQuantity > 0 && <span className="cart-count">{totalQuantity}</span>}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;