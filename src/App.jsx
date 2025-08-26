import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./Components/DashBoard/DashBoard";
import BookList from "./Components/BookList/BookList";
import MemberList from "./Components/Members/Members";
import { useSelector } from "react-redux";
// import StartPage from "./Components/StartPage/StartPage";

function App() {
  // const page = useSelector((state) => state.navigation.page);
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

      {/* <div className="startPageRoutes">
        <Routes>
      <Route path="/" element={<StartPage />} />   {/* Default Page */}
      {/* <Route path="/dashboard" element={<DashBoard />} />
    // </Routes> */} 
    </div>
  );
}

export default App;
