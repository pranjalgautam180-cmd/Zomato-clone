import { useCart } from '../context/CartContext';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-item">
      <div className="cart-item-image-wrapper">
        <img src={item.image} alt={item.name} className="cart-item-image" loading="lazy" />
        <span className={`veg-indicator ${item.veg ? 'veg' : 'non-veg'}`}>
          <span className="veg-dot"></span>
        </span>
      </div>
      <div className="cart-item-info">
        <h4 className="cart-item-name">{item.name}</h4>
        <p className="cart-item-restaurant">{item.restaurantName}</p>
        <div className="cart-item-price-row">
          <span className="cart-item-price">₹{item.price}</span>
          <div className="cart-item-quantity">
            <button
              onClick={() => decreaseQuantity(item.id, item.restaurantId)}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => increaseQuantity(item.id, item.restaurantId)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="cart-item-actions">
        <span className="cart-item-total">₹{item.price * item.quantity}</span>
        <button
          className="cart-item-remove"
          onClick={() => removeFromCart(item.id, item.restaurantId)}
          aria-label="Remove item"
        >
          🗑
        </button>
      </div>
    </div>
  );
};

export default CartItem;
