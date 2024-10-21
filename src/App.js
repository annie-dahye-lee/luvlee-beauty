import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter as Router
import './App.css';
import Home from './components/pages/Home';
import Analyze from './components/pages/Analyze/Analyze'; // Check the path is correct
import About from './components/pages/About';
import SignUp from './components/pages/SignUp';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/analyze' element={<Analyze />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
