import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Box, CircularProgress } from "@mui/material";
import { green } from "@mui/material/colors";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";

const ResetPasswordForm = () => {
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const expiration = searchParams.get("expiration");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isResetSuccess, setIsResetSuccess] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [linkExpired, setLinkExpired] = useState(false);

  useEffect(() => {
    const expirationTime = parseInt(expiration);
    const currentTime = Date.now();

    if (currentTime > expirationTime) {
      setLinkExpired(true);
    }
  }, [expiration]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    try {
      const expiration = Date.now() + 600000; // 10 minutes in milliseconds
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_API_URL}/reset-password`,
        {
          email,
          password,
          expiration,
        }
      );

      if (res.status === 200) {
        setIsResetSuccess(true);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert(
        "An error occurred while resetting the password. Please try again."
      );
    }
  };

  if (linkExpired) {
    return (
      <div className="pt-20">
        <div className="text-red-500 text-4xl mb-4 flex justify-center items-center">
          <i className="fa-solid fa-triangle-exclamation"></i>
        </div>
        <p className="text-xl font-semibold text-red-500 mb-4 text-center">
          link expired
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {isResetSuccess && loading === false ? (
        <div className="mt-20">
          <div className="text-green-500 text-4xl mb-4 flex justify-center items-center">
            <i className="fa-solid fa-circle-check"></i>
          </div>
          <p className="text-xl font-semibold text-green-500 mb-4 text-center">
            Your password has been successfully reset.
          </p>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button variant="contained">
              <Link to="/seconnecter">se connecter</Link>
            </Button>
          </Stack>
        </div>
      ) : loading === true ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <form
          onSubmit={handleResetPassword}
          className="pt-40 md:w-[50%] lg:w-[40%]"
        >
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPasswordForm;
