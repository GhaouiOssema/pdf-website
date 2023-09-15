import React, { Fragment, useEffect, useRef, useState } from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import {
  Backdrop,
  Box,
  CircularProgress,
  Snackbar,
  Stack,
} from "@mui/material";
import HvacIcon from "@mui/icons-material/Hvac";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import KitchenIcon from "@mui/icons-material/Kitchen";
import HeatPumpIcon from "@mui/icons-material/HeatPump";
import View from "./View";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { Link } from "react-router-dom";
import SiteOption from "./SiteOption";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";

const MultiSelectTreeView = ({
  folders,
  setOpenSection,
  setButtonType,
  setFolderIdUpdate,
  expanded,
  setExpanded,
  setExistingFolders,
  existingFolders,
}) => {
  const contentRef = useRef(null);

  const handleToggle = (event, nodeIds) => {
    const nodeId = nodeIds[0];
    const isNodeExpanded = expanded.includes(nodeId);

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
    <div className="w-full flex items-center justify-center py-1">
      <div className="w-full">
        <div className="w-full flex flex-col">
          <span className="pl-4 font-sans tex-md">Nom: {folders.name}</span>
          <span className="pl-4 w-full h-full tex-md class__ligth">
            Adresse: {folders.adresse.replace(/^site:\s*/i, "")}
          </span>
          <span className=" tex-md font-normal">
            <span className="pl-4 font-bold">CP:</span> {folders.code_postal}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <Box
      sx={{
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        overflow: "hidden",
        transition: "height 0.3s",
        height: isExpanded(folders._id) ? "auto" : "80px",
        backgroundColor: "white",
      }}
      className="rounded-lg w-full"
    >
      <TreeView
        aria-label="multi-select"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        multiSelect
        expanded={expanded}
        onNodeToggle={handleToggle}
        sx={{
          height: "100%",
          flexDirection: "row-reverse",
        }}
      >
        <div className="flex flex-row-reverse justify-between">
          <div className="absolute z-50">
            <SiteOption
              folders={folders}
              setOpenSection={setOpenSection}
              setButtonType={setButtonType}
              setFolderIdUpdate={setFolderIdUpdate}
              existingFolders={existingFolders}
              setExistingFolders={setExistingFolders}
            />
          </div>
          <TreeItem
            key={folders._id}
            nodeId={folders._id}
            label={labelFormat}
            onClick={() => {
              handleToggle(null, [folders._id]);
            }}
            sx={{ width: "100%" }}
          >
            {folders && (
              <>
                {folders.content.map((subFolder) => {
                  const folderName = subFolder.subFolder.name;
                  let iconComponent = null;

                  switch (folderName) {
                    case "Chauffage":
                      iconComponent = <HvacIcon sx={{ color: "blue" }} />;
                      break;
                    case "Climatisation":
                      iconComponent = <AcUnitIcon sx={{ color: "blue" }} />;
                      break;
                    case "Ventilasion":
                      iconComponent = <HeatPumpIcon sx={{ color: "blue" }} />;
                      break;
                    case "Armoire electrique":
                      iconComponent = <KitchenIcon sx={{ color: "blue" }} />;
                      break;
                    default:
                      break;
                  }

                  return (
                    <Link
                      key={subFolder._id}
                      to={`/${folders.adresse}/${folderName}/pdf`}
                      className="flex item-center"
                    >
                      {iconComponent}
                      <TreeItem
                        key={subFolder._id}
                        nodeId={subFolder._id}
                        label={folderName}
                      />
                    </Link>
                  );
                })}
              </>
            )}
          </TreeItem>
        </div>
      </TreeView>
    </Box>
  );
};

