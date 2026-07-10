import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Rating from './Rating';
import './RestaurantCard.css';

const RestaurantCard = ({ restaurant }) => {
  const { toggleWishlist, isWishlisted } = useCart();
  const navigate = useNavigate();
  const wished = isWishlisted(restaurant.id);

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(restaurant.id);
  };

  return (
    <div
      className="restaurant-card"
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
    >
      <div className="restaurant-card-image-wrapper">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="restaurant-card-image"
          loading="lazy"
        />
        {restaurant.promoted && (
          <span className="promoted-tag">PROMOTED</span>
        )}
        <button
          className={`wishlist-btn ${wished ? 'wished' : ''}`}
          onClick={handleWishlist}
          aria-label="Add to wishlist"
        >
          {wished ? '❤' : '♡'}
        </button>
        <div className="restaurant-card-offer">
          <span>{restaurant.offer}</span>
        </div>
      </div>
      <div className="restaurant-card-body">
        <div className="restaurant-card-header">
          <h3 className="restaurant-card-name">{restaurant.name}</h3>
          <Rating rating={restaurant.rating} />
        </div>
        <p className="restaurant-card-cuisine">
          {restaurant.cuisine.join(', ')}
        </p>
        <div className="restaurant-card-footer">
          <span className="restaurant-card-info">
            🕐 {restaurant.deliveryTime} min
          </span>
          <span className="restaurant-card-info">
            📍 {restaurant.distance} km
          </span>
          <span className="restaurant-card-info">
            ₹{restaurant.priceForTwo} for two
          </span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
