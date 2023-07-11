import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const isEmailValid = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailValid(email)) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      const response = await axios.post("https://qr-server-6xmb.onrender.com/seconnecter", {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);

      // Clear form fields
      setEmail("");
      setPassword("");

      // Show success message or perform other actions
      alert("Login successful!");

      await new Promise((resolve) => setTimeout(resolve, 1000));

      window.location.href = "/messites";
    } catch (err) {
      setError("Invalid credentials");
      console.error(err);
    }
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  return (
    <div class="h-screen flex">
      <div class="flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center">
        <div></div>
      </div>
      <div class="flex w-1/2 justify-center items-center bg-white">
        <form class="bg-white" onSubmit={handleSubmit}>
          <h1 class="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
          <p class="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
          <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              pattern={emailRegex}
            />
          </div>
          <div class="flex items-center border-2 py-2 px-3 rounded-2xl">
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            Login
          </button>
          <span class="text-sm ml-2 hover:text-blue-500 cursor-pointer">
            Forgot Password ?
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
