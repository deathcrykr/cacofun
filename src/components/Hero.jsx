import { useRef, useEffect } from 'react';
import './Hero.css';
import heroBg from '../assets/hero_bg.png';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-bg-container">
        <img src={heroBg} alt="Hero Background" className="hero-bg" />
        <div className="hero-overlay"></div>
      </div>
      
      <div className="container hero-content">
        <h1 className="hero-title">
          Bringing the <span className="highlight">World</span><br /> 
          Together Through <span className="highlight-alt">Fun</span>
        </h1>
        <p className="hero-subtitle">
          We craft immersive worlds and lovable characters that stay with you forever.
        </p>
        <div className="hero-cta">
          <a href="#games" className="btn btn-primary btn-lg">Explore Games</a>
          <a href="#careers" className="btn btn-secondary btn-lg">Join the Team</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
