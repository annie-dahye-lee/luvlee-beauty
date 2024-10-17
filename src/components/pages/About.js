import React from 'react';
import '../../App.css';
import './About.css';

export default function About() {
    return (
        <div className='about-container'>
            <h1 className='about-title'>✨ Discover Your Unique Beauty ✨</h1>
            
            <p className='about-description'>
                Welcome to our enchanting app that analyzes your skin’s undertones using advanced technology!
            </p>
            
            <h2 className='about-subtitle'>Key Features:</h2>
            
            <div className='about-features'>
                <div className='about-feature'>
                    <span className='feature-icon'>🌸</span>
                    <div className='feature-text'>
                        <strong>Undertone Analysis:</strong> Identify if your undertones are warm, cool, or neutral.
                    </div>
                </div>
                <div className='about-feature'>
                    <span className='feature-icon'>🎨</span>
                    <div className='feature-text'>
                        <strong>Personal Color Palette:</strong> Get a tailored palette that enhances your natural beauty.
                    </div>
                </div>
                <div className='about-feature'>
                    <span className='feature-icon'>💄</span>
                    <div className='feature-text'>
                        <strong>Makeup Recommendations:</strong> Discover Asian-colored products perfect for your skin tone.
                    </div>
                </div>
                <div className='about-feature'>
                    <span className='feature-icon'>🎨</span>
                    <div className='feature-text'>
                        <strong>Hair Color Suggestions:</strong> Find the ideal shades that complement your undertones.
                    </div>
                </div>
                <div className='about-feature'>
                    <span className='feature-icon'>📱</span>
                    <div className='feature-text'>
                        <strong>User-Friendly Interface:</strong> Easily upload images and explore personalized insights.
                    </div>
                </div>
            </div>
            
            <p className='about-description'>
                Join us in redefining beauty and embrace your style with confidence!
            </p>
        </div>
    );
}
