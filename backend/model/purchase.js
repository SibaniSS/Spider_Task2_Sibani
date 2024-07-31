const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  name: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  purchaseDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Purchase', purchaseSchema);