const ATert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Sites = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [openSection, setOpenSection] = useState(false);

  const [folders, setFolders] = useState([]);
  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);
  const [buttonType, setButtonType] = useState("");
  const [folderIdUpdate, setFolderIdUpdate] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState([]);
  const [existingFolders, setExistingFolders] = useState(null);

  const [filterOptions, setFilterOptions] = useState({
    name: true,
    address: true,
    code_postal: true,
    subfolder: true,
  });

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
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_API_URL}/sites`,
          config
        );
        if (response.status === 200) {
          setFolders(response.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchFolders();
  }, []);

  const handleClose = () => {
    setOpenSection(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={openSection}
      >
        <View
          type={buttonType}
          close={handleClose}
          setOpen={setOpen}
          setAlertMsg={setAlertMsg}
          handleClick={handleClick}
          alertMsg={alertMsg}
          folderIdUpdate={folderIdUpdate}
          existingFolders={existingFolders}
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
                Site ajouté avec succès
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

      <div className="mx-auto max-w-screen-lg lg:px-12 px-4 py-6">
        <div className="bg-[#125ba3] mx-auto max-w-screen-xl px-4 rounded-md flex flex-wrap items-center justify-between py-2">
          <span className="font-sans font-semibold text-white ">Mes Sites</span>
          <span className="font-sans font-normal text-white ">
            {folders.length}
          </span>
        </div>
      </div>

      {/* SEARCH SECTION */}

      <div className="flex mt-10 justify-center items-center">
        <div className="flex items-center justify-between w-[70%] ">
          {/* Search input */}
          <div className="w-full items-center mt-4 md:mt-0 flex flex-col">
            <form className="flex items-center w-full md:w-[80%]">
              <label htmlFor="search" className="sr-only">
                Recherche
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="search"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Recherche"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  required
                />
              </div>
            </form>
          </div>

          {/* Add button */}
          <div className="md:w-[40%] mt-4 md:mt-0 flex flex-col items-center">
            <button
              type="button"
              className="md:flex items-center justify-center text-white bg-[#125ba3] hover:bg-primary-500 font-medium rounded-lg text-sm px-4 py-2 dark:bg-[#125ba3] dark:hover:bg-primary-500 focus:outline-none hidden transition ease-in duration-300"
              onClick={() => {
                setButtonType("siteButton");
                setOpenSection(true);
              }}
            >
              <svg
                className="h-3.5 w-3.5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                />
              </svg>
              Ajouter un Site
            </button>
            <button
              type="button"
              className="md:hidden ml-5 flex items-center justify-center text-white bg-[#125ba3] hover:bg-primary-500 font-medium rounded-lg text-sm px-4 py-2 dark:bg-[#125ba3] dark:hover:bg-primary-500 focus:outline-none transition ease-in duration-300"
              onClick={() => {
                setButtonType("siteButton");
                setOpenSection(true);
              }}
            >
              <svg
                className="h-3.5 w-3.5 md:mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* SEARCH SECTION */}
      </div>

      <div
        className={`mt-10 px-4 ${
          screenSize.width < 700
            ? "w-full"
            : "flex justify-center items-center mx-auto max-w-screen-lg lg:px-12 py-4"
        } `}
      >
        <div
          className={`h-full ${
            screenSize.width < 700
              ? ""
              : folders &&
                folders.length > 0 &&
                screenSize.width > 700 &&
                !loading
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 w-full"
              : !folders &&
                !folders.length < 0 &&
                !loading &&
                screenSize.width > 700
              ? "flex w-full"
              : ""
          }`}
        >
          <>
            {!loading && folders.length > 0 ? (
              folders
                ?.filter((folder) => {
                  const lowerCaseSearchQuery = searchQuery.toLowerCase();

                  const shouldFilterByAddress =
                    filterOptions?.address &&
                    folder?.adresse
                      ?.toLowerCase()
                      ?.includes(lowerCaseSearchQuery);
                  const shouldFilterByName =
                    filterOptions?.name &&
                    folder?.name?.toLowerCase()?.includes(lowerCaseSearchQuery);
                  const shouldFilterByCodePostal =
                    filterOptions?.code_postal &&
                    folder?.code_postal?.includes(lowerCaseSearchQuery);
                  const shouldFilterBySubfolder =
                    filterOptions?.subfolder &&
                    folder?.content?.some((subFolder) =>
                      subFolder?.subFolder?.name
                        ?.toLowerCase()
                        ?.includes(lowerCaseSearchQuery)
                    );

                  return (
                    shouldFilterByAddress ||
                    shouldFilterByCodePostal ||
                    shouldFilterBySubfolder ||
                    shouldFilterByName
                  );
                })
                .map((folder, index) => (
                  <div
                    className={`rounded-lg ${
                      screenSize.width < 700
                        ? "w-full mt-4"
                        : "w-full py-3 flex justify-center px-1"
                    }`}
                    key={index}
                  >
                    <MultiSelectTreeView
                      folders={folder}
                      key={index}
                      setOpenSection={setOpenSection}
                      setButtonType={setButtonType}
                      setFolderIdUpdate={setFolderIdUpdate}
                      expanded={expanded}
                      setExpanded={setExpanded}
                      existingFolders={existingFolders}
                      setExistingFolders={setExistingFolders}
                    />
                  </div>
                ))
            ) : loading ? (
              <div className="w-full h-full flex flex-col  items-center">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50vh",
                  }}
                >
                  <CircularProgress />
                </Box>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center opacity-20">
                <DoNotDisturbIcon
                  sx={{
                    height: 250,
                    width: 250,
                    opacity: "100%",
                    color: "black",
                  }}
                />
                <p className="w-full font-sans font-bold text-xl text-center break-words">
                  Il n'existe aucun site .
                </p>
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default Sites;
