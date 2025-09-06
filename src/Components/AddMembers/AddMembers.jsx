import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMember } from "../../features/memberSlice";
import { useNavigate } from "react-router-dom";
import "./AddMembers.css";

function AddMember() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [membershipType, setMembershipType] = useState("Student");
  const [status, setStatus] = useState("Active");
  const [subscription, setSubscription] = useState("Standard");
  const [joined, setJoined] = useState("");
  const [lastActive, setLastActive] = useState("");
  const [photo, setPhoto] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMember = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      membershipType,
      status,
      subscription,
      joined: joined || new Date().toLocaleDateString("en-GB"), // dd-mm-yyyy
      lastActive: lastActive || new Date().toLocaleDateString("en-GB"),
      photo: photo || `https://i.pravatar.cc/50?u=${Date.now()}`, // default avatar
    };

    dispatch(addMember(newMember)).then(() => {
      navigate("/members"); // go back to member list
    });
  };

  return (
    <div className="add-member-form">
      <h2>Add New Member</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <select
          value={membershipType}
          onChange={(e) => setMembershipType(e.target.value)}
        >
          <option value="Student">Student</option>
          <option value="Faculty">Faculty</option>
          <option value="Guest">Guest</option>
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <select
          value={subscription}
          onChange={(e) => setSubscription(e.target.value)}
        >
          <option value="Standard">Standard</option>
          <option value="Premium">Premium</option>
          <option value="Guest">Guest</option>
        </select>

        <label>Joined Date</label>
        <input
          type="date"
          value={joined}
          onChange={(e) => setJoined(e.target.value)}
        />

        <label>Last Active</label>
        <input
          type="date"
          value={lastActive}
          onChange={(e) => setLastActive(e.target.value)}
        />

        <input
          type="text"
          placeholder="Photo URL"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
        />

        <button type="submit">Add Member</button>
      </form>
    </div>
  );
}

export default AddMember;
