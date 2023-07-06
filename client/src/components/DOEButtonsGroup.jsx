import * as React from "react";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import { Document, Page, pdfjs } from "react-pdf";

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
const DOEButtonsGroup = ({ pdfData }) => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const { id } = useParams();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const handleClick = () => {
    console.info("You clicked the Chip.");
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

  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt_decode(token);
      const { userName } = decoded;
      setUsername(userName);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const [fileStructure, setFileStructure] = useState([]);

  useEffect(() => {
    const fetchFileStructure = async () => {
      try {
        const response = await axios.get(
          `https://qr-server-6xmb.onrender.com/DOE/${username}/${pdfData.title}`
        );
        const { fileStructure } = response.data;
        setFileStructure(fileStructure);
      } catch (error) {
        console.error("Error fetching file structure:", error);
      }
    };
    fetchFileStructure();
  }, []);

  console.log(`${username}/${pdfData.title}`);

  console.log(fileStructure);

  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
      <div className="flex w-full justify-center">
        <Box
          sx={{
            flexGrow: 1,
            maxWidth: { xs: 320, sm: 480, md: "100%" },
            bgcolor: "white",
          }}
        >
          <Tabs
            value={value}
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
            <Tab
              label={
                <Stack direction="row" spacing={1}>
                  <Chip label="Clickable" onClick={handleClick} />
                </Stack>
              }
              {...a11yProps(0)}
            />
          </Tabs>
        </Box>
      </div>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Document
            file={`https://qr-server-6xmb.onrender.com/oussema/rr/download_01.pdf`}
            className="hidden__class"
          >
            <Page pageNumber={1} renderTextLayer={false} className="pdf-page" />
          </Document>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          Item 5
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
};
export default DOEButtonsGroup;
