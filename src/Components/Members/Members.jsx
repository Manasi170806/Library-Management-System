import React, { useEffect, useState } from "react";
import "./members.css";

const API = "http://localhost:3000";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(5);

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
      console.error("Error fetching members:", err);
    }
  };

  const fetchBooks = async () => {
    try {
      const res = await fetch(`${API}/books`);
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  const deleteMember = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    try {
      await fetch(`${API}/members/${id}`, { method: "DELETE" });
      setMembers((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Error deleting member:", err);
    }
  };

  // Filter & Search
  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.phone.includes(searchTerm);
    const matchesCategory = category === "all" || m.category === category;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const indexOfLast = currentPage * membersPerPage;
  const indexOfFirst = indexOfLast - membersPerPage;
  const currentMembers = filteredMembers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

  const categories = ["all", "student", "faculty", "public"];

  // Helper: Get book title from bookId
  const getBookTitle = (bookId) => {
    const book = books.find((b) => b.id === bookId);
    return book ? book.title : `Book ID: ${bookId}`;
  };

  return (
    <div className="members-card">
      {/* Header */}
      <div className="members-card__header">
        <h2>👥 Members</h2>
        <span className="pill">{filteredMembers.length} Total</span>
      </div>



      {/* Search */}
      <div className="members-filters">
        <input
          type="text"
          placeholder="Search by name, email, phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Members Table */}
      <div className="table-responsive">
        <table className="members-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Issued</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentMembers.length > 0 ? (
              currentMembers.map((m) => (
                <tr key={m.id}>
                  <td>
                    <img
                      src={m.photo || "https://via.placeholder.com/50"}
                      alt={m.name}
                      width="40"
                      height="40"
                    />
                  </td>
                  <td>{m.name}</td>
                  <td>{m.email}</td>
                  <td>{m.phone}</td>
                  <td>{m.status}</td>
                  <td>{m.issuedBooks ? m.issuedBooks.length : 0}</td>
                  <td>
                    <div className="view-delete-buttons">
                      <button
                        className="btn-view"
                        onClick={() => setSelectedMember(m)}
                      >
                        👁
                      </button>
                      <button
                        className="btn-del"
                        onClick={() => deleteMember(m.id)}
                      >
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="empty">
                  No members found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* Modal for Issued Books */}
      {selectedMember && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{selectedMember.name} – Issued Books</h2>

            {selectedMember.issuedBooks && selectedMember.issuedBooks.length > 0 ? (
              <ul>
                {selectedMember.issuedBooks.map((ib, i) => {
                  if (typeof ib === "object" && ib.bookId) {
                    // If issuedBooks has bookId object
                    return (
                      <li key={i}>
                        {ib.title || getBookTitle(ib.bookId)}{" "}
                        {ib.dueDate && (
                          <span style={{ color: "red" }}>
                            (Due: {ib.dueDate})
                          </span>
                        )}
                      </li>
                    );
                  } else {
                    // If issuedBooks is just bookId
                    return <li key={i}>{getBookTitle(ib)}</li>;
                  }
                })}
              </ul>
            ) : (
              <p>No books issued.</p>
            )}

            <button
              className="btn-add"
              onClick={() => setSelectedMember(null)}
              style={{ marginTop: "15px" }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
