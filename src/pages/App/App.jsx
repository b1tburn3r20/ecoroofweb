import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import "./App.css";
import AuthPage from "../AuthPage/AuthPage";
import NavBar from "../../components/NavBar/NavBar";
import HomePage from "../HomePage/HomePage"; // Assuming you have a HomePage component

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      {user && <NavBar user={user} setUser={setUser} />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        {!user && (
          <Route path="/auth" element={<AuthPage setUser={setUser} />} />
        )}
      </Routes>
    </main>
  );
}
