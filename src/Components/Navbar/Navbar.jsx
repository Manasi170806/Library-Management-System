import React from "react";
import { NavLink } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { PiBooksLight } from "react-icons/pi";
import { TiGroup } from "react-icons/ti";
import { FiLogIn } from "react-icons/fi";
import { GiBookshelf } from "react-icons/gi";
import "./Navbar.css";

const NavLinkData = [
  { id: 1, path: "/", icon: <GoHome />, text: "Home" },
  { id: 2, path: "/books", icon: <PiBooksLight />, text: "books" },
  { id: 3, path: "/members", icon: <TiGroup />, text: "members" },
  { id: 4, path: "/logIn", icon: <FiLogIn />, text: "LogIn" },
  { id: 5, path: "/Issue_Return", icon: <GiBookshelf />, text: "Issue/Return" }
];

const Navbar = () => {
  return (
    <div className="navbar">
      <h1>Logo.</h1>

      <div className="nav-data">
        {NavLinkData.map((el, i) => (
          <nav key={el.id}>
            <NavLink
              to={el.path}
              className={({ isActive }) =>
                isActive ? "navlink active" : "navlink"
              }
            >
              <div className="nav-details">
                {el.icon}
                <span>{el.text}</span>
              </div>
            </NavLink>
          </nav>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
