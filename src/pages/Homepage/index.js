// import { Link } from "rect-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";

export function Homepage() {
  const navigate = useNavigate();
  const [newuser, setNewUsers] = useState({
    name: "",
    email: "",
    status: "",
  });

  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState("");

  const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const regexName = /^[a-zA-Z0-9_]{4,20}$/;

  const validateName = (event) => {
    setNewUsers({ ...newuser, [event.target.name]: event.target.value });
    const name = event.target.value;
    if (regexName.test(name)) {
      setIsValid(true);
      setMessage("Your user looks good!");
    } else {
      setIsValid(false);
      setMessage("Please enter a valid user!");
    }
    console.log(newuser);
  };

  const validateEmail = (event) => {
    setNewUsers({ ...newuser, [event.target.name]: event.target.value });
    const email = event.target.value;
    if (regexEmail.test(email)) {
      setIsValid(true);
      setMessage("Your email looks good!");
    } else {
      setIsValid(false);
      setMessage("Please enter a valid email!");
    }
    console.log(newuser);
  };

  function handleChange(e) {
    setNewUsers({ ...newuser, [e.target.name]: e.target.value });
    console.log(newuser);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const userList = JSON.parse(localStorage.getItem("userData"));
    if (userList) {
      if (!newuser.status) {
        newuser.status = "active";
      }
      userList.push(newuser);
      localStorage.setItem("userData", JSON.stringify(userList));
    }
    navigate("/users");
  }

  return (
    <>
      {/* <Navbar /> */}
      <div></div>
      <form onSubmit={handleSubmit} action="#">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="string"
            onChange={validateName}
            name="name"
            value={newuser.name}
          />
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            onChange={validateEmail}
            name="email"
            value={newuser.email}
          />

          <label htmlFor="status">Status:</label>
          <select
            id="status"
            type="boolean"
            onChange={handleChange}
            name="status"
            value={newuser.status}
            required="required"
          >
            <option value="active" selected>
              Active
            </option>
            <option value="inactive">Inactive</option>
          </select>
          <div>
            <button onClick={handleSubmit} type="submit">
              Send User
            </button>
          </div>
          <div className={`message ${isValid ? "success" : "error"}`}>
            {message}
          </div>
        </div>
      </form>
    </>
  );
}
