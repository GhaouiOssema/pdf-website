import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Navbar from "./components/NavBar";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import FormSend from "./components/FormSend";
import PdfFile from "./components/PdfFile";
import PdfDetails from "./components/PdfDetails";
import PdfView from "./components/PdfView";
import Sites from "./components/Sites";
import Home from "./components/home/Home";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import VerificationCode from "./components/VerificationCode";
import PublicPdfView from "./components/PublicPdfView";
import SideBar from "./components/SideBar";
import Plan from "./components/Plan";
import FicheTechnique from "./components/FicheTechnique";
import DoeFiles from "./components/DoeFiles";
import ForgotPassword from "./components/login/ForgotPassword";
import ResetPasswordForm from "./components/login/ResetPasswordForm";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
      } else {
        setIsAuthenticated(true);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <div className="flex ">
      {isAuthenticated && <SideBar isAuthenticated={isAuthenticated} />}

      <div className="flex-grow">
        {!isAuthenticated && <Navbar isAuthenticated={isAuthenticated} />}

        <div className="container bg-gray-100 h-full">
          <Routes>
            <Route path="/" element={isAuthenticated ? null : <Home />} />
            <Route path="/seconnecter" element={<Login />} />
            <Route path="/inscription" element={<Register />} />
            <Route path="/seconnecter/oublier" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPasswordForm />} />
            <Route
              path="/:site/:dossier/pdf/view/:id/verify"
              element={<VerificationCode />}
            />
            <Route
              path="/publique/:site/:dossier/pdf/view/:id"
              element={<PublicPdfView />}
            />

            {isAuthenticated && (
              <>
                <Route path="/telecharger" element={<FormSend />} />
                <Route path="/:site/:dossier/pdf" element={<PdfFile />} />
                <Route
                  path="/:site/:dossier/pdf/détails/:id"
                  element={<PdfDetails />}
                />
                <Route
                  path="/:site/:dossier/pdf/view/:id"
                  element={<PdfView />}
                />
                <Route path="/messites" element={<Sites />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/plan/:fichier" element={<Plan />} />
                <Route
                  path="/:site/:dossier/pdf/detail/fiche_technique/:pdfid"
                  element={<FicheTechnique />}
                />
                <Route
                  path="/:site/:dossier/pdf/detail/doe/:pdfid"
                  element={<DoeFiles />}
                />
              </>
            )}
          </Routes>
        </div>
        {!isAuthenticated && <Footer />}
      </div>
    </div>
  );
};

export default App;
