import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import './Cart.css';

const Cart = () => {
  const { cartItems, cartTotal, clearCart, placeOrder, user } = useCart();
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const deliveryFee = cartTotal > 0 ? (cartTotal > 500 ? 0 : 40) : 0;
  const taxes = Math.round(cartTotal * 0.05);
  const total = cartTotal + deliveryFee + taxes;

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setShowCheckout(true);
  };

  const handlePlaceOrder = () => {
    placeOrder({
      items: cartItems,
      total: total,
      restaurantName: cartItems[0]?.restaurantName || 'Multiple Restaurants',
    });
    setOrderPlaced(true);
    setShowCheckout(false);
  };

  if (orderPlaced) {
    return (
      <div className="cart-page">
        <div className="cart-success">
          <div className="cart-success-icon">✓</div>
          <h2>Order Placed Successfully!</h2>
          <p>Your food is being prepared. Track your order in the Orders page.</p>
          <div className="cart-success-actions">
            <Link to="/orders" className="cart-success-btn">View Orders</Link>
            <Link to="/" className="cart-success-btn-secondary">Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/" className="cart-empty-btn">Browse Restaurants</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-items-section">
          <div className="cart-header">
            <h1 className="cart-title">Your Cart</h1>
            <button className="cart-clear-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <CartItem key={`${item.id}-${item.restaurantId}`} item={item} />
            ))}
          </div>
        </div>

        <div className="cart-summary-section">
          <h2 className="cart-summary-title">Price Summary</h2>
          <div className="cart-summary-row">
            <span>Item Total</span>
            <span>₹{cartTotal}</span>
          </div>
          <div className="cart-summary-row">
            <span>Delivery Fee</span>
            <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
          </div>
          <div className="cart-summary-row">
            <span>Taxes & Charges (5%)</span>
            <span>₹{taxes}</span>
          </div>
          {deliveryFee === 0 && cartTotal > 0 && (
            <div className="cart-summary-discount">
              <span>🎉 Free delivery on orders above ₹500!</span>
            </div>
          )}
          <div className="cart-summary-divider"></div>
          <div className="cart-summary-total">
            <span>To Pay</span>
            <span>₹{total}</span>
          </div>
          <button className="cart-checkout-btn" onClick={handleCheckout}>
            {user ? 'Proceed to Checkout' : 'Login to Checkout'}
          </button>
          {!user && (
            <p className="cart-login-note">
              You need to be logged in to place an order.
            </p>
          )}
        </div>
      </div>

      {showCheckout && (
        <div className="cart-checkout-modal-overlay" onClick={() => setShowCheckout(false)}>
          <div className="cart-checkout-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Confirm Your Order</h2>
            <div className="checkout-summary">
              <div className="checkout-row">
                <span>Items</span>
                <span>{cartItems.length}</span>
              </div>
              <div className="checkout-row">
                <span>Total Amount</span>
                <span>₹{total}</span>
              </div>
              <div className="checkout-row">
                <span>Delivery Address</span>
                <span>{user?.address || 'Default Address'}</span>
              </div>
            </div>
            <div className="checkout-actions">
              <button className="checkout-cancel" onClick={() => setShowCheckout(false)}>
                Cancel
              </button>
              <button className="checkout-confirm" onClick={handlePlaceOrder}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
