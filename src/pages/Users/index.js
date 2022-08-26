import { useState, useEffect } from "react";
import { Cards } from "../../components/Cards";
import axios, { Axios } from "axios";
import { Link } from "react-router-dom";

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
      <div className="md:flex md:items-center md:justify-center">
        <div classname="md:w-3/4">
          <h1 className="text-4xl text-center py-5 font-bold font-sans">
            User List
          </h1>
          <div className="fixed z-50 inset-x-0 bottom-4 w-full md:w-auto md:left-auto">
            <Link
              to="/create-user"
              className="flex flex-col justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded mx-4 text-center md:rounded-full md:w-24 md:h-24 md:shadow-xl md:pt-2.5

            "
            >
              <span className="md:text-5xl md:leading-4">+</span>{" "}
              <span className="md:hidden">Create New User</span>
            </Link>
          </div>
          <form>
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
            >
              Search
            </label>
            <div class="relative mx-4 my-4">
              <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                name="search"
                placeholder="Find User"
                onChange={handleSearch}
                className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </form>
          <div className="flex justify-start mx-4 my-4">
            <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
              <input
                type="checkbox"
                value="all"
                checked={checkStatus === "all"}
                id="selectActive"
                onChange={handleActive}
                className="px-4 mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="selectActive"
                className="mr-4 py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                All Users
              </label>
            </div>
            <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
              <input
                type="checkbox"
                checked={checkStatus === "active"}
                value="active"
                id="selectActive"
                onChange={handleActive}
                className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="selectActive"
                className="mr-4 py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Active
              </label>
            </div>
            <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
              <input
                type="checkbox"
                value="inactive"
                checked={checkStatus === "inactive"}
                id="selectActive"
                onChange={handleActive}
                className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="selectActive"
                className="mr-4 py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Inactive
              </label>
            </div>
          </div>

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
      </div>
    </>
  );
}
