import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBooks, selectBooks, deleteBook } from "../../features/booksSlice";
import { MdDelete } from "react-icons/md";
import "./BookList.css";


function BookList() {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const [search, setSearch] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [page, setPage] = useState(1);
  const booksPerPage = 10;

  // Fetch books on mount
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  // Filter search results
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredBooks(books);
    } else {
      const result = books.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredBooks(result);
      setPage(1);
    }
  }, [search, books]);

  // Delete handler
  const handleDelete = (id) => {
    dispatch(deleteBook(id));
  };

  // Pagination logic
  const indexOfLastBook = page * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div className="books-card">
      <div className="books-card__header">
        <h2>📚 Book Library</h2>
        <span className="pill pill--muted">{filteredBooks.length} items</span>
      </div>

      {/* Add New Book */}
      <div className="add-book">
        <Link to="/AddBooks">
          <button className="btn-add">+ Add New Book</button>
        </Link>
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

      {/* Table */}
      <div className="table-responsive">
        <table className="books-table">
          <thead>
            <tr>
              <th>Book Cover</th>
              <th>Book Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Status</th>
              <th>Available</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.length > 0 ? (
              currentBooks.map((book) => (
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
                    {book.isAvailable
                      ? `${book.isbn.length}/${book.isbn.length}`
                      : `0/${book.isbn.length}`}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Link to={`/description/${book.id}`}>
                        <button className="btn-view">View</button>
                      </Link>
                      <button
                        className="btn-del"
                        onClick={() => handleDelete(book.id)}
                      >
                        <MdDelete />
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

      {/* Pagination */}
      <div className="pagination">
        <button
          className="btn"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          PREVIOUS
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
          className="btn"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          NEXT
        </button>
      </div>
    </div>
  );
}

export default BookList;
