import {
    Button,
    Checkbox,
    FormControlLabel,
    FormLabel,
    TextField,
    Typography,
    Card,
    CardContent,
    CardActions,
  } from "@mui/material";
  import { Box } from "@mui/system";
  import axios from "axios";
  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  
  const AddBook = () => {
    const history = useNavigate();
    const [inputs, setInputs] = useState({
      name: "",
      description: "",
      price: "",
      author: "",
      image: "",
    });
    const [checked, setChecked] = useState(false);
  
    const handleChange = (e) => {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
  
    const sendRequest = async () => {
      await axios
        .post("http://localhost:5000/books", {
          name: String(inputs.name),
          author: String(inputs.author),
          description: String(inputs.description),
          price: Number(inputs.price),
          image: String(inputs.image),
          available: Boolean(checked),
        })
        .then((res) => res.data);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      sendRequest().then(() => history("/books"));
    };
  
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#f5f5f5"
      >
        <Card
          sx={{
            maxWidth: 600,
            padding: 3,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "white",
          }}
        >
          <CardContent>
            <Typography variant="h4" component="div" gutterBottom>
              Add a New Book
            </Typography>
            <form onSubmit={handleSubmit}>
              <FormLabel>Name</FormLabel>
              <TextField
                value={inputs.name}
                onChange={handleChange}
                margin="normal"
                fullWidth
                variant="outlined"
                name="name"
              />
              <FormLabel>Author</FormLabel>
              <TextField
                value={inputs.author}
                onChange={handleChange}
                margin="normal"
                fullWidth
                variant="outlined"
                name="author"
              />
              <FormLabel>Description</FormLabel>
              <TextField
                value={inputs.description}
                onChange={handleChange}
                margin="normal"
                fullWidth
                variant="outlined"
                name="description"
                multiline
                rows={4}
              />
              <FormLabel>Price</FormLabel>
              <TextField
                value={inputs.price}
                onChange={handleChange}
                type="number"
                margin="normal"
                fullWidth
                variant="outlined"
                name="price"
              />
              <FormLabel>Image URL</FormLabel>
              <TextField
                value={inputs.image}
                onChange={handleChange}
                margin="normal"
                fullWidth
                variant="outlined"
                name="image"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                  />
                }
                label="Available"
              />
              <CardActions>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    mt: 2,
                    bgcolor: "#1E88E5",
                    "&:hover": {
                      backgroundColor: "#1565C0",
                    },
                    color: "white",
                  }}
                  fullWidth
                >
                  Add Book
                </Button>
              </CardActions>
            </form>
          </CardContent>
        </Card>
      </Box>
    );
  };
  
  export default AddBook;