import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMembers, fetchMembers } from "../../features/memberSlice";

const MemberList = () => {
  const dispatch = useDispatch();
  const members = useSelector(selectMembers) || [];
  const status = useSelector((s) => s.members.status);
  const error = useSelector((s) => s.members.error);

  useEffect(() => {
    if (status === "idle") dispatch(fetchMembers());
  }, [status, dispatch]);

  return (
    <div className="members-card">
      <div className="members-card__header">
        <h2> Member Library</h2>
        <span className="pill pill--muted">{members.length} items</span>
      </div>

      {status === "loading" && <div className="skeleton">Loading members…</div>}
      {status === "failed" && <div className="error">Failed to load: {error}</div>}

      {status === "succeeded" && (
        <div className="table-responsive">
          <table className="books-table" border="1" cellPadding="8">
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
              {members.length > 0 ? (
                members.map((member) => {
                  const total = member.isbn?.length ?? 0;
                  const available = member.isAvailable ? total : 0;
                  const pct = total ? Math.round((available / total) * 100) : 0;

                  return (
                    <tr key={member.id}>
                      <td className="cover">
                        <img src={member.cover} alt={member.title} width="50" />
                      </td>
                      <td>{member.title}</td>
                      <td>{member.author}</td>
                      <td>{member.genre}</td>
                      <td>
                        <span
                          style={{
                            color: member.isAvailable ? "green" : "red",
                            fontWeight: "bold",
                          }}
                        >
                          {member.isAvailable ? "Available" : "Not Available"}
                        </span>
                      </td>
                      <td>
                        <div
                          style={{
                            background: "#ddd",
                            width: "100px",
                            height: "10px",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              background: "green",
                              width: `${pct}%`,
                              height: "100%",
                            }}
                          />
                        </div>
                        <div className="muted">
                          {available}/{total}
                        </div>
                      </td>
                      <td>
                        <button
                          onClick={() => console.log("View:", member.id)}
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
                    📭 No members available
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
