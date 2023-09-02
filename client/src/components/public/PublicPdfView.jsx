import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { Link } from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import {
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

const PublicPdfView = () => {
  const { site, dossier, id } = useParams();
  const [pdfData, setPdfData] = useState(null);
  const qrCodeRef = useRef(null);
  const [raports, setRaports] = useState(null);
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [selectedView, setSelectedView] = useState("image");
  const [isImageFullscreen, setIsImageFullscreen] = useState(false);

  useEffect(() => {
    const getPdfData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_SERVER_API_URL
          }/public/site/folder/pdf/details/${id}`
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
          }/public/site/folder/pdf/details/image/${id}`,
          {
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
          `${import.meta.env.VITE_SERVER_API_URL}/public/pdf/raports`
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

  const handleViewChange = (event) => {
    setSelectedView(event.target.value);
  };
  const handleImageClick = () => {
    setIsImageFullscreen(!isImageFullscreen);
  };

  return (
    <>
      {pdfData ? (
        <div className="h-full w-full">
          <div className="flex flex-col items-center justify-center mt-20">
            <h1 className="text-3xl text-center font-bold mb-5">
              <span className="">Fiche d'équipement</span>
            </h1>
            <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:space-x-3">
              <Link
                to={`/publique/${site}/${dossier}/pdf/detail/doe/${id}`}
                className="w-full md:w-auto"
              >
                <button
                  type="button"
                  className="w-full md:w-auto flex items-center justify-start text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  <InfoOutlinedIcon className="mr-2" />
                  <span>Ouvrir les DOE</span>
                </button>
              </Link>

              <Link
                to={`/publique/${site}/${dossier}/plan/${id}`}
                className="w-full md:w-auto"
              >
                <button
                  type="button"
                  className="w-full md:w-auto flex items-center justify-start text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  <InfoOutlinedIcon className="mr-2" />
                  <span> Ouvrir le Plan </span>
                </button>
              </Link>

              <Link
                to={`/publique/${site}/${dossier}/pdf/view/${id}`}
                className="w-full md:w-auto"
              >
                <button
                  type="button"
                  className="w-full md:w-auto flex items-center justify-start text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  <InfoOutlinedIcon className="mr-2" />
                  <span> Fiche d'entretien</span>
                </button>
              </Link>

              <Link
                to={`/publique/${site}/${dossier}/fiche_technique/${id}`}
                className="w-full md:w-auto"
              >
                <button
                  type="button"
                  className="w-full md:w-auto flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  <InfoOutlinedIcon className="mr-2" />
                  <span> Fiche technique</span>
                </button>
              </Link>
            </div>
          </div>

          <div>
            {/* Desktop View */}
            <div className="hidden md:flex flex-col items-center justify-cneter py-2 lg:px-5 mx-auto w-full">
              <div className=" md:w-[70%] w-full mt-5 h-full">
                <p className="font-bold text-lg mb-4 text-center">
                  Information d'équipement
                </p>
                <div className="pdf-preview">
                  <div className="sm:h-full">
                    <div className="shadow-md shadow-black/20 pt-2 pb-2 pr-5 rounded-lg bg-white h-auto flex items-center justify-around">
                      <div>
                        {!imageLoading && !imageError && (
                          <figure className="relative">
                            <img
                              className="h-40 w-80 bg-no-repeat object-cover rounded-lg"
                              src={image}
                              alt="image"
                            />
                          </figure>
                        )}
                      </div>
                      <div>
                        <div className="mb-3 flex flex-col  sm:flex-row justify-start items-center">
                          <h1 className="font-bold text-base">Titre :</h1>
                          <span className="text-black ml-3 text-base">
                            {pdfData.title}
                          </span>
                        </div>
                        {dossier === "Armoire electrique" && (
                          <>
                            <div className="mb-3 flex flex-col sm:flex-row items-center justify-start text-center">
                              <h1 className="font-bold">PTA :</h1>
                              <span className="text-black ml-3">
                                {pdfData?.pdfDetails?.PAT}
                              </span>
                            </div>
                            <div className="mb-3 flex flex-col sm:flex-row justify-center text-center">
                              <h1 className="font-bold">
                                Date d'installation :
                              </h1>
                              <span className="text-black ml-3">
                                {
                                  new Date(
                                    pdfData?.pdfDetails?.installationDate
                                  )
                                    .toISOString()
                                    .split("T")[0]
                                }
                              </span>
                            </div>
                          </>
                        )}
                        {["Climatisation", "Chauffage", "Ventilasion"].includes(
                          dossier
                        ) && (
                          <div className="mb-3 flex flex-col sm:flex-row justify-center items-center">
                            <h1 className="font-bold">Modéle :</h1>
                            <span className="text-black ml-3">
                              {pdfData?.pdfDetails?.pdfModel}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-[70%] mt-5">
                {/* Adjust margin top */}
                <p className="font-sans font-bold text-lg text-center mb-4">
                  Tableau des Rapports
                </p>
                <div className="pdf-preview bg-white shadow-md shadow-black/20 rounded-lg">
                  <div style={{ height: "400px", overflow: "auto" }}>
                    <Table
                      sx={{ minWidth: 650 }}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" sx={{ p: 1, m: 0 }}>
                            <span className="font-sans font-bold">Sociéte</span>
                          </TableCell>
                          <TableCell align="center" sx={{ p: 1, m: 0 }}>
                            <span className="font-sans font-bold">
                              Date du dernier entretien
                            </span>
                          </TableCell>
                          <TableCell align="center" sx={{ p: 1, m: 0 }}>
                            <span className="font-sans font-bold">
                              Date du prochain entretien
                            </span>
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
                                <TableCell align="center">
                                  {raport.société}
                                </TableCell>
                                <TableCell align="center">
                                  {
                                    new Date(raport.dateDernierEntretien)
                                      .toISOString()
                                      .split("T")[0]
                                  }
                                </TableCell>
                                <TableCell align="center">
                                  {
                                    new Date(raport.dateProchainEntretien)
                                      .toISOString()
                                      .split("T")[0]
                                  }
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
            </div>

            {/* Mobile View */}
            <div className="md:hidden">
              <div className="mt-5 px-3">
                <div className="qr-code-section bg-white">
                  <div className="flex flex-wrap mb-3">
                    <h1 className="ml-3 font-sans font-bold">Titre :</h1>
                    <span className="ml-3 font-sans font-light text-black">
                      {pdfData.title}
                    </span>
                  </div>
                  {dossier === "Armoire electrique" && (
                    <>
                      <div className="flex flex-wrap mb-3">
                        <h1 className="ml-3 font-sans font-bold">PTA :</h1>
                        <span className="ml-3 font-sans font-light text-black">
                          {pdfData?.pdfDetails?.PAT}
                        </span>
                      </div>
                      <div className="flex flex-wrap mb-3">
                        <h1 className="ml-3 font-sans font-bold">
                          Date d'installation :
                        </h1>
                        <span className="ml-3 font-sans font-light text-black">
                          {
                            new Date(pdfData?.pdfDetails?.installationDate)
                              .toISOString()
                              .split("T")[0]
                          }
                        </span>
                      </div>
                    </>
                  )}
                  {["Climatisation", "Chauffage", "Ventilasion"].includes(
                    dossier
                  ) && (
                    <div className="flex flex-wrap mb-3">
                      <h1 className="ml-3 font-sans font-bold">Modéle:</h1>
                      <span className="ml-3 font-sans font-light text-black">
                        {pdfData?.pdfDetails?.pdfModel}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-5 px-3">
                {!imageLoading && !imageError && (
                  <div
                    className={`max-w-lg relative ${
                      isImageFullscreen
                        ? "fixed top-0 left-0 w-screen h-screen z-50 bg-black flex justify-center items-center"
                        : ""
                    }`}
                  >
                    <img
                      className={`h-auto max-w-full rounded-lg ${
                        isImageFullscreen ? "cursor-pointer" : ""
                      }`}
                      src={image}
                      alt="image"
                    />
                  </div>
                )}
              </div>
              <div className="mt-5 px-3">
                <p className="font-sans font-bold text-lg mb-4 text-center">
                  Tableau des Rapports
                </p>
                <div
                  className="pdf-preview bg-white rounded-lg"
                  key={pdfData._id}
                >
                  <div
                    style={{
                      height: "400px",
                      overflowX: "auto",
                      width: "100%",
                    }}
                  >
                    <Table size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">
                            <span className="font-sans font-bold text-[10px]">
                              Sociéte
                            </span>
                          </TableCell>
                          <TableCell align="center">
                            <span className="font-sans font-bold text-[10px]">
                              Date du dernier entretien
                            </span>
                          </TableCell>
                          <TableCell align="center">
                            <span className="font-sans font-bold text-[10px]">
                              Date du prochain entretien
                            </span>
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
                                <TableCell align="center" sx={{ fontSize: 10 }}>
                                  <span className="font-sans font-medium text-[10px]">
                                    {raport.société}
                                  </span>
                                </TableCell>
                                <TableCell align="center">
                                  <span className="font-sans font-medium text-[10px]">
                                    {
                                      new Date(raport.dateDernierEntretien)
                                        .toISOString()
                                        .split("T")[0]
                                    }
                                  </span>
                                </TableCell>
                                <TableCell align="center">
                                  <span className="w-full font-sans font-medium text-[10px]">
                                    {
                                      new Date(raport.dateProchainEntretien)
                                        .toISOString()
                                        .split("T")[0]
                                    }
                                  </span>
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
                    labelRowsPerPage="Lignes par page"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "calc(100vh - 40px)",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
};
export default PublicPdfView;
