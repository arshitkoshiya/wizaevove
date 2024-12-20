// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./login/login";
import HomePage from "./pages/HomePage"; // Create a new component for the second page

function App() {
  return (
    <Router>
      {/* <nav>
        <Link to="/login" style={{ marginRight: "10px" }}>
          Go to Login
        </Link>
        <Link to="/home">Go to Home</Link>
      </nav> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
