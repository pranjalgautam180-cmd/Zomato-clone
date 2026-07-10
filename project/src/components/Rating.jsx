import './Rating.css';

const Rating = ({ rating, size = 'small' }) => {
  const ratingClass = rating >= 4.0 ? 'rating-good' : rating >= 3.0 ? 'rating-ok' : 'rating-low';

  return (
    <span className={`rating-badge ${ratingClass} rating-${size}`}>
      <span className="rating-star">★</span>
      {rating}
    </span>
  );
};

export default Rating;
