import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    <div className="mx-auto flex flex-col flex-wrap bg-[#f3f3ff]">
      <Navbar isAuthenticated={isAuthenticated} />
      <div className="container mt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/seconnecter" element={<Login />} />
          <Route path="/inscription" element={<Register />} />
          {isAuthenticated && (
            <>
              <Route path="/telecharger" element={<FormSend />} />
              <Route path="/:site/:dossier/pdf" element={<PdfFile />} />
              <Route path="/pdf/:id" element={<PdfDetails />} />
              <Route path="/pdf/view/:id" element={<PdfView />} />
              <Route path="/mesites" element={<Sites />} />
            </>
          )}
        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
