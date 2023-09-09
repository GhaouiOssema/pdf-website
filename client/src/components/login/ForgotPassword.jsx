import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const Navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_API_URL}/forgot-password`,
        {
          email,
          emailType: "reset",
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
          {isEmailSent ? (
            <div>
              <div className="text-green-500 text-4xl mb-4 flex justify-center items-center">
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <p className="text-sm md:text-md lg:text-lg xl:text-xl font-sans font-semibold text-green-500 mb-4 text-center">
                Un e-mail contenant des instructions pour réinitialiser votre
                mot de passe a été envoyé à votre adresse e-mail.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex justify-center items-center text-center mb-4">
                <h6 className="font-sans font-semibold text-[#125ba3] text-xl">
                  Mot de passe oublié
                </h6>
                <i
                  class="ml-5 fa-solid fa-house text-[#125ba3] cursor-pointer"
                  onClick={() => Navigate("/")}
                ></i>
              </div>
              <form className="space-y-5" onSubmit={handleResetPassword}>
                <div>
                  <input
                    type="text"
                    className="text-black w-full px-4 py-2 border-[#125ba3] border-2 rounded-lg font-sans focus:outline-none  bg-white bg-opacity-90"
                    id="exampleInput90"
                    placeholder="Entrez votre adresse e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 mt-10 bg-[#125ba3] rounded-lg font-sans font-medium text-white text-sm md:text-md lg:text-lg xl:text-xl focus:outline-none hover:shadow-none"
                >
                  Envoyer un e-mail de réinitialisation
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
