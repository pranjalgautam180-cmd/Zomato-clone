import { useCart } from '../context/CartContext';
import './FoodItem.css';

const FoodItem = ({ item, restaurant }) => {
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();

  const cartItem = cartItems.find(
    (i) => i.id === item.id && i.restaurantId === restaurant.id
  );
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="food-item">
      <div className="food-item-info">
        <div className="food-item-header">
          <span className={`veg-indicator ${item.veg ? 'veg' : 'non-veg'}`}>
            <span className="veg-dot"></span>
          </span>
          <h4 className="food-item-name">{item.name}</h4>
        </div>
        <div className="food-item-meta">
          <span className="food-item-price">₹{item.price}</span>
          <span className="food-item-rating">
            <span className="rating-star">★</span>
            {item.rating}
          </span>
        </div>
        <p className="food-item-description">{item.description}</p>
      </div>
      <div className="food-item-right">
        <div className="food-item-image-wrapper">
          <img src={item.image} alt={item.name} className="food-item-image" loading="lazy" />
        </div>
        {quantity === 0 ? (
          <button
            className="food-item-add-btn"
            onClick={() => addToCart(item, restaurant)}
          >
            ADD
          </button>
        ) : (
          <div className="food-item-quantity">
            <button
              onClick={() => decreaseQuantity(item.id, restaurant.id)}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => addToCart(item, restaurant)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodItem;
