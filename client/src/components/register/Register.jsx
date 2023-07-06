import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://qr-server-6xmb.onrender.com/inscription",
        {
          userName,
          email,
          password,
          userRole,
        }
      );

      navigate("/seconnecter");
    } catch (err) {
      setError("Registration failed");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="w-1/3 p-6 bg-white rounded shadow-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label
            htmlFor="userName"
            className="block text-gray-700 font-bold mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="userName"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
            placeholder="Enter your username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
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
        <div className="mb-6">
          <label
            htmlFor="userRole"
            className="block text-gray-700 font-bold mb-2"
          >
            User Role
          </label>
          <input
            type="text"
            id="userRole"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
            placeholder="Enter your user role"
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
