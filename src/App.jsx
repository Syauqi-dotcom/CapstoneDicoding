import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import BMICalculator from './pages/BMICalculator/BMICalculator';
import Home from './pages/Home/Home';
import Chat from './pages/Chat/Chat';
import Profile from './pages/Profile/Profile';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/bmi" element={<BMICalculator />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
