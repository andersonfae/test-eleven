import { useState, useEffect } from "react";
import { Cards } from "../../components/Cards";
import axios, { Axios } from "axios";

export function Users() {
  const [user, setUsers] = useState([]);
  console.log(user);

  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(
          "https://gorest.co.in/public/v2/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  }, []);

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  return (
    <>
      <div classname="">
        <input name="search" placeholder="Find User" onChange={handleSearch} />
        {user
          .filter((currentElement) => {
            return currentElement.name
              .toLowerCase()
              .includes(search.toLowerCase());
          })
          .map((currentElement, key) => {
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
