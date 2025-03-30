import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateEmp = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [formValue, setFormValue] = useState({
    username: "",
    useremail: "",
    phoneno: "",
    gender: "",
  });
  const [message, setMessage] = useState("");
  useEffect(() => {
    const userRowData = async () => {
      const getUserData = await fetch(
        "http://localhost/php/api/user.php/" + id
      );
      const resuserdata = await getUserData.json();
      console.log(resuserdata);
      setFormValue(resuserdata);
    };
    userRowData();
  }, []);
  const handleInput = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formValue);
    const formData = {
      id: id,
      username: formValue.username,
      useremail: formValue.email,
      phoneno: formValue.phoneno,
      gender: formValue.gender,
    };
    const res = await axios.put("http://localhost/php/api/user.php", formData);
    if (res.data.success) {
      setMessage(res.data.success);
      setTimeout(() => [navigate("/emplist")], 2000);
    }
  };
  return (
    <div className="heroSect">
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div className="formEle">
          <label htmlFor="">User Name</label>
          <input
            type="text"
            name="username"
            value={formValue.username}
            onChange={handleInput}
            id=""
          />
        </div>
        <div className="formEle">
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            value={formValue.email}
            onChange={handleInput}
            id=""
          />
        </div>
        <div className="formEle">
          <label htmlFor="">Phone Number</label>
          <input
            type="number"
            name="phoneno"
            value={formValue.phoneno}
            onChange={handleInput}
            id=""
          />
        </div>
        <div className="formEle">
          <label htmlFor="">Gender</label>
          <select
            name="gender"
            value={formValue.gender}
            onChange={handleInput}
            id=""
          >
            <option value="">--Select Gender--</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="formEle">
          <button name="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEmp;
