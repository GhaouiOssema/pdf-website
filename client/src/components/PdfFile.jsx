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
import { useSpring, animated } from "@react-spring/web";
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

const PdfFile = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pdfs, setPdfs] = useState([]);
  const { site, dossier } = useParams();
  const [alertMsg, setAlertMsg] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [deletingPdfTitle, setDeletingPdfTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [filteredPdfs, setFilteredPdfs] = useState([]);
  const itemsPerPage = 7;
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

  const displayedPdfs =
    filteredPdfs.length > 0 ? filteredPdfs : pdfs.slice(startIndex, endIndex);

  useEffect(() => {
    // Filter the displayedPdfs based on the search query
    const filtered = pdfs
      .slice(startIndex, endIndex)
      .filter(
        (pdf) =>
          pdf.mainPdf.filename
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          pdf.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    setFilteredPdfs(filtered);
  }, [pdfs, searchQuery, startIndex, endIndex]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
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
          `${import.meta.env.VITE_SERVER_API_URL}/${site}/${dossier}/pdfs`,
          config
        );

        if (response.status === 200) {
          setPdfs(response.data.pdfs);
        } else {
          setPdfs([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchPdfs();
  }, [site, dossier]);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = async (title) => {
    setDeleteLoading(true);
    setDeletingPdfTitle(title);
    try {
      const res = await axios.delete(
        `${
          import.meta.env.VITE_SERVER_API_URL
        }/${site}/${dossier}/pdfs/${title}`,
        config
      );
      if (res.status === 200) {
        setDeleteLoading(false);
        window.location.reload();
      }
    } catch (error) {
      console.log("Error deleting PDF file:", error);
    }
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900 h-screen">
      <div>
        <h1 className="text-xl sm:text-xl md:text-xl lg:text-xl text-center font-bold mb-4 pt-2 flex justify-center flex-wrap px-4">
          Tous les équipements pour {dossier}
        </h1>

        <div className="mx-auto max-w-screen-xl lg:px-12 px-4">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden rounded-lg">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              {/* Search input */}
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">
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
                      id="simple-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Recherche"
                      required
                      value={searchQuery}
                      onChange={handleSearch}
                    />
                  </div>
                </form>
              </div>
            </div>
            {/* PDF file table */}
            {!loading && pdfs.length > 0 ? (
              <div className="overflow-x-auto max-h-100">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-4 py-3">
                        Titre
                      </th>
                      <th scope="col" className="text-left py-3">
                        Date du création
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
                            <div className="flex items-center">
                              <i className="fa-solid fa-file-pdf text-2xl text-red-500"></i>
                              <span className="ml-3">{pdf.title}</span>
                            </div>
                          </Link>
                        </th>

                        <td className="px-4 py-3">
                          <Link
                            to={`/${site}/${dossier}/pdf/détails/${pdf._id}`}
                          >
                            {
                              new Date(pdf.creationDate)
                                .toISOString()
                                .split("T")[0]
                            }
                          </Link>
                        </td>
                        <td className="px-4 py-3 flex items-center justify-end">
                          <div
                            onClick={() => handleDelete(pdf.title)}
                            className="w-full flex justify-around items-center font-bold text-red-500"
                          >
                            {deleteLoading && deletingPdfTitle === pdf.title ? (
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
            ) : loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "20vh",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <p className="text-center mt-4">Aucun PDF disponible.</p>
            )}
            {/* Pagination */}
            <nav
              className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
              aria-label="Table navigation"
            >
              <ul className="inline-flex items-stretch -space-x-px">
                {/* Previous page button */}
                <li>
                  <button
                    onClick={() => changePage(currentPage - 1)}
                    className={`flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                      currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={currentPage === 1}
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
                  </button>
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
                  <button
                    onClick={() => changePage(currentPage + 1)}
                    className={`flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                      currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={currentPage === totalPages}
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
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

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
    </section>
  );
};

export default PdfFile;
