import React, { Fragment, useEffect, useRef, useState } from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { Backdrop, Box, Button, Snackbar, Stack } from "@mui/material";
import HvacIcon from "@mui/icons-material/Hvac";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import KitchenIcon from "@mui/icons-material/Kitchen";
import HeatPumpIcon from "@mui/icons-material/HeatPump";
import View from "./View";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";

function MultiSelectTreeView({ folders }) {
  const [expanded, setExpanded] = useState([]);
  const contentRef = useRef(null);

  const handleToggle = (event, nodeIds) => {
    const nodeId = nodeIds[0];
    const isNodeExpanded = isExpanded(nodeId);
    if (isNodeExpanded) {
      setExpanded(expanded.filter((id) => id !== nodeId));
    } else {
      setExpanded([...expanded, nodeId]);
    }
  };

  const isExpanded = (nodeId) => {
    return expanded.includes(nodeId);
  };

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.clientHeight;
      if (isExpanded(folders._id)) {
        contentRef.current.style.height = `${contentHeight}px`;
      } else {
        contentRef.current.style.height = "0px";
      }
    }
  }, [expanded, isExpanded, folders._id]);

  let labelFormat = (
    <div className="flex justify-between">
      <span>{`${folders.adresse}`}</span>
      <span>CP:{`${folders.code_postal}`}</span>
    </div>
  );

  return (
    <Box
      sx={{
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        borderRadius: "8px",
        overflow: "hidden",
        transition: "height 0.3s",
        height: isExpanded(folders._id) ? "auto" : "32px",
      }}
    >
      <TreeView
        aria-label="multi-select"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        multiSelect
        expanded={expanded}
        onNodeToggle={handleToggle}
        sx={{ height: "100%", flexDirection: "row-reverse" }}
      >
        <TreeItem
          key={folders._id}
          nodeId={folders._id}
          label={labelFormat}
          icon={<ChevronRightIcon />}
          onClick={() => handleToggle(null, [folders._id])}
        >
          {folders.content.map((subFolder) => (
            <TreeItem
              key={subFolder._id}
              nodeId={subFolder._id}
              label={subFolder.subFolder.name}
            />
          ))}
        </TreeItem>
      </TreeView>
    </Box>
  );
}

const ATert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Sites = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [openSection, setOpenSection] = useState(false);
  const [folders, setFolders] = useState();
  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleClick = () => {
    setOpen(true);
  };

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
    const fetchFolders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/sites");
        setFolders(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFolders();
  }, []);

  const handleClose = () => {
    setOpenSection(false);
  };

  return (
    <>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={openSection}
      >
        <View
          type="siteButton"
          close={handleClose}
          setOpen={setOpen}
          setAlertMsg={setAlertMsg}
          handleClick={handleClick}
          alertMsg={alertMsg}
        />
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleCloseAlert}
          >
            {alertMsg === "success" ? (
              <ATert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Fichier ajouté avec succès
              </ATert>
            ) : alertMsg === "error" ? (
              <ATert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                Veuillez insérer un fichier!
              </ATert>
            ) : null}
          </Snackbar>
        </Stack>
      </Backdrop>
      <div className="flex justify-center items-center w-screen">
        <h1 className="w-screen text-3xl text-center font-bold">Votre Sites</h1>
        <button
          onClick={() => setOpenSection(true)}
          className="w-[12rem] p-3 mr-10 uppercase text-xs font-bold tracking-wide bg-blue-900 text-gray-100 rounded-lg focus:outline-none focus:shadow-outline hover:bg-green-500"
        >
          Ajouter un site
        </button>
      </div>
      <div
        className={`mt-10 ${
          screenSize.width < 700
            ? "w-[20rem]"
            : "flex justify-center items-center"
        } `}
      >
        <div
          className={`${
            screenSize.width < 700 ? "h-screen " : "flex flex-wrap w-full ml-10"
          }`}
        >
          {folders?.map((folder, index) => (
            <div
              className={`${
                screenSize.width < 700 ? "w-full mt-5" : "w-1/3 px-4 mt-4"
              }`}
              key={index}
            >
              <MultiSelectTreeView folders={folder} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sites;
