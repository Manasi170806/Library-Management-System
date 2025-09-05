
import React from "react";
import "./AddBooks.css";


export default function AddBooks() {
  return (
    <div className="addbook-container">
      <h2>Add New Book</h2>
      <form className="addbook-form">
        <label>
          Cover Image URL:
          <input type="text" name="cover" required />
        </label>
        <label>
          Title:
          <input type="text" name="title" required />
        </label>
        <label>
          Author:
          <input type="text" name="author" required />
        </label>
        <label>
          Genre:
          <input type="text" name="genre" required />
        </label>
        <label>
          Status:
          <input type="text" name="status" required />
        </label>
        <label>
          Available:
          <input type="text" name="available" required />
        </label>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

