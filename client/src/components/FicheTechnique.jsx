import React, { useEffect, useState } from "react";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import { useParams } from "react-router-dom";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import { Box, CircularProgress, Typography } from "@mui/material";

const FicheTechnique = () => {
  const { pdfid } = useParams();

  const [pdfLoaded, setPdfLoaded] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pdfData, setPdfData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handlePdfLoadSuccess = ({ numPages }) => {
    setPdfLoaded(true);
    setNumPages(numPages);
  };

  useEffect(() => {
    const getPdfData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_SERVER_API_URL
          }/site/folder/pdf/details/fiche/${pdfid}`,
          { responseType: "arraybuffer", ...config } // Add 'responseType' to get the data as an array buffer
        );

        // Create a Blob from the array buffer
        const blob = new Blob([response.data], { type: "application/pdf" });

        // Convert the Blob to a base64 string
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Pdf = reader.result.split(",")[1];
          setPdfData(base64Pdf);
          setLoading(false);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        setError("Error retrieving PDF data.");
        setLoading(false);
        console.log("Error retrieving PDF data:", error);
      }
    };
    getPdfData();
  }, [pdfid]);

  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-gray-100 flex justify-center items-center ">
      {error && !pdfData ? (
        <Typography variant="h5" color="error">
          {error}
        </Typography>
      ) : loading ? (
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
        <Document
          file={`data:application/pdf;base64,${pdfData}`}
          className="flex flex-col items-center"
          onLoadSuccess={handlePdfLoadSuccess}
        >
          {pdfLoaded &&
            Array.from(new Array(numPages), (el, index) => (
              <Page
                key={index}
                pageNumber={index + 1}
                renderTextLayer={false}
                height={500}
                width={screenSize.width < 700 ? 349 : 1000}
                className="mt-1"
              />
            ))}
        </Document>
      )}
    </div>
  );
};

export default FicheTechnique;
