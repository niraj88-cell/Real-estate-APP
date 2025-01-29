import "./Register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import apiRequest from "../../components/Lib/apiRequest.js";

function Register() {
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setIsLoading(true)
    setErr("");
    e.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      // Sending a POST request to register the user
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });
      console.log(res.data); // Handle the response as needed

      // Optionally, redirect the user after a successful registration
      navigate("/login");
    } catch (err) {
      setErr(err.response.data.message); // Set error message
  // Log the error for debugging
    }finally{
        setIsLoading(false);
    }
  };

  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          {err && <p className="error">{err}</p>} {/* Display error message */}
          <input name="username" type="text" placeholder="Username" required />
          <input name="email" type="email" placeholder="Email" required />
          <input name="password" type="password" placeholder="Password" required />
          <button type="submit" disabled={isLoading}>Register</button>
         {err && <span>{err}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="Background" />
      </div>
    </div>
  );
}

export default Register;