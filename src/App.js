// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CameraCapture from './components/CameraCapture';
import WelcomePage from './components/WelcomePage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/camera" element={<CameraCapture />} />
      </Routes>
    </Router>
  );
}

export default App;