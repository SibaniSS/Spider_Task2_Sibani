import { Button } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Book.css";

const Book = (props) => {
  const history = useNavigate();
  const { _id, name, author, description, price, image } = props.book;

  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:5000/books/${_id}`)
      .then((res) => res.data)
      .then(() => history("/"))
      .then(() => history("/books"));
  };

  const addToFavoritesHandler = async () => {
    await axios
      .post("http://localhost:5000/favorites", {
        bookId: _id,
        name: name,
        author: author,
        description: description,
        price: price,
        image: image,
      })
      .then((res) => res.data)
      .catch((err) => console.error("Error adding to favorites:", err));
  };

  return (
    <div className="card">
      <img src={image} alt={name} />
      <article>By {author}</article>
      <h3>{name}</h3>
      <p>{description}</p>
      <h3>Rs {price}</h3>
      <Button color="error" onClick={deleteHandler} sx={{ mt: "auto" }}>
        Delete
      </Button>
      <Button color="primary" onClick={addToFavoritesHandler} sx={{ mt: "auto" }}>
        Favorite
      </Button>
    </div>
  );
};

export default Book;
