import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { Users } from "./pages/Users";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </>
  );
}

export default App;
