import React, { useState, useContext } from "react";
import { Button, TextField, Typography, Container, Avatar, Paper } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log("Email:", email);
    console.log("Password:", password);
    try {
      const response = await axios.post("http://localhost:5000/auth/login", { email, password });
      console.log("Response:", response.data);
      auth.login(response.data.userId, response.data.token, response.data.userName, response.data.userProfilePic);
      navigate("/");
    } catch (err) {
      console.error("Error response:", err.response);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} style={{ padding: 20, marginTop: 50 }}>
        <Avatar style={{ margin: "auto", backgroundColor: "#3f51b5" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" align="center" style={{ margin: "20px 0" }}>
          Sign in
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: "20px 0" }}
          >
            Sign In
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;