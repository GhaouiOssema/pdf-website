import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Container, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PdfFile = () => {
  const [pdfs, setPdfs] = useState([]);
  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { dossier } = useParams();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    const getPdfData = async () => {
      try {
        const response = await axios.get(
          "https://pdf-server-809j.onrender.com/pdfs"
        );
        setPdfs(response.data.pdfs);
      } catch (error) {
        console.log("Error retrieving PDF data:", error);
      }
    };

    getPdfData();
  }, []);
  console.log(pdfs);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://pdf-server-809j.onrender.com/pdfs/${id}`
      );

      if (response.status === 200) {
        setAlertMsg("success");
        handleClick();
      } else {
        console.error("Failed to delete PDF.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let timeoutNavigate;

    const action = () => {
      setOpen(false);
      window.location.reload();
    };

    if (alertMsg === "success") {
      timeoutNavigate = setTimeout(action, 1000);
    }

    return () => {
      clearTimeout(timeoutNavigate);
    };
  }, [open]);

  const filteredPdfs = pdfs.filter((pdf) => {
    return pdf.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h1 className="text-3xl text-center font-bold mb-4 mt-10">
        All PDF Files {dossier}
      </h1>
      <Container
        maxWidth="md"
        sx={{
          mt: 4,
          mb: 4,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TextField
          id="search"
          type="search"
          label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: "100%", maxWidth: "100%" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Container>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {searchTerm === "" ? (
          pdfs.length > 0 ? (
            filteredPdfs.map((pdf) => (
              <li
                key={pdf._id}
                className=" row__card h-10 flex justify-between items-center mb-2 p-10 rounded-2xl shadow-md shadow-black/30"
              >
                <div className=" flex items-center justify-between w-[170px] pdf__file__name">
                  <img
                    width="44"
                    height="44"
                    src="https://img.icons8.com/cute-clipart/64/pdf.png"
                    alt="pdf"
                  />
                  <span>{pdf.title}</span>
                </div>
                <div className=" ml-5 flex ">
                  <Link to={`/pdf/${pdf._id}`}>
                    <button className="button__left uppercase text-sm tracking-wide bg-green-500 text-gray-100 px-2 py-1 ml-5 rounded-md focus:outline-none focus:shadow-outline hover:bg-blue-500">
                      Details
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDelete(pdf._id)}
                    type="reset"
                    className="button__left uppercase text-sm tracking-wide bg-blue-900 text-gray-100 px-2 py-1 ml-5 rounded-md focus:outline-none focus:shadow-outline hover:bg-red-500"
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))
          ) : (
            <h2 className="text-2xl font-bold mt-6">
              The List of Pdfs is Empty!!!
            </h2>
          )
        ) : filteredPdfs.length > 0 ? (
          filteredPdfs.map((pdf) => (
            <li
              key={pdf._id}
              className=" row__card h-10 flex justify-between items-center mb-2 p-10 rounded-2xl shadow-md shadow-black/30"
            >
              <div className=" flex items-center justify-between w-[170px] pdf__file__name">
                <img
                  width="44"
                  height="44"
                  src="https://img.icons8.com/cute-clipart/64/pdf.png"
                  alt="pdf"
                />
                <span>{pdf.title}</span>
              </div>
              <div className=" ml-5 flex ">
                <Link to={`/pdf/${pdf._id}`}>
                  <button
                    type="reset"
                    className="button__left uppercase text-sm tracking-wide bg-green-500 text-gray-100 px-2 py-1 ml-5 rounded-md focus:outline-none focus:shadow-outline hover:bg-blue-500"
                  >
                    Details
                  </button>
                </Link>

                <button
                  onClick={() => handleDelete(pdf._id)}
                  type="reset"
                  className="button__left uppercase text-sm tracking-wide bg-blue-900 text-gray-100 px-2 py-1 ml-5 rounded-md focus:outline-none focus:shadow-outline hover:bg-red-500"
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))
        ) : (
          <h2 className="text-2xl font-bold mt-6">No matching PDFs found.</h2>
        )}
      </ul>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Fichier supprimer avec succès
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
};

export default PdfFile;
