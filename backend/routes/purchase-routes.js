const express = require('express');
const router = express.Router();
const Purchase = require('../model/purchase'); 


// Route to add a purchase
router.post('/purchases', async (req, res) => {
  const purchase = new Purchase({
    bookId: req.body.bookId,
    name: req.body.name,
    author: req.body.author,
    price: req.body.price,
    image: req.body.image,
  });

  try {
    const newPurchase = await purchase.save();
    res.status(201).json(newPurchase);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.get('/purchases', async (req, res) => {
    try {
      const purchases = await Purchase.find();
      res.json(purchases);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
