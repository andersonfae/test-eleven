// import { Link } from "rect-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";

export function Homepage() {
  const [newuser, setNewUsers] = useState({
    name: "",
    email: "",
    status: "",
  });

  // const regexEmail = RegExp(^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$)

  return (
    <>
      <Navbar />
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" type="string" />
          <label htmlFor="email">Email:</label>
          <input id="email" type="string" />
          <label htmlFor="status">Status:</label>
          <input id="status" type="boolean" />
        </div>
      </form>
    </>
  );
}
