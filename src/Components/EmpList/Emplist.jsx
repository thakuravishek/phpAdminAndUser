import React, { useEffect, useState } from "react";
import "./Emplist.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Emplist = () => {
  const [userData, setUserData] = useState([]);
  const [message, setMessage] = useState("");
  const getUserData = async () => {
    const reqData = await fetch("http://localhost/php/api/user.php");
    const resData = await reqData.json();
    // console.log(Array.isArray(resData));
    setUserData(resData);
  };
  useEffect(() => {
    getUserData();
  }, []);
  const handleDelete = async (id) => {
    const res = await axios.delete("http://localhost/php/api/user.php/" + id);
    setMessage(res.data.success);
    getUserData();
  };
  return (
    <div className="listView">
      <p className="text-dander">{message}</p>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">SL No</th>
            <th scope="col">User Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Gender</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((uData, index) => (
            // console.log(uData);
            <tr key={index}>
              <td>{uData.id}</td>
              <td>{uData.username}</td>
              <td>{uData.useremail}</td>
              <td>{uData.phoneno}</td>
              <td>{uData.gender}</td>
              <td>
                <Link
                  to={"/update/" + uData.id}
                  className="btn btn-success mx-2"
                >
                  Update
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(uData.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Emplist;
