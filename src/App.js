import React from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import AddBook from "./components/AddBook";
import Books from "./components/Book/Books";
import About from "./components/About";
import BookDetail from "./components/Book/BookDetail";

import Favorites from "./components/Favorites"; // Import the Favorites component

function App() {
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/add" element={<AddBook />} exact />
          <Route path="/books" element={<Books />} exact />
          <Route path="/about" element={<About />} exact />
          <Route path="/books/:id" element={<BookDetail />} exact />
          <Route path="/favorites" element={<Favorites />} exact /> 
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
