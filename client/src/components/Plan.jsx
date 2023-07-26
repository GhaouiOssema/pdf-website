import axios from "axios";
import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useParams } from "react-router-dom";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Plan = () => {
  const { fichier } = useParams();
  console.log(fichier);

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
          }/site/folder/pdf/details/${fichier}`
        );
        setPdfData(response.data.pdf.filename);
      } catch (error) {
        console.log("Error retrieving PDF data:", error);
      }
    };
    getPdfData();
  }, [fichier]);

  let filename, counter, encryptedDate, extension;

  if (pdfData) {
    const parts = pdfData.split("-");
    filename = parts[0];
    counter = parts[1];
    encryptedDate = parts[2].split(".")[0];
    extension = parts[2].split(".")[1];
  }

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
    <div className="bg-gray-100 boor flex justify-center items-center ">
      {pdfData ? (
        <Document
          file={`${
            import.meta.env.VITE_SERVER_API_URL
          }/uploads/pdfFiles/${filename}-${counter}-${encryptedDate}.${extension}`}
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
      ) : null}
    </div>
  );
};

export default Plan;
