import axios from 'axios';

export const getBooks = async () => {
  const response = await axios.get('/api/books');
  return response.data.books;
};

export const getBookById = async (id) => {
  const response = await axios.get(`/api/books/${id}`);
  return response.data.book;
};

export const addBook = async (bookData) => {
  const response = await axios.post('/api/books', bookData);
  return response.data;
};