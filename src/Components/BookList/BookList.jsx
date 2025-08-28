import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BookList.css";

const BookList = () => {
  const [books, setBooks] = useState([]);   
  const [loading, setLoading] = useState(true); 
  // const [error, setError] = useState(null);     

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
