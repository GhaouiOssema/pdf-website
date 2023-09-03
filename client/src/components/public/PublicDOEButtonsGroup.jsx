import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { Stack } from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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

function a11yProps(index) {
  return {
    id: index,
    "aria-controls": index,
  };
}

const PublicDOEButtonsGroup = ({ pdfData }) => {
  const theme = useTheme();
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [doeFiles, setDOEFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pdfLoaded, setPdfLoaded] = useState(false);
  const [numPages, setNumPages] = useState(null);
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

  const handlePdfLoadSuccess = ({ numPages }) => {
    setPdfLoaded(true);
    setNumPages(numPages);
  };

  const fetchDOEFiles = async (id) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_SERVER_API_URL
        }/public/site/folder/pdf/details/doeFiles/${id}`,
        { responseType: "arraybuffer" }
      );

      setLoading(true);

      const blob = new Blob([response.data], { type: "application/pdf" });

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Pdf = reader.result.split(",")[1];
        setDOEFiles((prevFiles) => [...prevFiles, base64Pdf]);
        setLoading(false);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      setLoading(false);
      console.log("Error retrieving PDF data:", error);
    }
  };

  const handleChange = (event, newValue) => {
    setSelectedFileIndex(newValue);
    fetchDOEFiles(pdfData.doeFiles[selectedFileIndex].fileId);
  };
  const getPdfViewerWidth = () => {
    const screenWidth = screenSize.width;
    return screenWidth < 700 ? screenWidth - 40 : 1000;
  };

  return (
    <>
      {pdfData.doeFiles && (
        <Box
          sx={{ bgcolor: "background.paper", width: "100%", minHeight: "70vh" }}
        >
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                flexGrow: 1,
                maxWidth: { xs: 500, sm: 500, md: "100%" },
                bgcolor: "white",
              }}
            >
              <Tabs
                value={selectedFileIndex}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                aria-label="visible arrows tabs example"
                sx={{
                  [`& .${tabsClasses.scrollButtons}`]: {
                    "&.Mui-disabled": { opacity: 0.3 },
                  },
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {pdfData.doeFiles.map((file, idx) => (
                  <Tab
                    key={idx}
                    label={
                      <Stack direction="row" spacing={1}>
                        <Chip
                          label={file.filename}
                          onClick={() => setSelectedFileIndex(idx, file.fileId)}
                        />
                      </Stack>
                    }
                    {...a11yProps(idx)}
                  />
                ))}
              </Tabs>
            </Box>
          </Box>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={selectedFileIndex}
            onChangeIndex={setSelectedFileIndex}
          >
            {doeFiles.map((file, idx) => (
              <TabPanel
                key={idx}
                value={selectedFileIndex}
                index={idx}
                dir={theme.direction}
              >
                <Document
                  file={`data:application/pdf;base64,${file}`}
                  onLoadSuccess={handlePdfLoadSuccess}
                  className="flex justify-center"
                >
                  {pdfLoaded &&
                    Array.from(new Array(numPages), (el, index) => (
                      <Page
                        key={index}
                        pageNumber={index + 1}
                        renderTextLayer={false}
                        height={500}
                        width={getPdfViewerWidth()}
                        className="mt-1"
                      />
                    ))}
                </Document>
              </TabPanel>
            ))}
          </SwipeableViews>
        </Box>
      )}
    </>
  );
};

export default PublicDOEButtonsGroup;
