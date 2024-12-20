// App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie
import Login from "./login/login";
import HomePage from "./pages/HomePage"; // Create a new component for the second page

function App() {
  const token = Cookies.get("authToken");

  return (
    <Router>
      <Routes>
        {/* Redirect to home page if token exists */}
        <Route
          path="/login"
          element={token ? <Navigate to="/home" /> : <Login />}
        />

        {/* Home page route */}
        <Route
          path="/home"
          element={token ? <HomePage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
