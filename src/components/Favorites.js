import React, { useState, useEffect } from "react";
import axios from "axios";
import Book from "./Book/Books"; // Assuming Book.js is in the same directory
import './Favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("http://localhost:5000/favorites");
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorites", error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="favorites-container">
      {favorites.map((book) => (
        <Book key={book._id} book={book} />
      ))}
    </div>
  );
};

export default Favorites;
