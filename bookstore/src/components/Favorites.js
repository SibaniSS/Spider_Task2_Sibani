import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Favorites.css";
import { Button } from "@mui/material";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const response = await axios.get("http://localhost:5000/favorites");
      setFavorites(response.data);
    };

    fetchFavorites();
  }, []);

  const removeFavoriteHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/favorites/${id}`);
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav._id !== id)
      );
    } catch (error) {
      console.error("Failed to remove favorite:", error);
    }
  };

  return (
    <div className="favorites-container">
      {favorites.map((favorite) => (
        <div key={favorite._id} className="favorite-card">
          <img src={favorite.image} alt={favorite.name} />
          <article>By {favorite.author}</article>
          <h3>{favorite.name}</h3>
          <p>{favorite.description}</p>
          <h3>Rs {favorite.price}</h3>
          <Button
            color="error"
            onClick={() => removeFavoriteHandler(favorite._id)}
            sx={{ mt: "auto" }}
          >
            Remove from Favorites
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Favorites;




















