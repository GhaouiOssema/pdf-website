import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import FormSend from "./components/FormSend";
import PdfFile from "./components/PdfFile";
import PdfDetails from "./components/PdfDetails";
import PdfView from "./components/PdfView";
import Sites from "./components/Sites";
import Home from "./components/home/Home";
import Profile from "./components/Profile";
import SideBar from "./components/SideBar";
import Plan from "./components/Plan";
import FicheTechnique from "./components/FicheTechnique";
import DoeFiles from "./components/DoeFiles";
import ForgotPassword from "./components/login/ForgotPassword";
import ResetPasswordForm from "./components/login/ResetPasswordForm";
import PublicPdfView from "./components/public/PublicPdfView";
import PublicPlan from "./components/public/PublicPlan";
import PublicFicheTechnique from "./components/public/PublicFicheTechnique";
import PublicDoeFiles from "./components/public/PublicDoeFiles";
import PublicView from "./components/public/PublicView";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

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

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex ">
      {isAuthenticated && (
        <SideBar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          sidebarRef={sidebarRef}
          toggleSidebar={toggleSidebar}
        />
      )}

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={isAuthenticated ? null : <Home />} />
          <Route path="/seconnecter" element={<Login />} />
          <Route path="/inscription" element={<Register />} />
          <Route path="/seconnecter/oublier" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPasswordForm />} />
        </Routes>

        <div className=" bg-gray-100">
          {isAuthenticated && (
            <div className="md:hidden">
              <TopBar
                toggleSidebar={toggleSidebar}
                isSidebarOpen={isSidebarOpen}
              />
            </div>
          )}
          <Routes>
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
            {!isAuthenticated && (
              <>
                <Route
                  path="/publique/:site/:dossier/pdf/:id"
                  element={<PublicPdfView />}
                />
                <Route
                  path="/publique/:site/:dossier/plan/:fichier"
                  element={<PublicPlan />}
                />
                <Route
                  path="/publique/:site/:dossier/fiche_technique/:pdfid"
                  element={<PublicFicheTechnique />}
                />
                <Route
                  path="/publique/:site/:dossier/pdf/detail/doe/:id"
                  element={<PublicDoeFiles />}
                />
                <Route
                  path="/publique/:site/:dossier/pdf/view/:id"
                  element={<PublicView />}
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
