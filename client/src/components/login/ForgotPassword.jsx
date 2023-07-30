import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_API_URL}/forgot-password`,
        {
          email,
        }
      );
      setIsEmailSent(true);
    } catch (err) {
      console.error(err);
      alert(
        "An error occurred while sending the reset email. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col items-center">
      {isEmailSent ? (
        <div className="mt-20">
          <div className="text-green-500 text-4xl mb-4 flex justify-center items-center">
            <i className="fa-solid fa-circle-check"></i>
          </div>
          <p className="text-xl font-semibold text-green-500 mb-4 text-center">
            An email with instructions to reset your password has been sent to
            your email address.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleResetPassword}
          className="pt-40 md:w-[50%] lg:w-[40%]"
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Send Reset Email
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
