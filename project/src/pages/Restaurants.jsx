import { Link } from 'react-router-dom';
import './Restaurants.css';

const restaurantOptions = [
  {
    id: 1,
    title: 'Quick Bites',
    description: 'Fresh snacks and fast meals for when hunger strikes.',
    highlight: 'Ready in 15 mins',
  },
  {
    id: 2,
    title: 'Family Feast',
    description: 'Sharing platters, thalis, and meals for everyone.',
    highlight: 'Great for groups',
  },
  {
    id: 3,
    title: 'Healthy Choices',
    description: 'Light bowls, salads, and wholesome food options.',
    highlight: 'Low-calorie picks',
  },
  {
    id: 4,
    title: 'Street Food',
    description: 'Bold flavors, spicy treats, and classic local favorites.',
    highlight: 'Best sellers',
  },
];

const Restaurants = () => {
  return (
    <div className="restaurants-page">
      <section className="restaurants-hero">
        <div className="hero-body">
          <span className="hero-badge">Featured</span>
          <h1>Discover restaurants that match your mood.</h1>
          <p>
            Explore interactive restaurant options, filter by cuisine, and find the
            perfect place to dine in or order from.
          </p>
          <Link to="/search" className="hero-button">
            Browse Nearby Restaurants
          </Link>
        </div>
        <div className="hero-background">
          <span className="bubble bubble-1">Pizza</span>
          <span className="bubble bubble-2">Sushi</span>
          <span className="bubble bubble-3">Biryani</span>
          <span className="bubble bubble-4">Desserts</span>
        </div>
      </section>

      <section className="restaurants-options">
        <div className="options-header">
          <h2>Pick your restaurant vibe</h2>
          <p>Tap any category to explore matching menus and top rated kitchens.</p>
        </div>
        <div className="options-grid">
          {restaurantOptions.map((option) => (
            <article key={option.id} className="option-card">
              <div className="option-icon">{option.title.charAt(0)}</div>
              <h3>{option.title}</h3>
              <p>{option.description}</p>
              <span>{option.highlight}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="restaurants-highlight">
        <div className="highlight-card">
          <h2>Interactive menu previews</h2>
          <p>
            Hover over each option to see the best restaurants and dishes in that
            category. Everything is designed to help you order faster.
          </p>
        </div>
        <div className="highlight-card highlight-gradient">
          <h2>Curated restaurant picks</h2>
          <p>
            Our app surfaces top-rated restaurants by cuisine and delivery speed.
            Find your next favorite in one click.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Restaurants;
