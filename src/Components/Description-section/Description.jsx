import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectBooks } from "../../features/booksSlice";
import "./description.css";

function Description() {
  const { id } = useParams();
  const books = useSelector(selectBooks);

  const book = books.find((el, i) => String(el.id) === id);
  return (
    <div>
      <h2>{book.title}</h2>

      <div className="description-card">
        <img src={book.cover} alt="" />
        <div className="description-details">
          <h2>{book.title}</h2>
          <p>{book.author}</p>
          <p>{book.description}</p>
          <h4>${book.rent}</h4>
          <button>Add to cart</button>
        </div>
        {/* book is available or not */}
      </div>

      {/* Book details - title, author, rate,price,gener,available */}
      <div className="book-details"></div>
    </div>
  );
}

export default Description;
