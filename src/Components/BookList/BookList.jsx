import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectBooks, fetchBooks, deleteBook } from "../../features/booksSlice";
import "./BookList.css";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const BookList = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks) || [];
  const status = useSelector((s) => s.books.status);
  const error = useSelector((s) => s.books.error);

  // 🔍 Search state
  const [searchTerm, setSearchTerm] = useState("");

  // 🔽 Filter state
  const [genreFilter, setGenreFilter] = useState("All");

  useEffect(() => {
    if (status === "idle") dispatch(fetchBooks());
  }, [status, dispatch]);

  // 🔍 + 🔽 Combined Filter
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesFilter =
      genreFilter === "All" || book.genre === genreFilter;

    return matchesSearch && matchesFilter;
  });

  // ✅ Unique genre list for dropdown
  const genres = ["All", ...new Set(books.map((b) => b.genre))];

  return (
    <div className="books-container">
      {/* 📚 Header with search & filter */}
      <div className="books-card__header">
        <h2>Book Library</h2>
        <div className="header-actions">
          {/* 🔍 Search box */}
          <div className="search">
            <CiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* 🔽 Dropdown filter */}
          <select
            className="filter-dropdown"
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
          >
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>

          {/* Items count */}
          <span className="pill pill--muted">{filteredBooks.length} items</span>
        </div>
      </div>

      {/* 📖 Books Table */}
      <div className="books-card">
        {status === "loading" && <div className="skeleton">Loading books…</div>}
        {status === "failed" && (
          <div className="error">Failed to load: {error}</div>
        )}

        {(status === "succeeded" || status === "idle") && (
          <div className="table-responsive">
            <table className="books-table">
              <thead>
                <tr>
                  <th>Book Cover</th>
                  <th>Book Title</th>
                  <th>Author</th>
                  <th>Genre</th>
                  <th>Status</th>
                  <th>Availability</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="empty">
                      📭 No books found
                    </td>
                  </tr>
                ) : (
                  filteredBooks.map((book) => {
                    const total = book.isbn?.length ?? 0;
                    const available = book.isAvailable ? total : 0;
                    const pct = total
                      ? Math.round((available / total) * 100)
                      : 0;

                    return (
                      <tr key={book.id}>
                        <td className="cover">
                          <img src={book.cover} alt={book.title} />
                        </td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>
                          <span className="pill">{book.genre}</span>
                        </td>
                        <td>
                          <span
                            className={`chip ${
                              book.isAvailable ? "chip--green" : "chip--red"
                            }`}
                          >
                            {book.isAvailable ? "Available" : "Not Available"}
                          </span>
                        </td>
                        <td>
                          <div className="meter">
                            <div
                              className="meter__bar"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <div className="muted">
                            {available}/{total}
                          </div>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <Link to={`/description/${book.id}`}>
                              <button className="btn-link">View</button>
                            </Link>
                            <button
                              className="btn-del"
                              onClick={() => dispatch(deleteBook(book.id))}
                            >
                              Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookList;
