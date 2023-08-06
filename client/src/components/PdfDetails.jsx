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
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import CustomizedFileFolder from "./CustomizedFileFolder";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PdfDetails = () => {
  const { site, dossier, id } = useParams();
  const [pdfData, setPdfData] = useState(null);
  const [open, setOpen] = useState(false);
  const qrCodeRef = useRef(null);
  const Navigate = useNavigate();
  const [alertMsg, setAlertMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [raports, setRaports] = useState(null);
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleOpenTable = () => setOpen(true);
  const handleCloseTable = () => setOpen(false);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const getPdfData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_SERVER_API_URL
          }/site/folder/pdf/details/${id}`,
          config
        );
        setPdfData(response.data.pdf);
      } catch (error) {
        console.log("Error retrieving PDF data:", error);
      }
    };
    getPdfData();
  }, [site, dossier, id]);

  useEffect(() => {
    const getImageFile = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_SERVER_API_URL
          }/site/folder/pdf/details/image/${id}`,
          {
            ...config,
            responseType: "arraybuffer", // Set the response type to "arraybuffer" to handle binary data correctly
          }
        );

        // Convert the received ArrayBuffer to a base64 string
        const base64Pdf = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        setImage(
          `data:${response.headers["content-type"]};base64,${base64Pdf}`
        );
        setImageLoading(false); // Image loading is complete
      } catch (error) {
        console.log("Error retrieving PDF data:", error);
        setImageError(true);
        setImageLoading(false);
      }
    };
    getImageFile();
  }, [site, dossier, id]);

  console.log(pdfData);

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
        `${import.meta.env.VITE_SERVER_API_URL}/${site}/${dossier}/pdfs/${
          pdfData.title
        }`,
        config
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
        Navigate(-1);
      };
      const timeout = setTimeout(performActionAfterInterval, 2000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [alertMsg]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_API_URL}/pdf/raports`,
          config
        );
        const filteredRaports = response.data.filter((raport) =>
          pdfData.raports.includes(raport._id)
        );
        setRaports(filteredRaports);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [pdfData]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <h1 className="text-3xl text-center font-bold pt-10">
        <span className=""> Fiche d'equipement</span>
      </h1>
      <div
        className={`container pt-20 ${
          screenSize.width < 700 ? "h-screen" : ""
        }`}
      >
        {pdfData ? (
          <>
            {screenSize.width < 700 && (
              <div className="flex flex-wrap justify-center items-center text-center">
                <h1 className="text-lg font-bold">Titre :</h1>
                <span className="ml-3">{pdfData.title}</span>
              </div>
            )}

            <div className="flex justify-around items-center flex__col">
              <div className="flex flex-col">
                <div className="flex flex-col">
                  {imageLoading && <div>Loading Image...</div>}

                  {/* Show the image when it is loaded */}
                  {!imageLoading && !imageError && (
                    <figure className="max-w-lg relative">
                      <img
                        className="h-auto max-w-full rounded-lg"
                        src={image}
                        alt="image"
                      />
                    </figure>
                  )}
                </div>
                <div>
                  <div className="qr-code-section bg-white">
                    {screenSize.width > 700 && (
                      <div className="flex flex-wrap mb-3">
                        <h1 className="ml-3 font-bold">Titl :</h1>
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
                        value={`${
                          import.meta.env.VITE_SERVER_API_URL
                        }/publique/${site}/${dossier}/pdf/view/${id}`}
                      />
                    </div>
                    <div className="mt-5 w-full flex-row-reverse  text-xl flex items-center justify-center">
                      {screenSize.width < 700 && (
                        <div
                          className="cursor-pointer w-full text-center uppercase text-sm tracking-wide bg-blue-500 text-gray-100 px-2 py-[10px] rounded-md focus:outline-none focus:shadow-outline hover:bg-green-500"
                          onClick={handleDownloadQRCode}
                        >
                          Télècharger
                        </div>
                      )}
                      {screenSize.width > 700 && (
                        <div
                          className="cursor-pointer w-full text-center uppercase text-sm tracking-wide bg-blue-500 text-gray-100 px-2 py-[10px] rounded-md focus:outline-none focus:shadow-outline hover:bg-green-500"
                          onClick={handleDownloadQRCode}
                        >
                          Télècharger
                        </div>
                      )}
                    </div>
                    {dossier === "Armoire electrique" ? (
                      <div>
                        <h1> PTA : {pdfData?.pdfDetails?.PAT}</h1>
                        <h1>
                          Date d'instalation{" "}
                          {pdfData?.pdfDetails?.installationDate}
                        </h1>
                      </div>
                    ) : ["Climatisation", "Chauffage", "Ventilasion"].includes(
                        dossier
                      ) ? (
                      <h1> Modéle : {pdfData?.pdfDetails?.pdfModel}</h1>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center flex-col ml-5 pt-5 mt-[-100px] ">
                <p className="font-bold text-lg mb-5  ">Tableau des Raport</p>

                <div className="pdf-preview bg-white " key={pdfData._id}>
                  <div style={{ height: "400px", overflow: "auto" }}>
                    <Table
                      sx={{ minWidth: 650 }}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Sociéte</TableCell>
                          <TableCell align="center">
                            Date du dernier entretien
                          </TableCell>
                          <TableCell align="center">
                            Date du prochain entretien
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {raports &&
                          raports
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((raport) => (
                              <TableRow
                                key={raport.id}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  {raport.société}
                                </TableCell>
                                <TableCell align="center">
                                  {raport.dateDernierEntretien}
                                </TableCell>
                                <TableCell align="center">
                                  {raport.dateProchainEntretien}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{ cursor: "pointer" }}
                                >
                                  {/* <InfoOutlinedIcon
                                    sx={{ color: "#3291F0" }}
                                    onClick={handleOpenTable}
                                  /> */}
                                </TableCell>
                              </TableRow>
                            ))}
                      </TableBody>
                    </Table>
                  </div>

                  <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={raports ? raports.length : 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </div>
              </div>

              {screenSize.width < 700 && (
                <div>
                  <CustomizedFileFolder PdfData={pdfData} />
                </div>
              )}
            </div>
          </>
        ) : (
          <p>Loading PDF data...</p>
        )}
      </div>
      {pdfData ? (
        <div className="flex justify-center mt-20">
          <div className="pdf__footer mb-10 w-[50rem]">
            <div className="">
              <Link
                to={`/${site}/${dossier}/pdf/detail/doe/${id}`}
                className="buttons__style_link__h buttons__style_link__left bg-gray-200 mt-3"
              >
                <span>Ouvrir les DOE</span>
                <IoIosArrowForward />
              </Link>
              <Link
                to={`/plan/${id}`}
                className="buttons__style_link__h buttons__style_link__left bg-gray-200 mt-3"
              >
                <span>Plan</span>
                <IoIosArrowForward />
              </Link>
            </div>
            <div>
              <Link
                to={`/${site}/${dossier}/pdf/view/${id}`}
                className="buttons__style_link__h buttons__style_link__left bg-gray-200 mt-3"
              >
                <span>fiche d'entretien</span>
                <IoIosArrowForward />
              </Link>
              <Link
                to={`/${site}/${dossier}/pdf/detail/fiche_technique/${id}`}
                className="buttons__style_link__h buttons__style_link__left bg-gray-200 mt-3"
              >
                <span>Fiche technique </span>
                <IoIosArrowForward />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <p></p>
      )}
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Fichier supprimer avec succès
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
};
export default PdfDetails;
