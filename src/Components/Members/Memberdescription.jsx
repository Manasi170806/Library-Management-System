import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectMembers } from "../../features/memberSlice";
import "./Memberdescription.css";

const MemberDescription = () => {
  const { id } = useParams();
  const members = useSelector(selectMembers);
  const [member, setMember] = useState(null);

  useEffect(() => {
    const found = members.find((m) => m.id.toString() === id);
    setMember(found || null);
  }, [id, members]);

  if (!member) {
    return (
      <div className="member-desc-card">
        <h2>❌ Member not found</h2>
        {/* <Link to="/members">
          <button className="btn-back">⬅ Back to Members</button>
        </Link> */}
      </div>
    );
  }

  return (
    <div className="member-desc-card">
      <div className="member-header">
        <img src={member.photo} alt={member.name} className="member-photo" />
        <div>
          <h2>{member.name}</h2>
          <p className="member-type">{member.membershipType}</p>
          <p
            className={`member-status ${
              member.status === "Active" ? "active" : "inactive"
            }`}
          >
            {member.status}
          </p>
        </div>
      </div>

      <div className="member-details">
        <p><strong>Email:</strong> {member.email}</p>
        <p><strong>Phone:</strong> {member.phone}</p>
        <p><strong>Joined:</strong> {member.joined}</p>
        <p><strong>Last Active:</strong> {member.lastActive}</p>
      </div>

    
    </div>
  );
};

export default MemberDescription;
