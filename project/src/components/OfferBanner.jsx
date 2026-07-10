import { useState, useEffect } from 'react';
import './OfferBanner.css';

const banners = [
  {
    id: 1,
    title: 'Flat 60% OFF',
    subtitle: 'On orders above ₹199',
    code: 'SAVE60',
    bg: 'linear-gradient(135deg, #E23744, #ff6b6b)',
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 2,
    title: 'Free Delivery',
    subtitle: 'On your first 3 orders',
    code: 'FREEDEL',
    bg: 'linear-gradient(135deg, #1a8a5a, #20c997)',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 3,
    title: 'Buy 1 Get 1',
    subtitle: 'On selected restaurants',
    code: 'B1G1',
    bg: 'linear-gradient(135deg, #f59e0b, #ff922b)',
    image: 'https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 4,
    title: 'Flat 50% OFF',
    subtitle: 'Use code ZOMATO50',
    code: 'ZOMATO50',
    bg: 'linear-gradient(135deg, #4263eb, #4dabf7)',
    image: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const OfferBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrent(index);
  };

  return (
    <div className="offer-banner-section">
      <h2 className="section-title">Top Offers</h2>
      <div className="offer-banner-carousel">
        <div
          className="offer-banner-track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {banners.map((banner) => (
            <div className="offer-banner-slide" key={banner.id} style={{ background: banner.bg }}>
              <div className="offer-banner-content">
                <h3 className="offer-banner-title">{banner.title}</h3>
                <p className="offer-banner-subtitle">{banner.subtitle}</p>
                <div className="offer-banner-code">
                  <span>Code:</span>
                  <strong>{banner.code}</strong>
                </div>
              </div>
              <div className="offer-banner-image">
                <img src={banner.image} alt={banner.title} loading="lazy" />
              </div>
            </div>
          ))}
        </div>
        <div className="offer-banner-dots">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`offer-banner-dot ${index === current ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfferBanner;
