import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

import {
  selectMembers,
  fetchMembers,
  deleteMember,
} from "../../features/memberSlice";
import "./Members.css";

const MemberList = () => {
  const dispatch = useDispatch();
  const members = useSelector(selectMembers);
  const status = useSelector((s) => s.members.status);
  const error = useSelector((s) => s.members.error);

  const [search, setSearch] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [page, setPage] = useState(1);
  const membersPerPage = 10;

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredMembers(members);
    } else {
      const result = members.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredMembers(result);
      setPage(1);
    }
  }, [search, members]);

  // pagination logic
  const indexOfLast = page * membersPerPage;
  const indexOfFirst = indexOfLast - membersPerPage;
  const currentMembers = filteredMembers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

  return (
    <div className="members-card">
      <div className="members-card__header">
        <h2>👥 Library Members</h2>
        <span className="pill pill--muted">
          {filteredMembers.length} members
        </span>
      </div>

      {/* Add members */}
      <div className="add-members">
        <Link to="/AddMembers">
          <button className="btn-add">+ Add New Member</button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="search">
        <input
          type="text"
          placeholder="Search members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="search-icon">🔍</span>
      </div>

      {status === "loading" && <div className="skeleton">Loading members…</div>}
      {status === "failed" && (
        <div className="error">Failed to load: {error}</div>
      )}

      {status === "succeeded" && (
        <>
          <div className="table-responsive">
            <table className="members-table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Membership</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Last Active</th>
                  <th>Remove</th>
                </tr>
              </thead>

              <tbody>
                {currentMembers.length > 0 ? (
                  currentMembers.map((m) => (
                    <tr key={m.id}>
                      <td>
                        <img
                          src={m.photo}
                          alt={m.name}
                          width="50"
                          style={{ borderRadius: "50%" }}
                        />
                      </td>
                      <td>{m.name}</td>
                      <td>{m.email}</td>
                      <td>{m.phone}</td>
                      <td>{m.membershipType}</td>
                      <td
                        style={{
                          fontWeight: "bold",
                          color: m.status === "Active" ? "green" : "red",
                        }}
                      >
                        {m.status}
                      </td>
                      <td>{m.joined}</td>
                      <td>{m.lastActive}</td>
                      <td>
                        <button
                          className="btn-del"
                          onClick={() =>
                            dispatch(deleteMember(m.id.toString()))
                          }
                        >
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="empty">
                      📭 No members found
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
        </>
      )}
    </div>
  );
};

export default MemberList;
