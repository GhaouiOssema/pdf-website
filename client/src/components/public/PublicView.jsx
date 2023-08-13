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
import {
  Backdrop,
  Fade,
  Modal,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
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
      >
        <Fade in={open}>
          <Box sx={style}>
            {filteredRaports &&
              filteredRaports.map((raport, index) => (
                <Box sx={{ maxHeight: "400px", overflow: "auto" }} key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      société
                    </Typography>
                    <Typography variant="h7" gutterBottom>
                      {raport.société}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      Date
                    </Typography>
                    <Typography variant="h7" gutterBottom>
                      {
                        new Date(raport.dateDernierEntretien)
                          .toISOString()
                          .split("T")[0]
                      }
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      Correctif ou Préventif
                    </Typography>
                    <Typography variant="h7" gutterBottom>
                      {raport.options.map((el) => el)}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      Observation
                    </Typography>
                    <Typography variant="h7" gutterBottom>
                      {raport.observation}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      Tàche effectuer
                    </Typography>
                    <Typography variant="h7" gutterBottom>
                      {raport.piècesChangées}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      Date prochain maintenance
                    </Typography>
                    <Typography variant="h7" gutterBottom>
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

const PublicView = () => {
  const { id } = useParams();
  const [pdfData, setPdfData] = useState(null);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [company, setCompany] = useState("");
  const [observation, setObservation] = useState("");
  const [partChanged, setPartChanged] = useState("");
  const [nextMaintenanceDate, setNextMaintenanceDate] = useState("");
  const [raports, setRaports] = useState(null);
  const [socIndex, setSocIndex] = useState(null);
  const [filteredRaports, setFilteredRaports] = useState([]);
  const [confirmationCode, setConfirmationCode] = useState(null);

  const [selectedOption, setSelectedOption] = useState("Option 1");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  const handleOpen = (soc) => {
    setOpen(true);
    const filteredReports = raports.filter((raport) => raport.société === soc);
    setFilteredRaports(filteredReports);
  };

  useEffect(() => {
    const getPdfData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_SERVER_API_URL
          }/public/site/folder/pdf/details/raports/${id}`
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

  const handleDownload = () => {
    const url = `${import.meta.env.VITE_SERVER_API_URL}/files/${
      pdfData.filename
    }`;
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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  console.log(confirmationCode);

  const sendRaport = async () => {
    try {
      const requestData = {
        société: company,
        observation: observation,
        piècesChangées: partChanged,
        dateProchainEntretien: nextMaintenanceDate,
        pdfID: pdfData._id,
        option:
          selectedOption === "Préventif"
            ? "Préventif"
            : selectedOption === "Correctif"
            ? "Correctif"
            : null,
        code: confirmationCode,
      };
      console.log(requestData);

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API_URL}/pdfs/${id}/raport`,
        requestData
      );

      if (response.status === 200) {
        alert("Raport sent");
        // window.location.reload();
        // setValue(2);
      }
    } catch (error) {
      console.log("Error sending report:", error);
      alert(error.response.data.error);
    }
  };

  console.log(pdfData);

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
  console.log(pdfData);

  console.log("RAPORT : ", raports);

  if (!pdfData) {
    return <div>Loading PDF...</div>;
  }

  return (
    <section className="flex flex-col mt-20">
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
      <h1 className="text-2xl text-center font-bold mt-5 mb-5">
        Fiche de Maintenance
      </h1>
      <div className="flex justify-center bg-gray-100">
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
                borderRadius: 2,
              }}
            >
              <Tab
                label="Historiqye maintenance"
                {...a11yProps(0)}
                sx={{
                  color: "white",
                }}
              />
              <Tab
                label="écrire un Raport"
                {...a11yProps(1)}
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
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 100, overflowX: "auto" }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Date</TableCell>
                      <TableCell align="center">Sociéte</TableCell>
                      <TableCell align="center">Tàche effectuer</TableCell>
                      <TableCell align="center">
                        Date du prochain maintenance
                      </TableCell>
                      <TableCell align="center">P/C</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {raports &&
                      raports.map((raport, index) => (
                        <TableRow
                          key={raport.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {
                              new Date(raport.dateDernierEntretien)
                                .toISOString()
                                .split("T")[0]
                            }
                          </TableCell>
                          <TableCell align="center">{raport.société}</TableCell>
                          <TableCell align="center">
                            {raport.piècesChangées}
                          </TableCell>
                          <TableCell align="center">
                            {
                              new Date(raport.dateProchainEntretien)
                                .toISOString()
                                .split("T")[0]
                            }
                          </TableCell>
                          <TableCell align="center">
                            {raport.options.map((el) => el)}
                          </TableCell>
                          <TableCell align="center" sx={{ cursor: "pointer" }}>
                            <InfoOutlinedIcon
                              sx={{ color: "#3291F0" }}
                              onClick={() => handleOpen(raport.société)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>

            <TabPanel
              value={value}
              index={1}
              dir={theme.direction}
              className="bg-white"
            >
              <div>
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
                <div className="flex items-center justify-between w-1/4 flex-wrap gap-2">
                  <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                      <input
                        id="option1"
                        type="radio"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                        value="Correctif"
                        checked={selectedOption === "Correctif"}
                        onChange={() => handleOptionChange("Correctif")}
                      />
                    </div>
                    <label
                      htmlFor="option1"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Correctif
                    </label>
                  </div>
                  <div className="flex items-start mb-6 ">
                    <div className="flex items-center h-5">
                      <input
                        id="option2"
                        type="radio"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                        value="Préventif"
                        checked={selectedOption === "Préventif"}
                        onChange={() => handleOptionChange("Préventif")}
                      />
                    </div>
                    <label
                      htmlFor="option2"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Préventif
                    </label>
                  </div>
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
                <div className="mb-6">
                  <label
                    htmlFor="repeat-password"
                    className="block mb-2 text-sm text-gray-900 dark:text-white font-bold"
                  >
                    Code du confirmation
                  </label>
                  <input
                    type="text"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light"
                    required
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  onClick={sendRaport}
                  className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Envoyer le Raport
                </button>
              </div>
            </TabPanel>
          </SwipeableViews>
        </Box>
      </div>
    </section>
  );
};

export default PublicView;
