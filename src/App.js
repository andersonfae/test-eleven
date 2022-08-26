import "./App.css";
import { Routes, Route } from "react-router-dom";
import { FormUser } from "./pages/FormUser";
import { Users } from "./pages/Users";

function App() {
  return (
    <>
      <Routes>
        <Route path="/create-user" element={<FormUser />} />
        <Route path="/" element={<Users />} />
      </Routes>
    </>
  );
}

export default App;
