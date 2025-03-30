import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import AddEmp from "../AddEmp/AddEmp";
import Emplist from "../EmpList/Emplist";
import UpdateEmp from "../UpdateEmp/UpdateEmp";
import User from "../User/User";

const Routers = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/addemp" element={<AddEmp />} />
        <Route path="/emplist" element={<Emplist />} />
        <Route path="/update/:id" element={<UpdateEmp />} />
      </Routes>
    </Router>
  );
};

export default Routers;
