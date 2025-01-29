import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.scss";
import apiRequest from "../../components/Lib/apiRequest.js";
import { AuthContext } from "../../context/AuthContext.js";

function Login() {
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {updateUser}=useContext(AuthContext);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    setErr("");
    e.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      // Sending a POST request to login the user
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });
      updateUser(res.data);

      // Redirect the user after a successful login
      navigate("/"); // Example path, change as needed
    } catch (err) {
      console.error(err); // Log the error for debugging
      setErr(err.response?.data?.message || "Login failed"); // Set error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name="username"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
          />
          <button disabled={isLoading}>Login</button>
          {err && <span>{err}</span>}
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="Background" />
      </div>
    </div>
  );
}

export default Login;