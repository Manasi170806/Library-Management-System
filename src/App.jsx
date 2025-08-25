import "./App.css";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./Components/DashBoard/DashBoard";
import BookList from "./Components/BookList/BookList";
import MemberList from "./Components/Members";

function App() {
  return (
    <div className="main-container">
      {/* Navbar Section */}
      <div className="navbar-section">
        <Navbar />
      </div>

      {/* Routes Section */}
      <div className="routes-container">
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/members" element={<MemberList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
