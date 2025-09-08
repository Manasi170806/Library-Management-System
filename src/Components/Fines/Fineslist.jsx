import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFines, markPaid } from "../../features/finesSlice.js";
import "./Fines.css";

function FinesList() {
  const dispatch = useDispatch();
  const { items: fines, status, error } = useSelector((state) => state.fines);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchFines());
    }
  }, [status, dispatch]);

  if (status === "loading") return <p>Loading fines...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  const filtered = fines
    .filter(
      (f) =>
        f.memberId.includes(search) ||
        (f.bookId ? f.bookId.includes(search) : false) ||
        f.paymentStatus.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortAsc
        ? new Date(a.dueDate) - new Date(b.dueDate)
        : new Date(b.dueDate) - new Date(a.dueDate)
    );

  return (
    <div className="card">
      <h1>Library Fines</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => setSortAsc(!sortAsc)}>
          Sort by Due Date {sortAsc ? "↑" : "↓"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Member</th>
            <th>Book</th>
            <th>Issue</th>
            <th>Due</th>
            <th>Return</th>
            <th>Fine</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((f) => (
            <tr key={f.id}>
              <td>{f.id}</td>
              <td>{f.memberId}</td>
              <td>{f.bookId || "—"}</td>
              <td>{f.issueDate}</td>
              <td>{f.dueDate}</td>
              <td>{f.returnDate || "—"}</td>
              <td>₹{f.fineAmount}</td>
              <td>
                <span
                  className={`badge ${
                    f.paymentStatus === "Paid" ? "paid" : "unpaid"
                  }`}
                >
                  {f.paymentStatus}
                </span>
              </td>
              <td>
                {f.paymentStatus === "Unpaid" && (
                  <button onClick={() => dispatch(markPaid(f.id))}>
                    Mark Paid
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FinesList;
