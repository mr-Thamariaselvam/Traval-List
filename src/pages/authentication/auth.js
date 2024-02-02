import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import { validateInput } from "../../utils/validation";
import usersData from "../../data/user.json";
import { strings } from "../../i18n";
function Auth({ onLogin }) {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [username, email, password, confirmPassword, phoneNumber, isSignup]);

  const simulateAuthentication = (e) => {
    e.preventDefault();
    const users = [...usersData];

    if (isSignup) {
      console.log("Simulating sign-up...");

      const validationError = validateInput(email, password, phoneNumber);
      if (validationError) {
        setError(validationError);
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      const newUser = { username, email, password, phoneNumber };
      users.push(newUser);

      // Redirect to login after successful sign-up
      setIsSignup(false);
    } else {
      const user = users.find((user) => user.username === username);

      if (user && user.password === password) {
        console.log("Login successful");
        // Redirect to home page after successful login
        navigate("/home");
        return;
      } else {
        setError("Invalid username or password");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
      setError("Please enter all required fields.");
      return;
    }

    if (isSignup) {
      const validationError = validateInput(email, password, phoneNumber);
      if (validationError) {
        setError(validationError);
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    simulateAuthentication(e);
    onLogin();

    // Reset form fields after successful login or sign-up
    if (isSignup) {
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPhoneNumber("");
    }
  };

  return (
    <div className="auth-container">
      <div className="header">
        {isSignup ? strings("SignUp") : strings("LogIn")}
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <label htmlFor="username" className="form-label">
          {strings("Username")}
        </label>
        <input
          type="text"
          id="username"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
        />
        <label htmlFor="password" className="form-label">
          {strings("Password")}
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password :Ts@2002"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />

        {isSignup && (
          <div className="auth-form">
            <label htmlFor="confirmPassword" className="form-label">
              {strings("Confirm Password")}
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password:Ts@2002"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-input"
            />
            <label htmlFor="email" className="form-label">
              {strings("Email")}
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email :example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
            <label htmlFor="phoneNumber" className="form-label">
              {strings("Phone Number")}
            </label>
            <input
              type="text"
              id="phoneNumber"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="form-input"
            />
          </div>
        )}

        <button type="submit" className="submit-btn">
          {isSignup ? strings("SignUp") : strings("LogIn")}
        </button>

        {error && <p className="error-msg">{error}</p>}
      </form>

      <div className="toggle-auth">
        <button
          onClick={() => setIsSignup((prev) => !prev)}
          className="toggle-btn"
        >
          {isSignup
            ? strings("Already have an account? Log In")
            : strings("Don't have an account? Sign Up")}
        </button>
      </div>
    </div>
  );
}

export default Auth;
