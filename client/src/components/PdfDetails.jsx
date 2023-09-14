import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import {
  Backdrop,
  Box,
  CircularProgress,
  Fade,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import QrView from "./QrView";
import { itemTextStyle, itemsStyle, style } from "../utils/utils";

const TransitionsModal = ({ open, handleClose, raports, filteredRaports }) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        sx={{ border: "none" }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {filteredRaports &&
              filteredRaports.map((raport, index) => (
                <Box sx={{ maxHeight: "400px", overflow: "auto" }} key={index}>
                  <Box sx={itemsStyle}>
                    <Typography variant="h7" gutterBottom>
                      Société
                    </Typography>
                    <Typography variant="h7" gutterBottom sx={itemTextStyle}>
                      {raport.société}
                    </Typography>
                  </Box>
                  <Box sx={itemsStyle}>
                    <Typography variant="h7" gutterBottom>
                      Date
                    </Typography>
                    <Typography variant="h7" gutterBottom sx={itemTextStyle}>
                      {
                        new Date(raport.dateDernierEntretien)
                          .toISOString()
                          .split("T")[0]
                      }
                    </Typography>
                  </Box>
                  <Box sx={itemsStyle}>
                    <Typography variant="h7" gutterBottom>
                      Correctif ou Préventif
                    </Typography>
                    <Typography variant="h7" gutterBottom sx={itemTextStyle}>
                      {raport.options.map((el) => el)}
                    </Typography>
                  </Box>
                  <Box sx={itemsStyle}>
                    <Typography variant="h7" gutterBottom>
                      Observation
                    </Typography>
                    <Typography variant="h7" gutterBottom sx={itemTextStyle}>
                      {raport.observation}
                    </Typography>
                  </Box>
                  <Box sx={itemsStyle}>
                    <Typography variant="h7" gutterBottom>
                      Tàche effectuer
                    </Typography>
                    <Typography variant="h7" gutterBottom sx={itemTextStyle}>
                      {raport.piècesChangées}
                    </Typography>
                  </Box>
                  <Box sx={itemsStyle}>
                    <Typography variant="h7" gutterBottom>
                      Date prochain maintenance
                    </Typography>
                    <Typography variant="h7" gutterBottom sx={itemTextStyle}>
                      {
                        new Date(raport.dateProchainEntretien)
                          .toISOString()
                          .split("T")[0]
                      }{" "}
                    </Typography>
                  </Box>
                </Box>
              ))}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

const PdfDetails = () => {
  const { site, dossier, id } = useParams();
  const [pdfData, setPdfData] = useState(null);
  const [open, setOpen] = useState(false);
  const Navigate = useNavigate();
  const [alertMsg, setAlertMsg] = useState("");
  const [raports, setRaports] = useState(null);
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isImageFullscreen, setIsImageFullscreen] = useState(false);
  const [QrViewModal, setQrViewModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [filteredRaports, setFilteredRaports] = useState([]);
  const [socIndex, setSocIndex] = useState(null);

  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }

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
            responseType: "arraybuffer",
          }
        );

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_API_URL}/pdf/raports`,
          config
        );
        const filteredRaports = response.data.filter((raport) =>
          pdfData?.raports?.includes(raport._id)
        );
        setRaports(filteredRaports);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [pdfData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 4));
    setPage(0);
  };

  const handleOpen = (soc) => {
    setOpen(true);
    const filteredReports = raports.filter((raport) => raport._id === soc);
    setFilteredRaports(filteredReports);
  };

  const handleClose = () => setOpen(false);

  console.log(pdfData);

  return (
    <>
      {QrViewModal && (
        <QrView
          open={QrViewModal}
          setOpen={setQrViewModal}
          site={site}
          dossier={dossier}
          id={id}
        />
      )}
      {open && (
        <TransitionsModal
          open={open}
          handleClose={handleClose}
          handleOpen={handleOpen}
          raports={raports}
          SOC={socIndex}
          filteredRaports={filteredRaports}
        />
      )}

      {pdfData ? (
        <div className="h-full w-full md:h-screen lg:h-screen xl:h-screen py-2">
          <div className="flex flex-col items-center justify-center mt-4">
            <div className="w-full md:w-[70%] px-3 ">
              <p className="rounded-lg text-center mb-4 bg-[#125ba3] text-white text-md md:text-xl lg:text-xl xl:text-xl tracking-wide font-sans font-semibold py-1">
                Fiche d'équipement
              </p>
            </div>
            <div className="flex flex-col justify-center space-y-3 md:space-y-0 md:flex-row md:space-x-3">
              <Link
                to={`/${site}/${dossier}/pdf/detail/doe/${id}`}
                className="w-full md:w-auto"
              >
                <button
                  type="button"
                  className="text-xs w-full md:w-auto flex items-center justify-start text-white bg-[#125ba3] hover:bg-[#F0854A] focus:ring-4 focus:ring-primary-300 font-medium rounded-lg px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 transition ease-in duration-300"
                >
                  <InfoOutlinedIcon className="mr-2" />
                  <span>Ouvrir les DOE</span>
                </button>
              </Link>

              <Link
                to={`/${site}/${dossier}/pdf/detail/plan/${id}`}
                className="w-full md:w-auto"
              >
                <button
                  type="button"
                  className="w-full md:w-auto flex items-center justify-start text-white bg-[#125ba3] hover:bg-[#F0854A] focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-xs px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 transition ease-in duration-300"
                >
                  <InfoOutlinedIcon className="mr-2" />
                  <span>Ouvrir le Plan </span>
                </button>
              </Link>
              <div
                to={`/${site}/${dossier}/pdf/detail/fiche_technique/${id}`}
                className="w-full md:w-auto"
              >
                <button
                  type="button"
                  onClick={() => setQrViewModal(true)}
                  className="w-full md:w-auto flex items-center justify-start text-white bg-[#125ba3] hover:bg-[#F0854A] focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-xs px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 transition ease-in duration-300"
                >
                  <InfoOutlinedIcon className="mr-2" />
                  <span> QR Code</span>
                </button>
              </div>

              <Link
                to={`/${site}/${dossier}/pdf/view/${id}`}
                className="w-full md:w-auto"
              >
                <button
                  type="button"
                  className="w-full md:w-auto flex items-center justify-start text-white bg-[#125ba3] hover:bg-[#F0854A] focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-xs px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 transition ease-in duration-300"
                >
                  <InfoOutlinedIcon className="mr-2" />
                  <span> Fiche d'entretien</span>
                </button>
              </Link>

              <Link to={`/fiche_technique/${id}`} className="w-full md:w-auto">
                <button
                  type="button"
                  className="w-full md:w-auto flex items-center justify-start text-white bg-[#125ba3] hover:bg-[#F0854A] focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-xs px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 transition ease-in duration-300"
                >
                  <InfoOutlinedIcon className="mr-2" />
                  <span>Fiche technique</span>
                </button>
              </Link>
            </div>
          </div>

          <div>
            {/* Desktop View */}
            <div className="hidden md:flex flex-col items-center justify-cneter lg:px-5 mx-auto w-full">
              <div className="md:w-[70%] w-full mt-4 h-full">
                <p className="rounded-lg text-center mb-4 bg-gray-400 text-white text-md md:text-xl lg:text-xl xl:text-xl tracking-wide font-sans font-semibold py-1">
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
                          <h1 className="font-sans font-semibold">Titre :</h1>
                          <span className="ml-3 font-sans font-light">
                            {pdfData.title}
                          </span>
                        </div>
                        {dossier === "Armoire electrique" && (
                          <>
                            <div className="mb-3 flex flex-col sm:flex-row items-center justify-start text-center">
                              <h1 className="font-sans font-semibold">PTA :</h1>
                              <span className="ml-3 font-sans font-light">
                                {pdfData?.pdfDetails?.PAT}
                              </span>
                            </div>
                            <div className="mb-3 flex flex-col sm:flex-row justify-center text-center">
                              <h1 className="font-sans font-semibold">
                                Date d'installation :
                              </h1>
                              <span className="ml-3 font-sans font-light">
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
                          <>
                            <div className="mb-3 flex flex-col sm:flex-row items-center justify-start text-center">
                              <h1 className="font-sans font-semibold">PTA :</h1>
                              <span className="ml-3 font-sans font-light">
                                {pdfData?.pdfDetails?.PAT}
                              </span>
                            </div>
                            <div className="mb-3 flex flex-col sm:flex-row justify-center items-center">
                              <h1 className="font-sans font-semibold">
                                Modéle :
                              </h1>
                              <span className="ml-3 font-sans font-light">
                                {pdfData?.pdfDetails?.pdfModel}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-[70%] mt-5">
                <p className="rounded-lg text-center mb-4 bg-gray-400 text-white text-md md:text-xl lg:text-xl xl:text-xl tracking-wide font-sans font-semibold py-1">
                  Tableau des Rapports
                </p>
                <div className="pdf-preview bg-white h-[30vh] shadow-md shadow-black/20 rounded-t-lg">
                  <div style={{ height: "100%", overflow: "auto" }}>
                    <Table
                      sx={{ minWidth: 650 }}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" sx={{ p: 1, m: 0 }}>
                            <span className="font-sans font-semibold">
                              Sociéte
                            </span>
                          </TableCell>
                          <TableCell align="center" sx={{ p: 1, m: 0 }}>
                            <span className="font-sans font-semibold">
                              Date du dernier entretien
                            </span>
                          </TableCell>
                          <TableCell align="center" sx={{ p: 1, m: 0 }}>
                            <span className="font-sans font-semibold">
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
                                  <span className="px-4 py-2 font-sans font-light">
                                    {raport.société}
                                  </span>
                                </TableCell>
                                <TableCell align="center">
                                  <span className="px-4 py-2 font-sans font-light">
                                    {
                                      new Date(raport.dateDernierEntretien)
                                        .toISOString()
                                        .split("T")[0]
                                    }
                                  </span>
                                </TableCell>
                                <TableCell align="center">
                                  <span className="px-4 py-2 font-sans font-light">
                                    {
                                      new Date(raport.dateProchainEntretien)
                                        .toISOString()
                                        .split("T")[0]
                                    }
                                  </span>
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{ cursor: "pointer" }}
                                >
                                  <InfoOutlinedIcon
                                    sx={{ color: "#3291F0" }}
                                    onClick={() => handleOpen(raport._id)}
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="bg-white shadow-md shadow-black/20 rounded-b-lg">
                    <TablePagination
                      rowsPerPageOptions={[]}
                      component="div"
                      count={raports ? raports.length : 0}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      labelRowsPerPage=""
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden">
              <div className="mt-5 px-3">
                <p className="rounded-lg text-center mb-4 bg-gray-400 text-white text-md md:text-xl lg:text-xl xl:text-xl tracking-wide font-sans font-semibold py-1">
                  Information d'équipement
                </p>
                <div className="qr-code-section bg-white p-2">
                  <div className="flex flex-wrap mb-3">
                    <span className="font-sans font-semibold">Titre :</span>
                    <span className="ml-3 font-sans font-light text-black">
                      {pdfData.title}
                    </span>
                  </div>
                  {dossier === "Armoire electrique" && (
                    <>
                      <div className="flex flex-wrap mb-3">
                        <h1 className="ml-3 font-sans font-semibold">PTA :</h1>
                        <span className="ml-3 font-sans font-light">
                          {pdfData?.pdfDetails?.PAT}
                        </span>
                      </div>
                      <div className="flex flex-wrap mb-3">
                        <h1 className="ml-3 font-sans font-semibold">
                          Date d'installation :
                        </h1>
                        <span className="ml-3 font-sans font-light">
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
                    <>
                      <div className="flex flex-wrap mb-3">
                        <h1 className="ml-3 font-sans font-semibold">PTA :</h1>
                        <span className="ml-3 font-sans font-light text-black">
                          {pdfData?.pdfDetails?.PAT}
                        </span>
                      </div>
                      <div className="flex flex-wrap mb-3">
                        <h1 className="ml-3 font-sans font-semibold">
                          Modéle:
                        </h1>
                        <span className="ml-3 font-sans font-light">
                          {pdfData?.pdfDetails?.pdfModel}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="mt-5 px-3">
                {!imageLoading && !imageError && (
                  <div className="max-w-lg relative w-full flex justify-center">
                    <img
                      className="h-auto max-w-full"
                      src={image}
                      alt="image"
                    />
                  </div>
                )}
              </div>
              <div className="mt-5 px-3">
                <p className="rounded-lg text-center mb-4 bg-gray-400 text-white text-md md:text-xl lg:text-xl xl:text-xl tracking-wide font-sans font-semibold py-1">
                  Tableau des Rapports
                </p>
                <div
                  className="pdf-preview bg-white rounded-lg"
                  key={pdfData._id}
                >
                  <div
                    style={{
                      height: "100%",
                      overflowX: "auto",
                      width: "100%",
                    }}
                  >
                    <Table size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">
                            <span className="font-sans font-semibold text-[10px]">
                              Sociéte
                            </span>
                          </TableCell>
                          <TableCell align="center">
                            <span className="font-sans font-semibold text-[10px]">
                              Date du dernier entretien
                            </span>
                          </TableCell>
                          <TableCell align="center">
                            <span className="font-sans font-semibold text-[10px]">
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
                                  <span className="font-sans font-light text-[10px]">
                                    {raport.société}
                                  </span>
                                </TableCell>
                                <TableCell align="center">
                                  <span className="font-sans font-light text-[10px]">
                                    {
                                      new Date(raport.dateDernierEntretien)
                                        .toISOString()
                                        .split("T")[0]
                                    }
                                  </span>
                                </TableCell>
                                <TableCell align="center">
                                  <span className="w-full font-sans font-light text-[10px]">
                                    {
                                      new Date(raport.dateProchainEntretien)
                                        .toISOString()
                                        .split("T")[0]
                                    }
                                  </span>
                                </TableCell>

                                <TableCell
                                  align="center"
                                  sx={{ cursor: "pointer" }}
                                >
                                  <InfoOutlinedIcon
                                    sx={{ color: "#3291F0" }}
                                    onClick={() => handleOpen(raport._id)}
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                      </TableBody>
                    </Table>
                  </div>
                  <TablePagination
                    rowsPerPageOptions={[]}
                    component="div"
                    count={raports ? raports.length : 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage=""
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
export default PdfDetails;
