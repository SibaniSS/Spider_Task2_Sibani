const express = require("express");
const app=express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const mongoose = require("mongoose");
const router = require("./routes/book-routes");
app.use("/books", router);
mongoose
  .connect(
    "mongodb+srv://user:sibani@bookstore.emdvpz9.mongodb.net/"
  )
  .then(() => console.log("Connected To Database"))
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));
 