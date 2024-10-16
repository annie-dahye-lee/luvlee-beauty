import React from "react";
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
  return (
  <div className='hero-container'>
    <video autoPlay loop muted>
  <source src="/videos/heart-hero.mp4" type="video/mp4" />
  <source src="/videos/heart-hero.webm" type="video/webm" />
  Your browser does not support the video tag.
</video>
    <h1>Hello, Beautiful!</h1>
    <p>Uncover your full potential</p>
    <div className="hero-btns">
      <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large'>
        Analyze Your Face
      </Button>
    </div>
  </div>
  )
}

export default HeroSection;
