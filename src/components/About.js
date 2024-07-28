import React from 'react';
import './Home.css';
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <div className="content">
        <h1>Discover Your Next Read</h1>
        <p>Find the best books from a wide range of genres</p>
        <NavLink to="/books" className="cta-btn">
          Books
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
