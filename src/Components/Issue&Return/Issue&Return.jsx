// Issue_Return.jsx
import React, { useEffect, useState } from "react";
import "./Issue&Return.css";

const API = "http://localhost:3000";

export default function Issue_Return() {
  const [members, setMembers] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedMemberIssue, setSelectedMemberIssue] = useState("");
  const [selectedBookIssue, setSelectedBookIssue] = useState("");
  const [selectedMemberReturn, setSelectedMemberReturn] = useState("");
  const [selectedBookReturn, setSelectedBookReturn] = useState("");
  const [message, setMessage] = useState("");

  // Pagination for Available Books
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  useEffect(() => {
    fetchMembers();
    fetchBooks();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await fetch(`${API}/members`);
      const data = await res.json();
      setMembers(data);
    } catch (err) {
      console.error(err);
      setMessage("Error loading members: " + err.message);
    }
  };

  const fetchBooks = async () => {
    try {
      const res = await fetch(`${API}/books`);
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error(err);
      setMessage("Error loading books: " + err.message);
    }
  };

  const makeAddedIssuedBooks = (member, bookId, bookTitle) => {
    const prev = member.issuedBooks || [];
    const isObjectList =
      prev.length > 0 &&
      typeof prev[0] === "object" &&
      prev[0].hasOwnProperty("bookId");
    if (isObjectList) {
      const dueDate = new Date(Date.now() + 14 * 24 * 3600 * 1000)
        .toISOString()
        .slice(0, 10);
      return [...prev, { bookId: String(bookId), title: bookTitle, dueDate }];
    } else {
      return [...prev, String(bookId)];
    }
  };

  const makeRemovedIssuedBooks = (member, bookId) => {
    const prev = member.issuedBooks || [];
    const isObjectList =
      prev.length > 0 &&
      typeof prev[0] === "object" &&
      prev[0].hasOwnProperty("bookId");
    if (isObjectList) {
      return prev.filter((ib) => String(ib.bookId) !== String(bookId));
    } else {
      return prev.filter((id) => String(id) !== String(bookId));
    }
  };

  // ISSUE BOOK
  const issueBook = async () => {
    setMessage("");
    if (!selectedMemberIssue || !selectedBookIssue) {
      setMessage("⚠️ Please select both member and book.");
      return;
    }

    const memberId = String(selectedMemberIssue);
    const bookId = String(selectedBookIssue);

    const book = books.find((b) => String(b.id) === bookId);
    const member = members.find((m) => String(m.id) === memberId);

    if (!book || !member) {
      setMessage("Member or Book not found.");
      return;
    }
    if (!book.isAvailable && book.isAvailable !== undefined) {
      setMessage("❌ Book is already issued.");
      return;
    }

    const prevIssued = member.issuedBooks || [];
    const newIssued = makeAddedIssuedBooks(member, bookId, book.title);

    try {
      // update member
      const resMember = await fetch(`${API}/members/${memberId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ issuedBooks: newIssued }),
      });
      if (!resMember.ok) throw new Error("Failed to update member");

      // update book
      const resBook = await fetch(`${API}/books/${bookId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailable: false }),
      });
      if (!resBook.ok) throw new Error("Failed to update book");

      // update state
      setMembers((prev) =>
        prev.map((m) =>
          String(m.id) === memberId ? { ...m, issuedBooks: newIssued } : m
        )
      );
      setBooks((prev) =>
        prev.map((b) =>
          String(b.id) === bookId ? { ...b, isAvailable: false } : b
        )
      );

      setMessage("✅ Book issued successfully.");
      setSelectedBookIssue("");
      setSelectedMemberIssue("");
    } catch (err) {
      console.error(err);
      setMessage("Failed to issue book. " + err.message);
    }
  };

  // RETURN BOOK
  const returnBook = async () => {
    setMessage("");
    if (!selectedMemberReturn || !selectedBookReturn) {
      setMessage("⚠️ Please select member and issued book.");
      return;
    }

    const memberId = String(selectedMemberReturn);
    const bookId = String(selectedBookReturn);

    const book = books.find((b) => String(b.id) === bookId);
    const member = members.find((m) => String(m.id) === memberId);

    if (!book || !member) {
      setMessage("Member or Book not found.");
      return;
    }

    const prevIssued = member.issuedBooks || [];
    const newIssued = makeRemovedIssuedBooks(member, bookId);

    try {
      const resMember = await fetch(`${API}/members/${memberId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ issuedBooks: newIssued }),
      });
      if (!resMember.ok) throw new Error("Failed to update member");

      const resBook = await fetch(`${API}/books/${bookId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailable: true }),
      });
      if (!resBook.ok) throw new Error("Failed to update book");

      setMembers((prev) =>
        prev.map((m) =>
          String(m.id) === memberId ? { ...m, issuedBooks: newIssued } : m
        )
      );
      setBooks((prev) =>
        prev.map((b) =>
          String(b.id) === bookId ? { ...b, isAvailable: true } : b
        )
      );

      setMessage("✅ Book returned successfully.");
      setSelectedBookReturn("");
      setSelectedMemberReturn("");
    } catch (err) {
      console.error(err);
      setMessage("Failed to return book. " + err.message);
    }
  };

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books
    .filter((b) => b.isAvailable)
    .slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(
    books.filter((b) => b.isAvailable).length / booksPerPage
  );

  return (
    <div className="container">
      <h1 className="main-title">📚 Library Issue & Return</h1>
      {message && <p className="message">{message}</p>}

      {/* Issue Section */}
      <div className="issue-return-card">
        <h2>📕 Issue Book</h2>
        <div className="form-group">
          <select
            value={selectedMemberIssue}
            onChange={(e) => setSelectedMemberIssue(e.target.value)}
          >
            <option value="">Select Member</option>
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
          <select
            value={selectedBookIssue}
            onChange={(e) => setSelectedBookIssue(e.target.value)}
          >
            <option value="">Select Book</option>
            {books
              .filter((b) => b.isAvailable)
              .map((b) => (
                <option key={b.id} value={b.id}>
                  {b.title}
                </option>
              ))}
          </select>
          <button onClick={issueBook}>Issue Book</button>
        </div>
      </div>

      {/* Return Section */}
      <div className="issue-return-card">
        <h2>📗 Return Book</h2>
        <div className="form-group">
          <select
            value={selectedMemberReturn}
            onChange={(e) => setSelectedMemberReturn(e.target.value)}
          >
            <option value="">Select Member</option>
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>

          {selectedMemberReturn && (
            <select
              value={selectedBookReturn}
              onChange={(e) => setSelectedBookReturn(e.target.value)}
            >
              <option value="">Select Issued Book</option>
              {(() => {
                const member = members.find(
                  (m) => String(m.id) === String(selectedMemberReturn)
                );
                if (!member || !member.issuedBooks) return null;
                return member.issuedBooks.map((ib) => {
                  if (typeof ib === "object" && ib.bookId) {
                    return (
                      <option key={ib.bookId} value={ib.bookId}>
                        {ib.title || `Book ${ib.bookId}`}
                      </option>
                    );
                  } else {
                    const book = books.find((b) => String(b.id) === String(ib));
                    return (
                      <option key={ib} value={ib}>
                        {book ? book.title : `Book ${ib}`}
                      </option>
                    );
                  }
                });
              })()}
            </select>
          )}

          <button onClick={returnBook}>Return Book</button>
        </div>
      </div>

      {/* Available Books */}
      <div className="card">
        <h2 className="card-title">📖 Available Books</h2>
        <div className="book-grid">
          {currentBooks.map((book) => (
            <div key={book.id} className="book-card">
              <img
                src={book.cover || "https://via.placeholder.com/200x260"}
                alt={book.title}
                className="book-cover"
              />
              <div className="book-info">
                <h3>{book.title}</h3>
                <p className="author">✍️ {book.author}</p>
                <p className="genre">📌 {book.genre}</p>
                <span className="badge available">Available</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
