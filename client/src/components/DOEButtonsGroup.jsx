import React, { useState } from "react";
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
  console.log(pdfData);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

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
            {pdfData?.doeFiles?.map((file, idx) => (
              <Tab
                key={idx}
                label={
                  <Stack direction="row" spacing={1}>
                    <Chip label={file.filename} onClick={handleClick} />
                  </Stack>
                }
                {...a11yProps(idx)} // Use 'idx' as the a11yProps value
              />
            ))}
          </Tabs>
        </Box>
      </div>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {/* Iterate over the pdfData.doeFiles array and render TabPanel for each file */}
        {pdfData?.doeFiles?.map((file, idx) => (
          <TabPanel key={idx} value={value} index={idx} dir={theme.direction}>
            <Document
              file={`data:application/pdf;base64,${file.data}`} // Use 'file.data' here
              className="hidden__class"
            >
              <Page
                pageNumber={1}
                renderTextLayer={false}
                className="pdf-page"
              />
            </Document>
          </TabPanel>
        ))}
      </SwipeableViews>
    </Box>
  );
};

export default DOEButtonsGroup;
