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
    <div>
      {/* all Components wraped here */}

      <div className="overview-container">
        {overView.map((el, i) => (
          <div className="overview-section" key={i}>
            <h2>{el.value}</h2>
            <p>{el.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashBoard;
