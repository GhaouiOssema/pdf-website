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
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";

import DOEButtonsGroup from "./PublicDOEButtonsGroup";
import { CircularProgress } from "@mui/material";

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

const PublicDoeFiles = () => {
  const { id } = useParams();
  const [pdfData, setPdfData] = useState(null);
  useEffect(() => {
    const getPdfData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_SERVER_API_URL
          }/public/site/folder/pdf/details/doe/${id}`
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

  if (pdfData?.doeFiles.length === 0) {
    return (
      <div className="h-screen flex justify-center items-center opacity-20">
        <div className="flex flex-col justify-center items-center">
          <DoNotDisturbIcon
            sx={{
              height: 250,
              width: 250,
              opacity: "100%",
              color: "black",
            }}
          />
          <p className="w-full font-sans font-bold text-xl text-center break-words">
            Aucun fiche technique n'est lié à cet équipement.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="flex flex-col max-w-screen-2xl">
      <h1 className="text-3xl text-center font-bold mt-5 mb-5">
        Les DOE d'equipement
      </h1>
      <div className="flex justify-center ">
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
                label="DOE"
                {...a11yProps(0)}
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
            <TabPanel
              value={value}
              index={0}
              dir={theme.direction}
              className=" w-full"
            >
              <DOEButtonsGroup pdfData={pdfData} />
            </TabPanel>
          </SwipeableViews>
        </Box>
      </div>
    </section>
  );
};

export default PublicDoeFiles;
