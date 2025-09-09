import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./Components/DashBoard/DashBoard";
import BookList from "./Components/BookList/BookList";
import MemberList from "./Components/Members/Members";
import Description from "./Components/Description-section/Description";
import Login from "./Components/Auth/Login";
import AddBooks from "./Components/AddBooks/AddBooks";
import AddMembers from "./Components/AddMembers/AddMembers";
import PrivateRoute from "./Components/Auth/PrivateRoute";
import EditBookDetails from "./Components/BookList/EditBookDetails";
import Issue_Return from "./Components/Issue&Return/Issue&Return";
import MemberDescription from "./Components/Members/Memberdescription";

function App() {
  return (
    <div className="main-container">
      {/* Navbar Section */}
      <div className="navbar-section">
        <Navbar />
      </div>
      {/* <div>
      <finesList />
    </div> */}

      {/* Routes Section */}
      <div className="routes-container">
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route
            path="/books"
            element={
              <PrivateRoute>
                <BookList />
              </PrivateRoute>
            }
          />
          <Route
            path="/members"
            element={
              <PrivateRoute>
                <MemberList />
              </PrivateRoute>
            }
          />
          <Route path="/logIn" element={<Login />} />
          <Route path="/AddBooks" element={<AddBooks />} />
          <Route path="/AddMembers" element={<AddMembers />} />
          <Route path="/description/:id" element={<Description />} />
          <Route path="/EditBook/:id" element={<EditBookDetails />} />
          <Route path="/Issue_Return" element={<Issue_Return />} />
          {/* <Route path="/fines" element={<Fineslist />} /> */}
          {/* <Route path="/members" element={<MemberList />} /> */}
          <Route path="/member/:id" element={<MemberDescription />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
