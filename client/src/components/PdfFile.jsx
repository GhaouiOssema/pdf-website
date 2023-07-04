import React, { useState, useEffect, Fragment } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Button,
  Box,
  Alert,
  Snackbar,
  CircularProgress,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import { useSpring, animated } from "@react-spring/web";
import { Label, TextInput } from "flowbite-react";
import MuiAlert from "@mui/material/Alert";

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

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

const ATert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CircularIndeterminate = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress size={20} sx={{ color: "red" }} />
    </Box>
  );
};

const SpringModal = ({ open, setOpen, handleClickAlert, setAlertMsg }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [uploadError, setUploadError] = useState(null);
  const { site, dossier } = useParams();
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFilesChange = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files);
    setSelectedFiles(filesArray);
  };
  console.log(selectedFiles);

  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleMultiSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("files", selectedFiles[i]);
      }
      formData.append("pdfTitle", fileName);

      // Replace 'your-upload-url' with the actual URL to your backend route
      const response = await axios.post(
        `http://localhost:3000/multiUpload`,
        formData
      );

      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log("Error uploading files:", error);
      // Handle the error as needed
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("title", fileName);
      formData.append("folder", site);
      formData.append("subFolder", dossier);
      console.log(site);
      console.log(dossier);

      try {
        const response = await axios.post(
          "http://localhost:3000/upload",
          formData,
          config
        );

        if (response.status === 200) {
          setAlertMsg("success");
          handleClickAlert();
          window.location.reload();
        } else {
          setAlertMsg("error");
          handleClickAlert();
        }

        setSelectedFile(null);
        setFileName("");
        handleClose();
        setUploadError(null);
      } catch (error) {
        console.error("Error uploading file:", error);
        setUploadError("An error occurred during file upload.");
      }
    }
  };

  const handleReset = () => {
    setFileName(null);
    setSelectedFile(null);
  };
  console.log(fileName);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="rounded-2xl">
            <form
              className="flex max-w-md flex-col gap-4"
              onSubmit={open === "file" ? handleSubmit : handleMultiSubmit}
              onReset={handleReset}
            >
              {/* File input */}
              <Typography sx={{ fontWeight: "bold" }}>
                {open === "file" ? (
                  <span>Les information du Fichier</span>
                ) : open === "multiFile" ? (
                  <span>Les information du DOE</span>
                ) : null}
              </Typography>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor={
                    open === "file"
                      ? "dropzone-file"
                      : open === "multiFile"
                      ? "dropzone-multi-file"
                      : null
                  }
                  className="flex flex-col items-center justify-center w-full h-19 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100 dark:hover:border-gray-500"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-2">
                    <svg
                      aria-hidden="true"
                      className="w-10 h-10 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Replace with your own SVG icon */}
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      Select a file
                    </p>
                  </div>
                  {open === "file" ? (
                    <input
                      id="dropzone-file"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      hidden
                    />
                  ) : open === "multiFile" ? (
                    <input
                      id="dropzone-multi-file"
                      type="file"
                      accept=".pdf"
                      onChange={handleFilesChange}
                      hidden
                      multiple
                    />
                  ) : null}
                </label>
              </div>

              <>
                {selectedFile && (
                  <Stack
                    sx={{
                      width: "100%",
                      color: "black",
                      marginTop: "10px",
                    }}
                    spacing={2}
                  >
                    <Alert severity="info">
                      <span>{selectedFile.name}</span>
                    </Alert>
                  </Stack>
                )}
              </>

              {/* File name input */}

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="filename" value="File name" />
                </div>
                <TextInput
                  id="filename"
                  placeholder="Enter file name"
                  value={fileName}
                  onChange={(event) => setFileName(event.target.value)}
                  required
                  shadow
                  type="text"
                />
              </div>

              {/* Form actions */}
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg focus:outline-none focus:shadow-outline hover:bg-green-500"
                >
                  Add
                </button>
                <button
                  type="reset"
                  className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 ml-5 rounded-lg focus:outline-none focus:shadow-outline hover:bg-red-500"
                >
                  Restore
                </button>
              </div>

              {/* Display error message, if any */}
              {uploadError && <p className="text-red-500">{uploadError}</p>}
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

const ITEM_HEIGHT = 48;

