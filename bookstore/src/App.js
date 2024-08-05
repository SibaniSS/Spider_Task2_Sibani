import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Header from "./components/Header";

import Home from "./components/About";
import Books from "./components/Book/Books";
import AddBook from "./components/AddBook";
import Favorites from "./components/Favorites";
import Purchases from "./components/purchases";
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/profile';
import { AuthProvider, AuthContext } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/about" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<AddBook />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="*" element={<Home />} />  {/* Default route */}
      </Routes>
    </AuthProvider>
  );
};

// ProtectedRoute component to protect profile route
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = React.useContext(AuthContext);
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default App;