import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./Components/DashBoard/DashBoard";
import BookList from "./Components/BookList/BookList";
import MemberList from "./Components/Members/Members";
import Description from "./Components/Description-section/Description";
import Login from "./Components/Auth/Login";
import SignUp from "./Components/Auth/SignUp";
import AddBooks from "./Components/AddBooks/AddBooks";
import AddMembers from "./Components/AddMembers/AddMembers";

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
          <Route path="/logIn" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/AddBooks" element={<AddBooks />} />
          <Route path="/AddMembers" element={<AddMembers />} />
          <Route path="/description/:id" element={<Description />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
