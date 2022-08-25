import { useState, useEffect } from "react";
import { Cards } from "../../components/Cards";
import axios, { Axios } from "axios";

export function Users() {
  const [users, setUsers] = useState([]);

  const [filteredUsers, setFilteredUsers] = useState(users);

  const [search, setSearch] = useState("");

  const [checkStatus, setCheckStatus] = useState("all");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const userList = JSON.parse(localStorage.getItem("userData"));
        if (userList) {
          setUsers(userList);
        } else {
          const response = await axios.get(
            "https://gorest.co.in/public/v2/users"
          );
          setUsers(response.data);
          localStorage.setItem("userData", JSON.stringify(response.data));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users, setUsers]);

  useEffect(() => {
    const usersByName = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    const usersByActive = usersByName.filter((user) => {
      if (checkStatus === "all") return true;
      return user.status === checkStatus;
    });
    setFilteredUsers(usersByActive);
  }, [setSearch, search, checkStatus, setCheckStatus]);

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  function handleActive(e) {
    setCheckStatus(e.target.value);
    console.log(e.target.value);
  }

  return (
    <>
      <div classname="">
        <input name="search" placeholder="Find User" onChange={handleSearch} />
        <input
          type="radio"
          checked={checkStatus === "active"}
          value="active"
          id="selectActive"
          onChange={handleActive}
        />
        <label for="selectActive">Active</label>
        <input
          type="radio"
          value="inactive"
          checked={checkStatus === "inactive"}
          id="selectActive"
          onChange={handleActive}
        />
        <label for="selectActive">Inactive</label>
        <input
          type="radio"
          value="all"
          checked={checkStatus === "all"}
          id="selectActive"
          onChange={handleActive}
        />
        <label for="selectActive">All Users</label>

        {filteredUsers.map((currentElement, key) => {
          return (
            <div key={key}>
              <Cards
                name={currentElement.name}
                email={currentElement.email}
                status={currentElement.status}
                id={currentElement.id}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
