import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`/api/books/${id}`)
      .then(response => setBook(response.data.book))
      .catch(error => console.error('Error fetching book details:', error));
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <h1>{book.name}</h1>
      <p>Author: {book.author}</p>
      <p>Description: {book.description}</p>
      <p>Price: ${book.price}</p>
      <img src={book.image} alt={book.name} />
    </div>
  );
};

export default BookDetail;