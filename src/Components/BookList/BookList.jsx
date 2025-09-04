import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBooks, selectBooks, deleteBook } from "../../features/booksSlice";
import "./BookList.css";

function BookList() {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const [search, setSearch] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  // Fetch books on mount
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  // Update filtered books when search or books change
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredBooks(books);
    } else {
      const result = books.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredBooks(result);
    }
  }, [search, books]);

  // Handle delete
  const handleDelete = (id) => {
    dispatch(deleteBook(id));
  };

  return (
    <div className="books-card">
      <div className="books-card__header">
        <h2>📚 Book Library</h2>
        <span className="pill pill--muted">{filteredBooks.length} items</span>
      </div>
      {/* Search Bar */}
      <div className="search">
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="search-icon">🔍</span>
      </div>

      {/* Add Books */}
      <div className="add-book">
        <Link to="/AddBooks">
          <button className="btn-add">+ Add New Book</button>
        </Link>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="books-table">
          <thead>
            <tr>
              <th>Book Cover</th>
              <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Book Title</th>
              <th>&nbsp;&nbsp;&nbsp;Author</th>
              <th>&nbsp;&nbsp;Genre</th>
              <th>&nbsp;&nbsp;&nbsp;Status</th>
              <th>Available</th>
              <th>&nbsp;&nbsp;&nbsp;&nbsp;View</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <tr key={book.id}>
                  <td className="cover">
                    <img src={book.cover} alt={book.title} />
                  </td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>
                    {book.isAvailable ? (
                      <span className="status-green">Available</span>
                    ) : (
                      <span className="status-red">Not Available</span>
                    )}
                  </td>
                  <td>
                    &nbsp;&nbsp;&nbsp;
                    {book.isAvailable
                      ? `${book.isbn.length}/${book.isbn.length}`
                      : `0/${book.isbn.length}`}
                  </td>
                  <td>
                    <div className="action-buttons">
                      {/* 👇 View button */}
                      <Link to={`/description/${book.id}`}>
                        <button className="btn-view">View</button>
                      </Link>
                      {/* 👇 Remove button */}
                      <button
                        className="btn-del"
                        onClick={() => handleDelete(book.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="empty">
                  No books found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookList;
