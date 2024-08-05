import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Container, Typography, TextField, Button, Avatar, Paper } from "@mui/material";
import axios from "axios";

const Profile = () => {
  const auth = useContext(AuthContext);
  const [name, setName] = useState(auth.userName);
  const [profilePicture, setProfilePicture] = useState(auth.userProfilePic);
  const [password, setPassword] = useState("");

  const handleSave = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/users/${auth.userId}`, {
        name,
        profilePicture,
        password,
      }, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      auth.login(auth.userId, auth.token, response.data.userName, response.data.userProfilePic);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} style={{ padding: 20, marginTop: 50 }}>
        <Avatar src={profilePicture} alt={name} style={{ margin: "auto", width: 100, height: 100 }} />
        <Typography component="h1" variant="h5" align="center" style={{ margin: "20px 0" }}>
          Profile
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="profilePicture"
          label="Profile Picture URL"
          name="profilePicture"
          value={profilePicture}
          onChange={(e) => setProfilePicture(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="password"
          label="New Password"
          type="password"
          id="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          style={{ margin: "20px 0" }}
          onClick={handleSave}
        >
          Save
        </Button>
      </Paper>
    </Container>
  );
};

export default Profile;