const PdfFile = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [pdfs, setPdfs] = useState([]);
  const { site, dossier } = useParams();
  const [alertMsg, setAlertMsg] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [deletingPdfTitle, setDeletingPdfTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  console.log("SITE :", site);
  console.log("dossier :", dossier);

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
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
    const fetchPdfs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/${site}/${dossier}/pdfs`,
          config
        );

        setPdfs(response.data.pdfs);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPdfs();
  }, [site, dossier]);
  console.log(pdfs);

  const handleDelete = async (title) => {
    setLoading(true);
    setDeletingPdfTitle(title);
    try {
      const res = await axios.delete(
        `http://localhost:3000/${site}/${dossier}/pdfs/${title}`,
        config
      );
      if (res.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log("Error deleting PDF file:", error);
    }
  };
  const handleEdit = (id) => {};

  const itemsPerPage = 20;
  const totalPages = Math.ceil(pdfs.length / itemsPerPage);

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedPdfs = pdfs.slice(startIndex, endIndex);

  return (
    <>
      {openModal === "file" || "multiFile" ? (
        <SpringModal
          open={openModal}
          setOpen={setOpenModal}
          setAlertMsg={setAlertMsg}
          handleClickAlert={handleClickAlert}
          handleCloseAlert={handleCloseAlert}
        />
      ) : null}
      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <h1 className="text-3xl text-center font-bold mb-4 mt-10">
          All PDF Files {dossier}
        </h1>

        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              {/* Search input */}
              <div className="w-full md:w-1/2">
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
                      required
                    />
                  </div>
                </form>
              </div>

              {/* Add file button */}
              <div className="flex justify-between md:w-[22rem]">
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  <button
                    type="button"
                    className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                    onClick={() => setOpenModal("multiFile")}
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
                    Ajouter le DOE
                  </button>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  <button
                    type="button"
                    className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                    onClick={() => setOpenModal("file")}
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
                    Ajouter un fichier
                  </button>
                </div>
              </div>
            </div>

            {/* PDF file table */}
            {pdfs.length > 0 || pdfs.length !== 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-4 py-3">
                        File Name
                      </th>
                      <th scope="col" className="px-4 py-3">
                        File Title
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Creation Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedPdfs.map((pdf, index) => (
                      <tr
                        key={index}
                        className="border-b dark:border-gray-700 cursor-pointer"
                      >
                        <th
                          scope="row"
                          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <Link
                            to={`/${site}/${dossier}/pdf/détails/${pdf._id}`}
                          >
                            {pdf.filename}
                          </Link>
                        </th>
                        <td className="px-4 py-3">
                          <Link
                            to={`/${site}/${dossier}/pdf/détails/${pdf._id}`}
                          >
                            {pdf.title}
                          </Link>
                        </td>
                        <td className="px-4 py-3">
                          <Link
                            to={`/${site}/${dossier}/pdf/détails/${pdf._id}`}
                          >
                            {pdf.creationDate}
                          </Link>
                        </td>
                        <td className="px-4 py-3 flex items-center justify-end">
                          <div
                            onClick={() => handleDelete(pdf.title)}
                            className="w-full flex justify-around items-center font-bold text-red-500"
                          >
                            {loading && deletingPdfTitle === pdf.title ? (
                              <CircularIndeterminate />
                            ) : (
                              <DeleteIcon sx={{ color: "red" }} />
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
            {/* Pagination */}
            <nav
              className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
              aria-label="Table navigation"
            >
              <ul className="inline-flex items-stretch -space-x-px">
                {/* Previous page button */}
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>

                {/* Page number buttons */}
                {pageNumbers.map((pageNumber) => (
                  <li key={pageNumber}>
                    <a
                      href="#"
                      className={`flex items-center justify-center text-sm py-2 px-3 leading-tight ${
                        pageNumber === currentPage
                          ? "text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                          : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      }`}
                      onClick={() => changePage(pageNumber)}
                    >
                      {pageNumber}
                    </a>
                  </li>
                ))}

                {/* Next page button */}
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>

      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
        >
          {alertMsg === "success" ? (
            <ATert
              onClose={handleCloseAlert}
              severity="success"
              sx={{ width: "100%" }}
            >
              Fichier ajouté avec succès
            </ATert>
          ) : alertMsg === "error" ? (
            <ATert
              onClose={handleCloseAlert}
              severity="error"
              sx={{ width: "100%" }}
            >
              Veuillez insérer un fichier!
            </ATert>
          ) : null}
        </Snackbar>
      </Stack>
    </>
  );
};

export default PdfFile;
