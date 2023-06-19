import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Link, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Input } from "@mui/material";

const ATert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FormSend = () => {
  const [formState, setFormState] = useState({
    selectedFile: null,
    title: "",
    owner: "",
    publicOrPrivate: "public",
  });
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFileChange = (event) => {
    setFormState({ ...formState, selectedFile: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { selectedFile, title, owner, publicOrPrivate } = formState;

    // Check if a file was selected
    if (!selectedFile) {
      setAlertMsg("error");
      handleClick();
      return;
    }

    const formData = new FormData();
    formData.append("pdf", selectedFile);
    formData.append("title", title);
    formData.append("owner", owner);
    formData.append("publicOrPrivate", publicOrPrivate);

    try {
      const response = await axios.post(
        "https://pdf-server-809j.onrender.com/upload",
        formData
      );

      if (response.status === 200) {
        setAlertMsg("success");
        handleClick();
        setOpen(true);
      } else {
        console.error("Failed to upload PDF.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let timeoutNavigate;

    const action = () => {
      Navigate("/pdf");
    };

    if (alertMsg === "success") {
      timeoutNavigate = setTimeout(action, 2000);
    }

    return () => {
      clearTimeout(timeoutNavigate);
    };
  }, [alertMsg, Navigate, setLoading]);

  const handleReset = () => {
    setFormState({
      selectedFile: null,
      title: "",
      owner: "",
      publicOrPrivate: "public",
    });
  };

  return (
    <>
      <h1 className="text-3xl text-center font-bold mb-4 mt-10">
        Ajouter un PlanA
      </h1>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div className="flex justify-center items-center bg-none">
          <div className=" max__size w-[70%] container mx-auto my-4 px-4 lg:px-20">
            <div className=" p-8 my-4 mr-auto rounded-2xl shadow-2xl bg-white">
              <div className=" mt-5">
                <div className="w-full flex flex-col">
                  <div class="flex items-center justify-center w-full">
                    <label
                      for="dropzone-file"
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
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          Selectioner un fichier
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        accept=".pdf"
                        hidden
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>

                  <>
                    {formState.selectedFile && (
                      <Stack
                        sx={{
                          width: "100%",
                          color: "black",
                          marginTop: "10px",
                        }}
                        spacing={2}
                      >
                        <Alert severity="info">
                          <span>{formState.selectedFile.name}</span>
                        </Alert>
                      </Stack>
                    )}
                  </>
                  <label htmlFor="files"></label>
                </div>
                <div className="flex items-center justify-between form__style">
                  <input
                    className="w-[60%] bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline max"
                    type="text"
                    placeholder="Nom du fichier"
                    value={formState.title}
                    onChange={handleInputChange}
                    name="title"
                  />

                  <select
                    name="publicOrPrivate"
                    value={formState.publicOrPrivate}
                    onChange={handleInputChange}
                    className="max w-[38%] bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline pl-5"
                  >
                    <option value="public">Publique</option>
                    <option value="private">Privé</option>
                  </select>
                </div>
              </div>
              <div className="button__style mt-5 my-2 flex w-[100%] justify-end">
                {open && (
                  <div className="pr-6">
                    <Stack
                      sx={{
                        color: "rgb(30, 58 ,138)",
                        marginTop: 1,
                      }}
                      spacing={2}
                      direction="row"
                    >
                      <CircularProgress color="inherit" size={32} />
                    </Stack>
                  </div>
                )}
                {!open ? (
                  <button
                    type="submit"
                    onClick={() => setOpen(true)}
                    className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg focus:outline-none focus:shadow-outline hover:bg-green-500"
                  >
                    Ajouter
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg focus:outline-none focus:shadow-outline hover:bg-green-500"
                  >
                    Encours
                  </button>
                )}
                <button
                  type="reset"
                  className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 ml-5 rounded-lg focus:outline-none focus:shadow-outline hover:bg-red-500"
                >
                  Restaurer
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
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
    </>
  );
};

export default FormSend;
