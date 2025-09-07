import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBooks, selectBooks, deleteBook } from "../../features/booksSlice";
import "./BookList.css";
import { IoIosSearch } from "react-icons/io";
import { MdDelete, MdModeEdit, MdOutlineRemoveRedEye } from "react-icons/md";
import EditBookModal from "./EditBookDetails.jsx";

function BookList() {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const [search, setSearch] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [page, setPage] = useState(1);
  const booksPerPage = 10;
  const [selectedBook, setSelectedBook] = useState(null);

  // Fetch books on mount
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  // Filter search results whenever books or search changes
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
  }, [books, search]);

  // Delete handler
  const handleDelete = (id) => {
    dispatch(deleteBook(id));
    // Immediately remove the book from filteredBooks so UI updates instantly
    setFilteredBooks((prev) => prev.filter((book) => book.id !== id));
  };

  // Pagination logic
  const indexOfLastBook = page * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <>
      <div className={`books-card ${selectedBook ? "blurred" : ""}`}>
        <div className="books-card__header">
          <h2>📚 Book Library</h2>
          <span className="pill pill--muted">{filteredBooks.length} items</span>
        </div>

        {/* Add New Book */}
        <div className="add-book">
          <Link to="/AddBooks">
            <button className="btn-add">Add Book</button>
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
          <span className="search-icon">
            <IoIosSearch
              style={{
                fontSize: "22px",
                color: "#676565",
                position: "absolute",
                left: "8px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
          </span>
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
                        ? `${book.isbn ? book.isbn.length : 0}/${book.isbn ? book.isbn.length : 0}`
                        : `0/${book.isbn ? book.isbn.length : 0}`}
                    </td>

                    <td>
                      <div className="action-buttons">
                        {/* View Button */}
                        <Link to={`/description/${book.id}`}>
                          <button className="btn-view">
                            <MdOutlineRemoveRedEye style={{ fontSize: "18px" }} />
                          </button>
                        </Link>
                        {/* Edit Button */}
                        <button
                          className="btn-edit"
                          onClick={() => setSelectedBook(book)}
                        >
                          <MdModeEdit style={{ fontSize: "18px" }} />
                        </button>
                        {/* Delete Button */}
                        <button
                          className="btn-del"
                          onClick={() => handleDelete(book.id)}
                        >
                          <MdDelete style={{ fontSize: "18px" }} />
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
            disabled={page === totalPages || totalPages === 0}
          >
            NEXT
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedBook && (
        <EditBookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </>
  );
}

export default BookList;
