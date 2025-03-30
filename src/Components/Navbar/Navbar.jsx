import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <h4>Employee Management</h4>
      </div>
      <div className="navMenu">
        <ul>
          <li>
            <NavLink to="/">User</NavLink>
          </li>
          <li>
            <NavLink to="addemp">Add Employee</NavLink>
          </li>
          <li>
            <NavLink to="emplist">Employee List</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
