import React, { useState } from "react";
import styles from "./Login.module.css"; // Import the CSS module
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
// import axios from "axios";
// import Cookies from "js-cookie"; // Import js-cookie
// import { useNavigate, useRoutes } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(""); // Track email input
  const [password, setPassword] = useState(""); // Track password input
  const [errorMessage, setErrorMessage] = useState(""); // Track error message

  const { login } = useLogin();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password); // Call login function
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <img
          src="/public/image/WizaEvove.png"
          alt="Wiza Logo"
          className={styles.loginLogo}
        />
        <h2 className={styles.welcomeTitle}>Bonjour Leslie Alexander</h2>
        <p className={styles.welcomeSubtitle}>Content de te revoir!</p>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <span className={styles.inputIconLeft}>
              <EmailOutlinedIcon />
            </span>
            <input
              type="email"
              className={styles.formInput}
              placeholder="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email on input change
            />
          </div>

          <div className={styles.inputGroup}>
            <span className={styles.inputIconLeft}>
              <LockOutlinedIcon />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              className={styles.formInput}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password on input change
            />
            <span
              className={styles.inputIconRight}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <VisibilityOffOutlinedIcon />
              ) : (
                <VisibilityOutlinedIcon />
              )}
            </span>
          </div>

          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}

          <button type="submit" className={styles.loginButton}>
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
