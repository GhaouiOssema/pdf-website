import React, { useEffect, useState } from "react";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import { useParams } from "react-router-dom";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import { Box, CircularProgress, Typography } from "@mui/material";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";

const PublicFicheTechnique = () => {
  const { pdfid } = useParams();

  const [pdfLoaded, setPdfLoaded] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pdfData, setPdfData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          }/public/site/folder/pdf/details/fiche/${pdfid}`,
          { responseType: "arraybuffer" }
        );

        const blob = new Blob([response.data], { type: "application/pdf" });

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
    <div className="flex justify-center items-center">
      {error && !pdfData ? (
        <div className="h-screen flex justify-center items-center opacity-20">
          <div className="flex flex-col justify-center items-center">
            <DoNotDisturbIcon
              sx={{
                height: 250,
                width: 250,
                opacity: "100%",
                color: "black",
              }}
            />
            <p className="w-full font-sans font-bold text-xl text-center break-words">
              Aucun fiche technique n'est lié à cet équipement.
            </p>
          </div>
        </div>
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

export default PublicFicheTechnique;
