import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source
          src="https://b.zmtcdn.com/data/file_assets/2627bbed9d6c068e50d2aadcca11ddbb1743095925.mp4"
          type="video/mp4"
        />
      </video>

      <div className="hero-overlay" />

      <div className="hero-content">
        <p className="hero-eyebrow">Fresh & Fast</p>
        <h1>Order food from your favorite restaurants</h1>
        <p>
          Discover delicious meals near you and get them delivered right to your door.
        </p>
      </div>
    </section>
  );
};

export default Hero;
