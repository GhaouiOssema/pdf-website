import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const VerificationPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tokenFromUrl = searchParams.get("token");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_API_URL}/verify-email`,
          { tokenFromUrl }
        );

        if (response.status === 201) {
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    verifyEmail();
  }, [tokenFromUrl]);

  return (
    <>
      {loading ? (
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
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
          <div className="max-w-xl px-5 text-center">
            <h2 className="mb-2 text-[42px] font-bold text-zinc-800">
              Compte email vérifié avec succès
            </h2>
            <p className="mb-2 text-lg text-zinc-500">
              Nous sommes ravis que vous soyez avec nous ! Nous avons vérifié
              votre adresse e-mail avec succès à l'adresse{" "}
              <span className="font-medium text-indigo-500">
                mail@votredomaine.com
              </span>
              .
            </p>

            <Link
              to="/seconnecter"
              className="mt-3 inline-block w-96 rounded bg-blue-700 px-5 py-3 font-medium text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700"
            >
              Se connecter →
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default VerificationPage;
