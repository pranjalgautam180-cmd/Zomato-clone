import { Link } from 'react-router-dom';
import './Offers.css';

const offerList = [
  {
    id: 1,
    title: 'Flat 40% Off',
    description: 'Get 40% off on selected restaurant orders placed before 3 PM.',
    tag: 'Midday Meal',
    badge: 'Limited Time',
  },
  {
    id: 2,
    title: 'Free Delivery',
    description: 'No delivery charge on all orders above ₹499 from premium partners.',
    tag: 'Save More',
    badge: 'All Day',
  },
  {
    id: 3,
    title: 'New User Bonus',
    description: 'Create an account and unlock ₹200 off on your first order.',
    tag: 'Welcome Offer',
    badge: 'Exclusive',
  },
  {
    id: 4,
    title: 'Weekend Feast',
    description: 'Order Saturday or Sunday to enjoy free desserts from top restaurants.',
    tag: 'Weekend Special',
    badge: 'Sweet Deal',
  },
];

const Offers = () => {
  return (
    <div className="offers-page">
      <section className="offers-hero">
        <div className="offers-hero-copy">
          <span className="offer-label">Hot Offers</span>
          <h1>Save more with jaw-dropping restaurant deals.</h1>
          <p>Grab the best offers curated daily for your next meal. Limited time deals and premium perks await.</p>
          <Link to="/signup" className="offers-cta">Unlock Your First Offer</Link>
        </div>
        <div className="offers-hero-cards">
          {offerList.slice(0, 2).map((offer) => (
            <div key={offer.id} className="offers-hero-card">
              <span className="offer-badge">{offer.badge}</span>
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="offers-grid-section">
        <h2>Exclusive deals for every meal</h2>
        <div className="offers-grid">
          {offerList.map((offer) => (
            <article key={offer.id} className="offer-card">
              <span className="offer-tag">{offer.tag}</span>
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
              <Link to="/login" className="offer-link">Use Offer</Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Offers;
