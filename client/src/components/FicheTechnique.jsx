import React, { useEffect, useState } from "react";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import { useParams } from "react-router-dom";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import { Box, CircularProgress } from "@mui/material";

const FicheTechnique = () => {
  const { pdfid } = useParams();

  const [pdfLoaded, setPdfLoaded] = useState(false);
  const [numPages, setNumPages] = useState(null);

  const handlePdfLoadSuccess = ({ numPages }) => {
    setPdfLoaded(true);
    setNumPages(numPages);
  };

  const [pdfData, setPdfData] = useState(null);

  useEffect(() => {
    const getPdfData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_SERVER_API_URL
          }/site/folder/pdf/details/${pdfid}`
        );
        setPdfData(response.data.pdf);
      } catch (error) {
        console.log("Error retrieving PDF data:", error);
      }
    };
    getPdfData();
  }, [pdfid]);
  console.log(pdfData);

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
      {pdfData ? (
        <Document
          file={`data:application/pdf;base64,${pdfData.fiche.data}`}
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
      ) : (
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
      )}
    </div>
  );
};

export default FicheTechnique;
