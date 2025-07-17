import React from 'react';
import './Header.css';
import userIcon from '../../assets/user.png';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <span className="logo-icon">+</span>
        <span className="logo-text">JAGA SEHAT</span>
      </div>
      <nav className="nav">
        <NavLink to="/" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} end>Home</NavLink>
        <NavLink to="/chat" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Chat with Doctor</NavLink>
        <NavLink to="/bmi" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Check Weight Ideal</NavLink>
        <a href="#profile" className="nav-link">
          <img src={userIcon} alt="Profile" className="profile-icon" />
        </a>
      </nav>
    </header>
  );
};

export default Header; 