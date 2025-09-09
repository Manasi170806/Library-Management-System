import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
// import { IoIosSearch } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md"; 

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
  const [filter, setFilter] = useState("All"); // 🔹 membership filter state
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [page, setPage] = useState(1);
  const membersPerPage = 10;

  // Fetch members on mount
  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  // Filter search + membership whenever search/filter/members change
  useEffect(() => {
    let result = members;

    const query = search.trim().toLowerCase();

    // 🔍 Search
    if (query !== "") {
      result = result.filter((m) => {
        const name = m.name?.toLowerCase() || "";
        const email = m.email?.toLowerCase() || "";
        const phone = m.phone?.toLowerCase() || "";
        const membership = m.membershipType?.toLowerCase() || "";

        return (
          name.includes(query) ||
          email.includes(query) ||
          phone.includes(query) ||
          membership.includes(query)
        );
      });
    }

    // 🎯 Membership Filter
    if (filter !== "All") {
      result = result.filter((m) => m.membershipType === filter);
    }

    setFilteredMembers(result);
    setPage(1); // reset to page 1 on filter/search
  }, [search, filter, members]);

  // Delete handler
  const handleDelete = (id) => {
    dispatch(deleteMember(id.toString()));
    setFilteredMembers((prev) => prev.filter((m) => m.id !== id));
  };

  // Pagination logic
  const indexOfLast = page * membersPerPage;
  const indexOfFirst = indexOfLast - membersPerPage;
  const currentMembers = filteredMembers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

  return (
    <div className="members-card" style={{backgroundColor:"white" ,width:"100%"}}>
      <div className="members-card__header">
        <h2>👥 Library Members</h2>
        <span className="pill pill--muted">
          {filteredMembers.length} members
        </span>
      </div>

      {/* Top Controls */}
      <div className="controls">
        {/* Search Bar */}
        <div className="search-members">
          <input
            type="text"
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* <span
            className="search-icon"
            style={{
              position: "absolute",
              left: "9px",
              top: "52%",
              transform: "translateY(-50%)",
              fontSize: "22px",
              color: "#000000ff",
            }}
          >
            <IoIosSearch />
          </span> */}
        </div>

        {/* 🔹 Membership Filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-dropdown"
        >
          <option value="All">All</option>
          <option value="Public">Public</option>
          <option value="Faculty">Faculty</option>
          <option value="Student">Student</option>
        </select>

        {/* Add Member */}
        <Link to="/AddMembers">
          <button className="btn-add">Add Member</button>
        </Link>
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
                  <th>Actions</th>
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
                        <div className="view-delete-buttons">
                          <Link to={`/member/${m.id}`}>
                            <button className="btn-view">
                              <MdOutlineRemoveRedEye style={{ fontSize: "18px" }} />
                            </button>
                          </Link>

                          <button
                            className="btn-del"
                            onClick={() => handleDelete(m.id)}
                          >
                            <MdDelete style={{ fontSize: "18px" }} />
                          </button>
                        </div>
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
              disabled={page === totalPages || totalPages === 0}
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
