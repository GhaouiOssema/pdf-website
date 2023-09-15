import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Table } from "flowbite-react";
import {
  Backdrop,
  CircularProgress,
  Dialog,
  DialogContent,
  Fade,
  Modal,
  Paper,
  Slide,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { itemTextStyle, itemsStyle, style, truncateText } from "../utils/utils";

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
        <Box sx={{ py: 3 }}>
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Popup = ({ popupView, popupErrorMessage }) => {
  return (
    <Dialog
      open={popupView}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        {popupErrorMessage ? (
          <>
            <div className="text-[#DC2626] text-center text-3xl mb-4 flex justify-center items-center">
              <i class="fa-solid fa-triangle-exclamation"></i>
            </div>
            <p className="font-sans font-semibold text-[#DC2626] text-center">
              {popupErrorMessage}
            </p>
          </>
        ) : (
          <>
            <div className="text-[#008000] text-center text-3xl mb-4 flex justify-center items-center">
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <p className="font-sans font-semibold text-[#008000] text-center">
              Mission accomplie ! Le nouveau rapport a été envoyé avec succès.
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

const PdfView = () => {
  const { site, dossier, id } = useParams();
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
  const [popupView, setPopupView] = useState(false);
  const [popupErrorMessage, setPopupErrorMessage] = useState(false);
  const popupRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setPopupView(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  const handleOpen = (soc) => {
    setOpen(true);
    const filteredReports = raports.filter((raport) => raport._id === soc);
    setFilteredRaports(filteredReports);
  };

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
          }/site/folder/pdf/details/raports/${id}`,
          config
        );
        setPdfData(response.data.pdf);
      } catch (error) {
        console.log("Error retrieving PDF data:", error);
      }
    };
    getPdfData();
  }, [id]);

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

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
        site,
        dossier,
      };

      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API_URL}/pdfs/${id}/raport`,
        requestData,
        config
      );

      if (response.status === 200) {
        setPopupView(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log("Error sending report:", error);
      if (error.response.status === 403) {
        setPopupView(true);
        setPopupErrorMessage("le code du maintenance est invalide");
      }
    }
  };

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

  if (!pdfData) {
    return (
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
    );
  }

  return (
    <section className="flex flex-col h-screen" ref={popupRef}>
      {popupView && (
        <Popup
          popupView={popupView}
          setOpen={setOpen}
          popupErrorMessage={popupErrorMessage}
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
      <h1 className="text-3xl text-center font-bold mt-5 mb-5">
        Fiche d'entretien
      </h1>
      <div className="flex justify-center bg-gray-100 px-2">
        <Box
          sx={{
            width: { sm: "100%", md: "90%", lg: "80%", xl: "80%" },
            color: "white",
          }}
        >
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
                bgcolor: "#125ba3",
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
                label="Historique de maintenance"
                {...a11yProps(0)}
                sx={{
                  color: "white",
                  fontSize: 12,
                }}
              />
              <Tab
                label="écrire un Raport"
                {...a11yProps(1)}
                sx={{
                  fontSize: 12,
                  color: "white",
                }}
              />
            </Tabs>
          </Box>

          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
            className="text-black lg:w-full md:w-full w-screen-xl"
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <TableContainer className="bg-white rounded-lg w-full">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        Date
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        Société
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          display: {
                            xs: "none",
                            sm: "none",
                            md: "table-cell",
                            lg: "table-cell",
                          },
                          fontWeight: "bold",
                        }}
                      >
                        Tâche effectuée
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          display: {
                            xs: "none",
                            sm: "none",
                            md: "table-cell",
                            lg: "table-cell",
                          },
                          fontWeight: "bold",
                        }}
                      >
                        Date du prochain entretien
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          display: {
                            xs: "none",
                            sm: "table-cell",
                            md: "table-cell",
                            lg: "table-cell",
                          },
                          fontWeight: "bold",
                        }}
                      >
                        P/C
                      </TableCell>
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
                          <TableCell component="th" align="center" scope="row">
                            <span className="font-sans">
                              {
                                new Date(raport.dateDernierEntretien)
                                  .toISOString()
                                  .split("T")[0]
                              }
                            </span>
                          </TableCell>
                          <TableCell align="center">
                            <span className="font-sans">{raport.société}</span>
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              display: {
                                xs: "none",
                                sm: "none",
                                md: "table-cell",
                                lg: "table-cell",
                              },
                            }}
                          >
                            <span className="font-sans">
                              {truncateText(raport.piècesChangées, 40)}
                            </span>
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              display: {
                                xs: "none",
                                sm: "none",
                                md: "table-cell",
                                lg: "table-cell",
                              },
                            }}
                          >
                            <span className="font-sans">
                              {
                                new Date(raport.dateProchainEntretien)
                                  .toISOString()
                                  .split("T")[0]
                              }
                            </span>
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              display: {
                                xs: "none",
                                sm: "table-cell",
                                md: "table-cell",
                                lg: "table-cell",
                              },
                            }}
                          >
                            <span className="font-sans">
                              {raport.options.map((el) => el)}
                            </span>
                          </TableCell>
                          <TableCell align="center" sx={{ cursor: "pointer" }}>
                            <InfoOutlinedIcon
                              sx={{ color: "#3291F0" }}
                              onClick={() => handleOpen(raport._id)}
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
              className="bg-white my-5 rounded-lg px-3"
            >
              <div>
                <label className="text-center block mb-2 text-md font-sans font-medium text-gray-900 dark:text-white">
                  Veuillez saisir les informations ci dessous
                </label>
                <div className="mb-6 mt-5">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-sans font-medium mb-2 text-start"
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
                    className="block mb-2 text-md font-sans font-medium text-gray-700 dark:text-white"
                  >
                    Observation
                  </label>
                  <textarea
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Écrivez votre observation ici"
                    value={observation}
                    onChange={(e) => setObservation(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="repeat-password"
                    className="block mb-2 text-md font-sans font-medium text-gray-700 dark:text-white"
                  >
                    Piéce changée
                  </label>
                  <input
                    type="text"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light"
                    required
                    value={partChanged}
                    onChange={(e) => setPartChanged(e.target.value)}
                    placeholder="ex: mouteur, cable ...."
                  />
                </div>
                <div className="w-full mb-6">
                  <div className="flex items-center justify-between w-[20rem]">
                    <div className="py-2 flex items-center justify-start">
                      <div className="py-2 flex items-center h-5">
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
                        className="ml-2 text-sm font-sans font-medium text-gray-700 dark:text-gray-300"
                      >
                        Correctif
                      </label>
                    </div>
                    <div className="flex items-center justify-end">
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
                        className="ml-2 text-sm font-sans font-medium text-gray-700 dark:text-gray-300"
                      >
                        Préventif
                      </label>
                    </div>
                  </div>
                </div>
                <div className="block mb-6 sm:w-1/2 w-full">
                  <label
                    for="date"
                    className="w-full h-full font-sans font-medium text-gray-700 dark:text-white"
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
                    className="block mb-2 text-sm text-gray-900 dark:text-white font-sans font-bold"
                  >
                    Code du confirmation
                  </label>
                  <input
                    type="password"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light"
                    required
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  onClick={sendRaport}
                  className="text-white bg-[#125ba3] hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
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

export default PdfView;
