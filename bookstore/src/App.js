import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Login from "./components/Login";
import Home from "./components/About";
import Books from "./components/Book/Books";
import AddBook from "./components/AddBook";
import Favorites from "./components/Favorites";
import Purchases from "./components/purchases";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<AddBook />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/purchases" element={<Purchases />} />
        
      </Routes>
    </>
  );
};

export default App;
