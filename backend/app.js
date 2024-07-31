const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/book-routes");
const favoriteRoutes = require("./routes/favorites");
const purchaseRoutes = require("./routes/purchase-routes");
const userRoutes = require('./routes/user-routes');

const app = express();

app.use(express.json());
app.use(cors());

app.use("/books", bookRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/purchases", purchaseRoutes);
app.use('/users', userRoutes);


mongoose
  .connect("mongodb+srv://user:sibani@bookstore.emdvpz9.mongodb.net/")
  .then(() => console.log("Connected To Database"))
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));
