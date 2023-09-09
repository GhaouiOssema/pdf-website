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
      alert("Les mots de passe ne correspondent pas. Veuillez réessayer.");
      return;
    }

    try {
      const expiration = Date.now() + 600000;
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
          Le lien a expiré
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center h-screen bg-white">
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div className="relative grid place-items-center mx-2 my-20 sm:my-auto ">
        <div className="bg-gray-100 w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 rounded-lg shadow-md lg:shadow-lg">
          {isResetSuccess && loading === false ? (
            <div>
              <div className="text-green-500 text-4xl mb-4 flex justify-center items-center">
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <p className="text-lg font-sans font-semibold text-green-500 mb-4 text-center">
                Votre mot de passe a été réinitialisé avec succès.
              </p>

              <Link to="/seconnecter" className="font-sans">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#125ba3] rounded-lg font-sans font-medium text-white focus:outline-none hover:shadow-none"
                >
                  se connecter
                </button>
              </Link>
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
            <div>
              <form className="space-y-5" onSubmit={handleResetPassword}>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Entrez votre nouveau mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Confirmer le nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Confirmez le nouveau mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 mt-10 bg-[#125ba3] rounded-lg font-sans font-medium text-white focus:outline-none hover:shadow-none"
                >
                  réinitialiser le mot de passe
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
