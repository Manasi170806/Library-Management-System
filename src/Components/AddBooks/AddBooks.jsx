import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../../features/booksSlice";
import { useNavigate } from "react-router-dom";
import "./AddBooks.css";

function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [cover, setCover] = useState("");
  const [rent, setRent] = useState("");
  const [isbnInput, setIsbnInput] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBook = {
      id: Date.now().toString(),
      title,
      author,
      genre,
      cover,
      rent: Number(rent),
      isAvailable,
      isbn: isbnInput
        .split(",")
        .map((code) => code.trim())
        .filter((code) => code.length > 0),
    };

    dispatch(addBook(newBook)).then(() => {
      navigate("/books");
    });
  };

  return (
    <div className="add-book-form">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Cover Image URL"
          value={cover}
          onChange={(e) => setCover(e.target.value)}
        />
        <input
          type="number"
          placeholder="Rent"
          value={rent}
          onChange={(e) => setRent(e.target.value)}
        />
        <input
          type="text"
          placeholder="ISBN codes (comma separated)"
          value={isbnInput}
          onChange={(e) => setIsbnInput(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
          />
          Available
        </label>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
