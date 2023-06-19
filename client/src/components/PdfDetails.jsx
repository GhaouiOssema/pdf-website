import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { Link } from "react-router-dom";
import { IoIosArrowForward, IoIosWarning, IoIosDownload } from "react-icons/io";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Navbar from "./NavBar";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PdfDetails = () => {
  const { id } = useParams();
  const [pdfData, setPdfData] = useState(null);
  const [open, setOpen] = useState(false);
  const qrCodeRef = useRef(null);
  const navigate = useNavigate();
  const [alertMsg, setAlertMsg] = useState("");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    const getPdfData = async () => {
      try {
        const response = await axios.get(
          `https://pdf-server-809j.onrender.com/pdf/data/${id}`
        );
        setPdfData(response.data.pdf);
      } catch (error) {
        console.log("Error retrieving PDF data:", error);
      }
    };
    getPdfData();
  }, [id]);

  const handleDownloadQRCode = () => {
    html2canvas(qrCodeRef.current).then((canvas) => {
      const qrCodeDataURL = canvas.toDataURL();
      const downloadLink = document.createElement("a");
      downloadLink.href = qrCodeDataURL;
      downloadLink.download = "qr_code.png";
      downloadLink.click();
    });
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://pdf-server-809j.onrender.com/pdfs/${pdfData._id}`
      );
      if (response.status === 200) {
        setAlertMsg("success");
        handleClick();
      } else {
        console.error("Failed to delete PDF.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [pdfLoaded, setPdfLoaded] = useState(false);
  const handlePdfLoadSuccess = () => {
    setPdfLoaded(true);
  };

  useEffect(() => {
    if (alertMsg === "success") {
      const performActionAfterInterval = () => {
        navigate("/pdf");
      };
      const timeout = setTimeout(performActionAfterInterval, 2000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [alertMsg, navigate]);

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

  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/pdf/file/${id}`
        );
        if (response.status === 200) {
          const { filePath } = response.data;
          setPdfUrl(filePath);
          console.log("PDF FILE ", filePath);
        } else {
          console.error(
            "Failed to fetch PDF:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPdf();
  }, [id]);
  console.log("PDF ID ", id);

  return (
    <>
      <h1 className="text-3xl text-center font-bold mt-10">PDF Details</h1>
      <div className="container">
        {pdfData ? (
          <>
            {screenSize.width < 700 && (
              <div className="flex flex-wrap justify-center items-center text-center">
                <h1 className="text-lg font-bold">Titre :</h1>
                <span className="ml-3">{pdfData.title}</span>
              </div>
            )}

            <div className="flex justify-around flex__col">
              <div className="qr-code-section">
                {screenSize.width > 700 && (
                  <div className="flex flex-wrap mb-3">
                    <h1 className="ml-3 font-bold">Title :</h1>
                    <span className="ml-3">{pdfData.title}</span>
                  </div>
                )}
                <div
                  className={`w-[202px] bg-white ${
                    screenSize.width < 700 && "ml-9"
                  }`}
                  ref={qrCodeRef}
                >
                  <QRCode
                    className="w-[200px] h-[200px]"
                    value={`https://qr-plan.netlify.app/pdf/view/${pdfData._id}`}
                  />
                </div>
                <div className="mt-5 w-full flex-row-reverse text-xl flex items-center justify-center">
                  {screenSize.width < 700 && (
                    <div
                      className="cursor-pointer w-full text-center uppercase text-sm tracking-wide bg-blue-500 text-gray-100 px-2 py-[10px] rounded-md focus:outline-none focus:shadow-outline hover:bg-green-500"
                      onClick={handleDownloadQRCode}
                    >
                      Télécharger
                    </div>
                  )}
                  {screenSize.width > 700 && (
                    <div
                      className="cursor-pointer w-full text-center uppercase text-sm tracking-wide bg-blue-500 text-gray-100 px-2 py-[10px] rounded-md focus:outline-none focus:shadow-outline hover:bg-green-500"
                      onClick={handleDownloadQRCode}
                    >
                      Télécharger
                    </div>
                  )}
                </div>
              </div>
              <div
                key={pdfData._id}
                className="flex justify-between flex-col-reverse items-center flex-col ml-5 pt-5 mb-5"
              >
                <div className="pdf__footer">
                  <Link
                    to={`/pdf/view/${id}`}
                    className="buttons__style_link__h buttons__style_link__left bg-gray-200"
                  >
                    <span>Open Pdf</span>
                    <IoIosArrowForward />
                  </Link>
                  <div
                    className="cursor-pointer uppercase text-sm tracking-wide bg-blue-500 text-gray-100 px-2 py-[10px] rounded-md focus:outline-none focus:shadow-outline hover:bg-red-500"
                    onClick={handleDelete}
                  >
                    Delete
                  </div>
                </div>
                <div className="pdf-preview" key={pdfData._id}>
                  <Document
                    file={`https://pdf-server-809j.onrender.com/files/${pdfData.path}`}
                    onLoadSuccess={handlePdfLoadSuccess}
                    className="hidden__class"
                  >
                    {pdfLoaded && (
                      <Page
                        pageNumber={1}
                        width={screenSize.width < 700 ? 400 : 230}
                        renderTextLayer={false}
                        className="pdf-page"
                      />
                    )}
                  </Document>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>Loading PDF data...</p>
        )}
      </div>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Fichier supprimé avec succès
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
};

export default PdfDetails;
