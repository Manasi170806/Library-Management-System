import React from "react";
import "../DashBoard/DashBoard.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectBooks,
  selectIssued,
  selectReserved,
  selectFines,
  fetchBooks,
  issuedBooks,
  reservedBooks,
  fines,
} from "../../features/booksSlice";

function DashBoard() {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const issued = useSelector(selectIssued);
  const reserved = useSelector(selectReserved);
  const bookFines = useSelector(selectFines);

  const pendingFinesOfBook =
    bookFines?.filter((fine) => fine.paymentStatus === "Unpaid")?.length || 0;

  const popularBooks = books?.filter((book) => book.isPopular);

  const overView = [
    { name: "Total Books", value: books.length },
    { name: "Issued Books", value: issued.length },
    { name: "Reserved Books", value: reserved.length },
    { name: "Pending Fines", value: pendingFinesOfBook },
  ];
  // console.log({ books, issued, reserved, bookFines  // To check whether count is fetch or not});

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(issuedBooks());
    dispatch(reservedBooks());
    dispatch(fines());
  }, [dispatch]);
  return (
    <div className="dashBoard">
      {/* all Components wraped here */}

      <div className="overview-container">
        {overView.map((el, i) => (
          <div className="overview-section" key={i}>
            <h3>{el.value}</h3>
            <p>{el.name}</p>
          </div>
        ))}
      </div>

      {/* Popular books picks */}
      <h2 style={{ fontSize: "30px", margin: "20px" }}>Popular Picks !</h2>
      <div className="popular-books">
        {popularBooks.map((el, i) => (
          <div className="book-card" key={i}>
            <div className="book-img">
              <img src={el.cover} alt="" />
            </div>
            <h2>{el.title}</h2>
            <p>{el.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashBoard;
