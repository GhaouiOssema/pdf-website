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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const ATert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FormSend = () => {
  const [selectedFolder, setSelectedFolder] = useState("");
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);

  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [folders, setFolders] = useState();
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/sites", config);
        setFolders(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFolders();
  }, []);
  console.log(folders);
  const initialState = {
    selectedFile: null,
    title: "",
    owner: "",
    publicOrPrivate: "",
    input1: "",
    input2: "",
    input: "",
    site: "",
    selectedImage: null,
    selectedInfo: null,
    pdfId: "",
  };

  const [formState, setFormState] = useState(initialState);

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "site") {
      setSelectedFolder(value);
    }

    if (name === "publicOrPrivate") {
      if (value === "Armoire Electrique") {
        setFormState({
          ...formState,
          [name]: value,
          input1: "",
          input2: "",
        });
      } else {
        setFormState({
          ...formState,
          [name]: value,
          input: "",
        });
      }
    } else if (
      name === "selectedFile" ||
      name === "selectedImage" ||
      name === "selectedInfo"
    ) {
      setFormState({
        ...formState,
        [name]: files[0], // Only store the first file in the array
      });
    } else {
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    // Send the initial state data
    Object.entries(initialState).forEach(([key, value]) => {
      formData.append(key, value || "");
    });

    // Send additional data from formState
    Object.entries(formState).forEach(([key, value]) => {
      if (
        key === "selectedFile" ||
        key === "selectedImage" ||
        key === "selectedInfo"
      ) {
        formData.append(key, value);
      } else {
        formData.append(key, value || "");
      }
    });

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/FormUpload",
        formData,
        config
      );

      if (response.status === 200) {
        setAlertMsg("success");
        handleClick();
        setLoading(false);
        Navigate("/messites");
      }
    } catch (error) {
      console.error(error);
      setAlertMsg("error");
      handleClick();
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormState({
      selectedFile: null,
      title: "",
      owner: "",
      publicOrPrivate: "public",
    });
  };

  const FX = folders
    ?.find((folder) => folder.adresse === selectedFolder)
    ?.content.map((subFolder, index) => null);

  console.log(formState);

  return (
    <>
      <h1 className="text-3xl text-center font-bold pt-10">Ajouter un Plan</h1>
      <form onSubmit={handleSubmit} onReset={handleReset} className="">
        <div className="flex justify-center items-center">
          <div className=" max__size w-[70%] container mx-auto my-4 px-4 lg:px-20 ">
            <div className=" p-6 my-2 mr-auto rounded-2xl shadow-2xl bg-white">
              <h1 className="text-2xl text-center font-bold mb-4">
                Fichier d'equipement
              </h1>
              <div className=" mt-5">
                <div className="w-full flex flex-col">
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
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
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          Selectioner un fichier PDF
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        name="selectedFile"
                        type="file"
                        accept=".pdf"
                        hidden
                        onChange={handleChange}
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
                  <select
                    name="site"
                    value={formState.site}
                    onChange={handleChange}
                    className="max w-[28%] bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg pl-5 "
                  >
                    <option value="Sites" selected>
                      Sites
                    </option>
                    {folders?.map((folder, index) => (
                      <option value={folder.adresse} key={index}>
                        {folder.adresse}
                      </option>
                    ))}
                  </select>
                  <input
                    className="w-[15rem] bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg pl-5 "
                    type="text"
                    placeholder="Nom d'equipement"
                    value={formState.title}
                    onChange={handleChange}
                    name="title"
                    required
                  />

                  <select
                    name="publicOrPrivate"
                    value={formState.publicOrPrivate}
                    onChange={handleChange}
                    className="max w-[28%] bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg pl-5"
                  >
                    <option value="Categorie" selected>
                      Categorie
                    </option>
                    {selectedFolder &&
                      folders
                        ?.find((folder) => folder.adresse === selectedFolder)
                        ?.content.map((subFolder, index) => (
                          <option value={subFolder.subFolder.name} key={index}>
                            {subFolder.subFolder.name}
                          </option>
                        ))}
                  </select>
                </div>
                {formState.publicOrPrivate === "Armoire electrique" && (
                  <div className="mt-2 flex items-center justify-around">
                    <input
                      className="w-[15rem] bg-gray-100 text-gray-900  p-3 rounded-lg pl-5"
                      type="text"
                      placeholder=""
                      value={formState.input1}
                      onChange={handleChange}
                      name="input1"
                      required
                    />
                    <input
                      className="w-[15rem] bg-gray-100 text-gray-900  p-3 rounded-lg pl-5"
                      type="date"
                      placeholder="Input 2"
                      value={formState.input2}
                      onChange={handleChange}
                      name="input2"
                      required
                    />
                  </div>
                )}
                {["Climatisation", "Chauffage", "Ventilasion"].includes(
                  formState.publicOrPrivate
                ) && (
                  <input
                    className="w-[15rem] bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg pl-5"
                    type="text"
                    placeholder="Modéle"
                    value={formState.input}
                    onChange={handleChange}
                    name="input"
                    required
                  />
                )}
                <div className="flex flex-col items-center justify-center mt-2 w-full">
                  <h1 className="text-2xl text-center font-bold mb-4">
                    Image d'equipement
                  </h1>
                  <label
                    htmlFor="pdf-image"
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
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        Sélectionner un fichier Image
                      </p>
                    </div>
                    <input
                      name="selectedImage"
                      id="pdf-image"
                      type="file"
                      accept="image/png, image/jpg, image/jpeg"
                      hidden
                      onChange={handleChange}
                    />
                  </label>
                </div>
                {/* <div className="flex flex-col items-center justify-center mt-2 w-full">
                  <h1 className="text-2xl text-center font-bold mb-4 mt-4">
                    DOE
                  </h1>
                  <label
                    htmlFor="DOE-PDF"
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
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        Sélectionner un ou plussieur fichier (PDF)
                      </p>
                    </div>
                    <input
                      name="selectedDOE"
                      id="DOE-PDF"
                      type="file"
                      accept=".pdf"
                      hidden
                      multiple
                      onChange={handleChange}
                    />
                  </label>
                </div> */}
                <div className="flex flex-col items-center justify-center mt-2 w-full">
                  <h1 className="text-2xl text-center font-bold mb-4 mt-4">
                    Fiche technique
                  </h1>
                  <label
                    htmlFor="fiche-tech"
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
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        Sélectionner un ou plussieur fichier (PDF)
                      </p>
                    </div>
                    <input
                      name="selectedInfo"
                      id="fiche-tech"
                      type="file"
                      accept=".pdf"
                      hidden
                      onChange={handleChange}
                    />
                  </label>
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
