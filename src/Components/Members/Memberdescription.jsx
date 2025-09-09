import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectMembers } from "../../features/memberSlice";
import "./Memberdescription.css";
import EditMemberModal from "./Editmember.jsx";

const MemberDescription = () => {
  const { id } = useParams();
  const members = useSelector(selectMembers);
  const [member, setMember] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const found = members.find((m) => m.id.toString() === id);
    setMember(found || null);
  }, [id, members]);

  if (!member) {
    return (
      <div className="member-desc-card">
        <h2>❌ Member not found</h2>
      </div>
    );
  }

  return (
    <>
      <div className={`member-desc-card ${selectedMember ? "blurred" : ""}`}>
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
          <p>
            <strong>Email:</strong> {member.email}
          </p>
          <p>
            <strong>Phone:</strong> {member.phone}
          </p>
          <p>
            <strong>Joined:</strong> {member.joined}
          </p>
          <p>
            <strong>Last Active:</strong> {member.lastActive}
          </p>
        </div>

        <div className="action-buttons">
          <button
            className="edit-button"
            onClick={() => setSelectedMember(member)}
          >
            ✏ Edit
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedMember && (
        <EditMemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
<<<<<<< HEAD
    
      <div className="member-details">
        <p><strong style={{ color: "#333" ,backgroundColor: "white"}}>Email:</strong> {member.email}</p>
        <p><strong style={{ color: "#333" ,backgroundColor: "white"}}>Phone:</strong> {member.phone}</p>
        <p><strong style={{ color: "#333" ,backgroundColor: "white"}}>Joined:</strong> {member.joined}</p>
        <p><strong style={{ color: "#333" ,backgroundColor: "white"}}>Last Active:</strong> {member.lastActive}</p>
      </div>

    
    
=======
>>>>>>> cb055fadb0bd233f5c86e6c4b92e1f45daa2afd9
    </>
  );
};

export default MemberDescription;
