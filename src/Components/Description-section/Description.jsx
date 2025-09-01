import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectBooks, fetchBooks } from "../../features/booksSlice";
import "./description.css";

function Description() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);

  useEffect(() => {
    if (!books.length) {
      dispatch(fetchBooks());
    }
  }, [books.length, dispatch]);

  const book = books.find((el, i) => String(el.id) === id);

  if (!book) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      <h2>{book.title}</h2>
      <div className="description-card">
        <img src={book.cover} alt="" />
        <div className="description-details">
          <div className="title-sec">
            <h2>{book.title}</h2>
            <button
              className={`availability ${
                book.isAvailable ? "available" : "unavailable"
              }`}
            >
              {book.isAvailable ? "Available" : "Not Available"}
            </button>
          </div>

          <span>{book.author}</span>
          <p>{book.description}</p>
          <h4>$ {book.rent}</h4>

          <div className="purchase-btns">
            <button className="cart">Add to cart</button>
            <button className="buyNow">Buy Now</button>
          </div>
        </div>
      </div>
      {/* Book details - title, author, rate,price,gener,available */}
      <div className="book-details">
        <table>
          <thead>
            <tr>
              <th>Book Details</th>
              <th>About the Book</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Title</td>
              <td>{book.title}</td>
            </tr>
            <tr>
              <td>Author</td>
              <td>{book.author}</td>
            </tr>
            <tr>
              <td>Rent</td>
              <td>$ {book.rent}</td>
            </tr>
            <tr>
              <td>Popularity</td>
              <td>{book.rate}/5</td>
            </tr>
            <tr>
              <td>Gener</td>
              <td>{book.genre}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Description;
