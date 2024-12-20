import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Define TypeScript types for login response
interface LoginResponse {
  ResultData: any;
  message: string;
  token: string;
}

// Define TypeScript types for the login request body
interface LoginRequest {
  userName: string;
  password: string;
}

const useLogin = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (userName: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      // Send login request using Axios
      const response = await axios.post<LoginResponse>(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/login/webAppLogin`,
        { userName, password }
      );

      const { token } = response.data.ResultData[0];
      if (token) {
        // Save token in cookies with an expiration time
        Cookies.set("authToken", token, { expires: 1 });
        // Redirect to home page after successful login
        navigate("/home"); // Navigate to the home page
      } else {
        setError("Login failed, no token received.");
      }
    } catch (err: any) {
      setError(err.message); // Set error message if the request fails
    } finally {
      setLoading(false); // Set loading to false after request completion
    }
  };

  return { login, error, loading };
};

export default useLogin;
