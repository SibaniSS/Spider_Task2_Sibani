const express = require("express");
const Favorite = require("../model/favorites");
const router = express.Router();

// Add a book to favorites
router.post("/", async (req, res) => {
  const { bookId, name, author, description, price, image } = req.body;

  try {
    // Check if the book is already in favorites
    const existingFavorite = await Favorite.findOne({ bookId });

    if (existingFavorite) {
      return res.status(400).json({ message: "Book already in favorites" });
    }

    const favorite = new Favorite({
      bookId,
      name,
      author,
      description,
      price,
      image,
    });

    await favorite.save();
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: "Failed to add favorite", error });
  }
});

// Get all favorite books
router.get("/", async (req, res) => {
  try {
    const favorites = await Favorite.find();
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve favorites", error });
  }
});

// Delete a favorite book
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFavorite = await Favorite.findByIdAndDelete(id);

    if (!deletedFavorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    res.status(200).json({ message: "Favorite deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete favorite", error });
  }
});

module.exports = router;
