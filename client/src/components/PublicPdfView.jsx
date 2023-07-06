import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { IoIosArrowBack } from "react-icons/io";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Table } from "flowbite-react";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Backdrop,
  Fade,
  IconButton,
  Modal,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
};

const TransitionsModal = ({ open, handleClose, handleOpen }) => {
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
      >
        <Fade in={open}>
          <Box sx={style}>
            <h1>d</h1>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

const PublicPdfView = () => {
  const { site, dossier, id } = useParams();
  const [pdfData, setPdfData] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const pdfRef = useRef();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [company, setCompany] = useState("");
  const [observation, setObservation] = useState("");
  const [partChanged, setPartChanged] = useState("");
  const [nextMaintenanceDate, setNextMaintenanceDate] = useState("");
  const [raports, setRaports] = useState(null);

  const [storedConfirmed, setStoredConfirmed] = useState(null);

  useEffect(() => {
    const confirmed = localStorage.getItem("confirmed");
    setStoredConfirmed(confirmed);
  }, []);

  useEffect(() => {
    const getPdfData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/site/folder/pdf/details/${id}`
        );
        setPdfData(response.data.pdf);
      } catch (error) {
        console.log("Error retrieving PDF data:", error);
      }
    };
    getPdfData();
  }, [id]);

  const handlePdfLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
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

  const navigate = useNavigate();

  const handleDownload = () => {
    const url = `http://localhost:3000/files/${pdfData.filename}`;
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const downloadLink = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadLink;
        a.download = "download.pdf";
        a.click();
        URL.revokeObjectURL(downloadLink);
      })
      .catch((error) => {
        console.log("Error downloading PDF:", error);
      });
  };

  const theme = useTheme();
  const [value, setValue] = useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const createData = (name, calories, fat) => {
    return { name, calories, fat };
  };

  const endSession = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const rows = [createData("Frozen yoghurt", 159, 6.0)];

  const sendRaport = async () => {
    try {
      const requestData = {
        société: company,
        observation: observation,
        piècesChangées: partChanged,
        dateProchainEntretien: nextMaintenanceDate,
        pdfID: pdfData._id,
      };

      const response = await axios.post(
        `http://localhost:3000/pdfs/${id}/raport`,
        requestData
      );
      if (response.status === 200) {
        alert("Raport sent");
        window.location.reload();
        setValue(2);
      } else {
        alert("Error sending raport");
      }
    } catch (error) {
      console.log("Error sending report:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/pdf/raports`);
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

  if (!pdfData) {
    return <div>Loading PDF...</div>;
  }

  console.log(pdfData);

  const TITLE = <div className="text-white">Fin de Session</div>;
  console.log(storedConfirmed);

  return (
    <>
      {storedConfirmed === "true" ? (
        <section className="flex flex-col md:w-screen">
          {open && (
            <TransitionsModal
              open={open}
              handleClose={handleClose}
              handleOpen={handleOpen}
            />
          )}
          <h1 className="text-3xl text-center font-bold mt-5 mb-5">
            <span>Fiche de Maintenance</span>
            <Tooltip title={TITLE} placement="top">
              <IconButton>
                <LogoutIcon
                  sx={{
                    "&:hover": {
                      color: "red",
                    },
                  }}
                  onClick={endSession}
                />
              </IconButton>
            </Tooltip>
          </h1>
          <div className="flex justify-center">
            <Box sx={{ bgcolor: "", width: "80%", color: "white" }}>
              <Box
                sx={{
                  color: "white",
                  "& .MuiTabs-indicator": {
                    backgroundColor: "white",
                  },
                  "& .Mui-selected": {
                    color: "white",
                  },
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  centered
                  sx={{
                    width: "100%",
                    bgcolor: "rgb(50, 145, 240)",
                    color: "white",
                    "& .MuiTabs-indicator": {
                      backgroundColor: "white",
                    },
                    "& .Mui-selected": {
                      background: "white",
                    },
                  }}
                >
                  <Tab
                    label="DOE"
                    {...a11yProps(0)}
                    sx={{
                      color: "white",
                    }}
                  />
                  <Tab
                    label="Plan"
                    {...a11yProps(1)}
                    sx={{
                      color: "white",
                    }}
                  />
                  <Tab
                    label="Carnet de maintenance"
                    {...a11yProps(2)}
                    sx={{
                      color: "white",
                    }}
                  />
                  <Tab
                    label="écrire un Raport"
                    {...a11yProps(3)}
                    sx={{
                      color: "white",
                    }}
                  />
                </Tabs>
              </Box>

              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
                className="text-black"
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  Item One
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <div
                    className={`flex-1 overflow-y-auto ${
                      screenSize.width < 700 ? "w-[350px]" : "sm:max-w-7xl"
                    }`}
                    ref={pdfRef}
                  >
                    <div className="flex justify-end">
                      <button
                        className="boor text-xs items-center text-center text-white bg-blue-500 rounded-full px-4 py-2"
                        onClick={handleDownload}
                      >
                        Télécharger
                      </button>
                    </div>
                    <Document
                      file={`http://localhost:3000/files/${pdfData.filename}`}
                      className="flex flex-col items-center"
                      onLoadSuccess={handlePdfLoadSuccess}
                    >
                      {Array.from(new Array(numPages), (el, index) => (
                        <Page
                          key={index}
                          pageNumber={index + 1}
                          renderTextLayer={false}
                          height={null}
                          width={screenSize.width < 700 ? 349 : 1000}
                          className="mt-1"
                        />
                      ))}
                    </Document>
                  </div>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                  <TableContainer component={Paper}>
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
                          raports.map((raport) => (
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
                                <InfoOutlinedIcon
                                  sx={{ color: "#3291F0" }}
                                  onClick={handleOpen}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                  <Typography variant="h5" gutterBottom>
                    Raport
                  </Typography>
                  <div className="mb-6 mt-5">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                    >
                      Sociéte
                    </label>
                    <input
                      type="text"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light"
                      placeholder="le nom du sociéte"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      for="message"
                      className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                    >
                      Observation
                    </label>
                    <textarea
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Leave a comment..."
                      value={observation}
                      onChange={(e) => setObservation(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="repeat-password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Piéce changée
                    </label>
                    <input
                      type="text"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light"
                      required
                      value={partChanged}
                      onChange={(e) => setPartChanged(e.target.value)}
                    />
                  </div>

                  <div className="block mb-6 w-1/2">
                    <label
                      for="date"
                      className="w-full text-md font-medium text-gray-900 dark:text-white flex flex-wrap gap-2"
                    >
                      Date du prochain entretie :
                    </label>
                    <input
                      date-rangepicker
                      name="date"
                      type="date"
                      className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Select date start"
                      value={nextMaintenanceDate}
                      onChange={(e) => setNextMaintenanceDate(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    onClick={sendRaport}
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    Register new account
                  </button>
                </TabPanel>
              </SwipeableViews>
            </Box>
          </div>
        </section>
      ) : null}
    </>
  );
};

export default PublicPdfView;
