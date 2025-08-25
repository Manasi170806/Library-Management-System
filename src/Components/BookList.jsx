import React from "react";
import { useSelector } from "react-redux";
import { selectBooks } from "../features/booksSlice";

const BookList = () => {
  // Redux store se books le rahe hain
  const books = useSelector(selectBooks) || [];

  return (
    <div className="p-6">
      <table className="w-full border border-gray-200 shadow-lg rounded-xl overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Book Cover</th>
            <th className="p-3 text-left">Book Title</th>
            <th className="p-3 text-left">Author</th>
            <th className="p-3 text-left">Genre</th>
            <th className="p-3 text-left">Availability</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Details</th>
          </tr>
        </thead>

        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book.id} className="border-t hover:bg-gray-50 transition">
                {/* Book Cover */}
                <td className="p-3">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-16 h-20 object-cover rounded-md shadow-sm"
                  />
                </td>

                {/* Title */}
                <td className="p-3 font-semibold">{book.title}</td>

                {/* Author */}
                <td className="p-3">{book.author}</td>

                {/* Genre */}
                <td className="p-3">{book.genre}</td>

                {/* Availability (ISBN count) */}
                <td className="p-3">
                  {book.isbn?.length ?? 0}/{book.isbn?.length ?? 0}
                </td>

                {/* Status */}
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      book.isAvailable
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {book.isAvailable ? "Available" : "Not Available"}
                  </span>
                </td>

                {/* Details Button */}
                <td className="p-3">
                  <button className="text-blue-500 hover:underline">
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center p-6 text-gray-500">
                📚 No books available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
