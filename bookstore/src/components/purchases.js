import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import "./purchases.css";

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      const response = await axios.get("http://localhost:5000/purchases");
      setPurchases(response.data);
    };

    fetchPurchases();
  }, []);

  const removePurchaseHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/purchases/${id}`);
      setPurchases((prevPurchases) =>
        prevPurchases.filter((purchase) => purchase._id !== id)
      );
    } catch (error) {
      console.error("Failed to remove purchase:", error);
    }
  };

  return (
    <div className="purchases-container">
      {purchases.map((purchase) => (
        <div key={purchase._id} className="purchase-card">
          <img src={purchase.image} alt={purchase.name} />
          <article>By {purchase.author}</article>
          <h3>{purchase.name}</h3>
          <p>{purchase.description}</p>
          <h3>Rs {purchase.price}</h3>
          <Button
            color="error"
            onClick={() => removePurchaseHandler(purchase._id)}
            sx={{ mt: "auto" }}
          >
            Remove Purchase
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Purchases;
