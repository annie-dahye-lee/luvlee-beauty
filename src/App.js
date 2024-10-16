import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter as Router
import './App.css';
import HeroSection from './components/HeroSection';
import Home from './components/pages/Home';

function App() {
  return (
    <Router> {/* Wrap your entire app inside Router */}
      <Navbar />
      <Routes>
        {/* Use element instead of component */}
        <Route path='/' element={<Home />} />
      </Routes>

      {/* You can place the HeroSection here to display on every route */}
    
    </Router>
  );
}

export default App;
