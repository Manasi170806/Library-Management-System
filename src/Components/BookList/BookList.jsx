import React, { useEffect } from "react";
 import { useSelector, useDispatch } from "react-redux";
 import { selectBooks, fetchBooks } from "../../features/booksSlice";
import "./BookList.css";
import { Link } from "react-router-dom";
import Description from "../Description-section/Description";


const BookList = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks) || [];
  const status = useSelector((s) => s.books.status.total);
  const error = useSelector((s) => s.books.error.total);


  useEffect(() => {
    if (status === "idle") dispatch(fetchBooks());
  }, [status, dispatch]);

  return (
    <div className="books-card">
      <div className="books-card__header">
        <h2> Book Library</h2>
        <span className="pill pill--muted">{books.length} items</span>
      </div>

      {status === "loading" && <div className="skeleton">Loading books…</div>}
      {status === "failed" && (
        <div className="error">Failed to load: {error}</div>
      )}

      {status === "succeeded" && (
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
                <th>Details</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {books.length > 0 ? (
                books.map((book, i) => {
                  const total = book.isbn?.length ?? 0;
                  const available = book.isAvailable ? total : 0; // if not available show 0/x
                  const pct = total ? Math.round((available / total) * 100) : 0;


                  return (
                    <tr key={book.id}>
                      <td className="cover">
                        <img src={book.cover} alt={book.title} />
                      </td>
                      <td className="title">
                        <div className="title__text">{book.title}</div>
                      </td>
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
                        <div className="meter" aria-label="availability">
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
                        <Link to={`/description/${book.id}`}>
                          <button className="btn-link">View</button>
                        </Link>
                      </td>
                      <td>
                        <button className="btn-link" onClick={() => console.log("delete:", book.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="empty">
                    📭 No books available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookList;
