import React, { Fragment, useEffect, useRef, useState } from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
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
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import SiteOption from "./SiteOption";
import FilterListIcon from "@mui/icons-material/FilterList";

function MultiSelectTreeView({
  folders,
  setOpenSection,
  setButtonType,
  setFolderIdUpdate,
}) {
  const ID = folders._id;
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
    <div className="flex w-full items-center justify-between">
      <span className=" w-[50%] ">{`${folders.adresse}`}</span>
      <span className=" w-[21%] ">CP:{`${folders.code_postal}`}</span>
      <SiteOption
        folders={folders}
        setOpenSection={setOpenSection}
        setButtonType={setButtonType}
        setFolderIdUpdate={setFolderIdUpdate}
        ID={ID}
      />
    </div>
  );

  return (
    <Box
      sx={{
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        borderRadius: "8px",
        overflow: "hidden",
        transition: "height 0.3s",
        height: isExpanded(folders._id) ? "auto" : "40px",
        backgroundColor: "white",
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
          onClick={() => {
            handleToggle(null, [folders._id]);
          }}
        >
          {folders.content.map((subFolder) => (
            <Link
              to={`/${folders.adresse}/${subFolder.subFolder.name}/pdf`}
              className="flex item-center"
            >
              {subFolder.subFolder.name === "Chauffage" ? (
                <HvacIcon sx={{ color: "blue" }} />
              ) : subFolder.subFolder.name === "Climatisation" ? (
                <AcUnitIcon sx={{ color: "blue" }} />
              ) : subFolder.subFolder.name === "Ventilasion" ? (
                <HeatPumpIcon sx={{ color: "blue" }} />
              ) : subFolder.subFolder.name === "Armoire electrique" ? (
                <KitchenIcon sx={{ color: "blue" }} />
              ) : null}
              <TreeItem
                key={subFolder._id}
                nodeId={subFolder._id}
                label={subFolder.subFolder.name}
              />
            </Link>
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
  const [folders, setFolders] = useState(null);
  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);
  const [buttonType, setButtonType] = useState("");
  const [folderIdUpdate, setFolderIdUpdate] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    address: true,
    code_postal: true,
    subfolder: true,
  });
  const [filterQuery, setFilterQuery] = useState("");

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

        const response = await axios.get("http://localhost:3000/sites", config);
        setFolders(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFolders();
  }, []);

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClose = () => {
    setOpenSection(false);
  };

  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };

  return (
    <>
      <Dialog open={filterOpen} onClose={handleCloseFilter}>
        <DialogTitle>Filter Options</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filterOptions.address}
                    onChange={(e) =>
                      setFilterOptions((prevState) => ({
                        ...prevState,
                        address: e.target.checked,
                      }))
                    }
                  />
                }
                label="Filter by Address"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filterOptions.code_postal}
                    onChange={(e) =>
                      setFilterOptions((prevState) => ({
                        ...prevState,
                        code_postal: e.target.checked,
                      }))
                    }
                  />
                }
                label="Filter by Code Postal"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filterOptions.subfolder}
                    onChange={(e) =>
                      setFilterOptions((prevState) => ({
                        ...prevState,
                        subfolder: e.target.checked,
                      }))
                    }
                  />
                }
                label="Filter by Subfolder"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filterOptions.chauffage}
                    onChange={(e) =>
                      setFilterOptions((prevState) => ({
                        ...prevState,
                        chauffage: e.target.checked,
                      }))
                    }
                  />
                }
                label="Filter by Chauffage"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filterOptions.climatiseur}
                    onChange={(e) =>
                      setFilterOptions((prevState) => ({
                        ...prevState,
                        climatiseur: e.target.checked,
                      }))
                    }
                  />
                }
                label="Filter by Climatiseur"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filterOptions.ventilateur}
                    onChange={(e) =>
                      setFilterOptions((prevState) => ({
                        ...prevState,
                        ventilateur: e.target.checked,
                      }))
                    }
                  />
                }
                label="Filter by Ventilateur"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filterOptions.armoireElectrique}
                    onChange={(e) =>
                      setFilterOptions((prevState) => ({
                        ...prevState,
                        armoireElectrique: e.target.checked,
                      }))
                    }
                  />
                }
                label="Filter by Armoire Electrique"
              />
            </FormGroup>
          </FormControl>
          <Button variant="contained" onClick={handleCloseFilter}>
            Apply Filter
          </Button>
        </DialogContent>
      </Dialog>
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
      <div className="pt-10">
        <div className="flex justify-center items-center">
          <h1 className="text-3xl text-center font-bold pr-10">Votre Sites</h1>
        </div>
      </div>

      {/* SEARCH SECTION */}
      <div className="flex mt-10 justify-center ">
        <div className="flex items-center justify-between w-[70%] ">
          <div className="w-[40%] items-center">
            <form className="flex items-center">
              <label htmlFor="simple-search" className="sr-only">
                Search
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
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  required
                />
              </div>
            </form>
          </div>
          <div className="flex justify-between items-center w-[20%]">
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <button
                type="button"
                className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                o
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
            </div>
            <FilterListIcon
              onClick={() => handleOpenFilter()}
              sx={{ cursor: "pointer" }}
            />
          </div>
        </div>
        {/* SEARCH SECTION */}
      </div>

      <div
        className={`mt-10 ${
          screenSize.width < 700
            ? "w-[20rem]"
            : "flex justify-center items-center w-full"
        } `}
      >
        <div
          className={`${
            screenSize.width < 700 ? "h-screen " : "flex flex-wrap w-[60rem] "
          }`}
        >
          {folders && folders.length ? (
            folders
              ?.filter((folder) => {
                const lowerCaseSearchQuery = searchQuery.toLowerCase();

                // Apply filters based on filterOptions
                const shouldFilterByAddress =
                  filterOptions.address &&
                  folder.adresse.toLowerCase().includes(lowerCaseSearchQuery);
                const shouldFilterByCodePostal =
                  filterOptions.code_postal &&
                  folder.code_postal.includes(lowerCaseSearchQuery);
                const shouldFilterBySubfolder =
                  filterOptions.subfolder &&
                  folder.content.some((subFolder) =>
                    subFolder.subFolder.name
                      .toLowerCase()
                      .includes(lowerCaseSearchQuery)
                  );

                // Return true if any of the filters match
                return (
                  shouldFilterByAddress ||
                  shouldFilterByCodePostal ||
                  shouldFilterBySubfolder
                );
              })
              .map((folder, index) => (
                <div
                  className={`${
                    screenSize.width < 700 ? "w-full mt-5" : "w-1/3 px-4 mt-4"
                  }`}
                  key={index}
                >
                  {/* <span className=" w-[50%] ">{`${folder.name}`}</span> */}

                  <MultiSelectTreeView
                    folders={folder}
                    key={index}
                    setOpenSection={setOpenSection}
                    setButtonType={setButtonType}
                    setFolderIdUpdate={setFolderIdUpdate}
                  />
                </div>
              ))
          ) : (
            <p>No folders exsist</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Sites;
