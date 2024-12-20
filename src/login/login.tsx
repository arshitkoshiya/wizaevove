import React, { useState } from "react";
import "./Login.css";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(""); // Track email input
  const [password, setPassword] = useState(""); // Track password input
  const [errorMessage, setErrorMessage] = useState(""); // Track error message

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Validate credentials using environment variables
    if (
      email === process.env.REACT_APP_EMAIL &&
      password === process.env.REACT_APP_PASSWORD
    ) {
      setErrorMessage("");
      alert("Login successful!");
      // You can redirect the user here or handle success logic
    } else {
      setErrorMessage("Incorrect email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img
          src="logo-placeholder.png"
          alt="Wiza Logo"
          className="login-logo"
        />
        <h2 className="welcome-title">Bonjour Leslie Alexander</h2>
        <p className="welcome-subtitle">Content de te revoir!</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="input-icon input-icon-left">
              <EmailOutlinedIcon />
            </span>
            <input
              type="email"
              className="form-input"
              placeholder="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email on input change
            />
          </div>

          <div className="input-group">
            <span className="input-icon input-icon-left">
              <LockOutlinedIcon />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              className="form-input"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password on input change
            />
            <span
              className="input-icon input-icon-right"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <VisibilityOffOutlinedIcon />
              ) : (
                <VisibilityOutlinedIcon />
              )}
            </span>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="login-button">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
