// src/App.js

import React, { useState, useEffect } from "react";
import PdfFile from "./components/PdfFile";
import FormSend from "./components/FormSend";
import PdfDetails from "./components/PdfDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import PdfView from "./components/PdfView";

const App = () => {
  return (
      <div className="mx-auto flex flex-col flex-wrap">
		<Navbar />
        <div className="container mt-10">
          <Routes>
            <Route path="/" element={<FormSend />} />
            <Route path="/pdf" element={<PdfFile />} />
            <Route path="pdf/:id" element={<PdfDetails />} />
            <Route path="/pdf/view/:id" element={<PdfView />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
