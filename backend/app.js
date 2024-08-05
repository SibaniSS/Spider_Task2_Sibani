
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/book-routes");
const favoriteRoutes = require("./routes/favorites");
const purchaseRoutes = require("./routes/purchase-routes");
const userRoutes = require('./routes/user-routes');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true // Allow credentials
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));
app.use("/books", bookRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/purchases", purchaseRoutes);
app.use('/users', userRoutes);

app.use('/auth', authRoutes);
app.use('/uploads', express.static('uploads'));


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected To Database"))
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));
