import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function FormUser() {
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
      setMessage("Your name looks good!");
    } else {
      setIsValid(false);
      setMessage("Please enter a valid name!");
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
    navigate("/");
  }

  return (
    <>
      <div className="flex items-center justify-center mt-10">
        <div className="w-3/4 p-6 rounded-lg shadow-lg bg-white">
          <div className="mb-6">
            <Link to="/">
              ‹ back to <strong className="underline">user list</strong>
            </Link>
          </div>
          <form onSubmit={handleSubmit} action="#">
            <div className="form-group mb-6">
              <label
                htmlFor="name"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Name:
              </label>
              <input
                id="name"
                type="string"
                autoComplete="on"
                autoFocus="on"
                onChange={validateName}
                placeholder="Write your name"
                name="name"
                required="required"
                value={newuser.name}
                className="form-control
              block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
              <label
                htmlFor="email"
                className="form-label inline-block my-2 text-gray-700"
              >
                Email:
              </label>
              <input
                id="email"
                type="email"
                placeholder="example@example.com"
                onChange={validateEmail}
                autoComplete="on"
                name="email"
                required="required"
                value={newuser.email}
                className="form-control
              block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
              <div className="col-span-6">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status:
                </label>
                <select
                  id="status"
                  type="boolean"
                  onChange={handleChange}
                  name="status"
                  value={newuser.status}
                  required="required"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="active" selected>
                    Active
                  </option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="my-4">
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="flex flex-col justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Send User
                </button>
              </div>
              <div className={`message ${isValid ? "success" : "error"}`}>
                {message}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
