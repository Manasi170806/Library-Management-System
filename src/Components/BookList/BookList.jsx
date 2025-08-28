import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BookList.css";

const BookList = () => {
<<<<<<< HEAD
  const [books, setBooks] = useState([]);   
  const [loading, setLoading] = useState(true); 
  // const [error, setError] = useState(null);     
=======
  const dispatch = useDispatch();
  const books = useSelector(selectBooks) || [];
  const status = useSelector((s) => s.books.status.total);
  const error = useSelector((s) => s.books.error.total);
>>>>>>> eeb12a4c4bde1d3ade75d386c66401f272db618b

  // fetch books from json-server
  useEffect(() => {
    axios
      .get("http://localhost:3000/books")
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>⏳ Loading books...</p>;
  // if (error) return <p style={{ color: "red" }}> Error: {error}</p>;

  return (
    <div className="books-card">
      <h2>📚 Book Library ({books.length} items)</h2>

<<<<<<< HEAD
      <div className="table-responsive">
        <table className="books-table">
          <thead>
            <tr>
              <th>Cover</th>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Status</th>
              <th>Available</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {books.length > 0 ? (
              books.map((book) => (
                <tr key={book.id}>
                  <td>
                    <img
                      src={book.cover}
                      alt={book.title}
                      style={{ width: "50px", borderRadius: "5px" }}
                    />
                  </td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td style={{ color: book.isAvailable ? "green" : "red" }}>
                    {book.isAvailable ? "Available " : "Not Available "}
                  </td>
                  <td>
                    {book.isAvailable
                      ? `${book.isbn.length}/${book.isbn.length}`
                      : `0/${book.isbn.length}`}
                  </td>
                  <td>
                    <button
                      onClick={() => alert(`Viewing details of ${book.title}`)}
                    >
                      View
                    </button>
=======
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
              </tr>
            </thead>

            <tbody>
              {books.length > 0 ? (
                books.map((book) => {
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
                        <button
                          className="btn-link"
                          onClick={() => console.log("View:", book.id)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="empty">
                    📭 No books available
>>>>>>> eeb12a4c4bde1d3ade75d386c66401f272db618b
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  📭 No books available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookList;
