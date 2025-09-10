import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBook } from "../../features/booksSlice";
import "./EditBookModal.css";

function EditBookModal({ book, onClose }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [genre, setGenre] = useState(book.genre);
  const [rent, setRent] = useState(book.rent);
  const [cover, setCover] = useState(book.cover);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBook({ ...book, title, author, genre, rent, cover }));
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Book</h2>
        <form onSubmit={handleSubmit}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <input value={author} onChange={(e) => setAuthor(e.target.value)} />
          <input value={genre} onChange={(e) => setGenre(e.target.value)} />
          <input value={rent} onChange={(e) => setRent(e.target.value)} />
          <input value={cover} onChange={(e) => setCover(e.target.value)} />
          <div className="modal-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditBookModal;
