import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMembers, fetchMembers, deleteMember } from "../../features/memberSlice";
import "./Members.css";

const MemberList = () => {
  const dispatch = useDispatch();
  const members = useSelector(selectMembers);
  const status = useSelector((s) => s.members.status);
  const error = useSelector((s) => s.members.error);

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);


  return (
    <div className="members-card">
      <div className="members-card__header">
        <h2>Library Members</h2>
        <span className="pill pill--muted">{members.length} members</span>
      </div>

      {status === "loading" && <div className="skeleton">Loading members…</div>}
      {status === "failed" && <div className="error">Failed to load: {error}</div>}

      {status === "succeeded" && (
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
              {members.length > 0 ? (
                members.map((m) => (
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
                    <td style={{ fontWeight: "bold", color: m.status === "Active" ? "green" : "red" }}>
                      {m.status}
                    </td>
                    <td>{m.joined}</td>
                    <td>{m.lastActive}</td>
                    <td>
                    <button onClick={() => dispatch(deleteMember(m.id.toString()))}>Remove</button>
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
      )}
    </div>
  );
};

export default MemberList;
