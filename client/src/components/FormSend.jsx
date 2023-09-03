import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Stack,
  Snackbar,
  Box,
  LinearProgress,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Document, Page, pdfjs } from "react-pdf";
import { Link, useNavigate } from "react-router-dom";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import axios from "axios";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const ATert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const initialState = {
  selectedFile: null,
  selectedImage: null,
  selectedInfo: null,
  selectedDOE: null,
  title: "",
  owner: "",
  publicOrPrivate: "",
  input1: "",
  input2: "",
  input: "",
  site: "",
};

const FormSend = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState("");
  const Navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [folders, setFolders] = useState([]);
  const [formState, setFormState] = useState(initialState);
  const [isUploading, setIsUploading] = useState(false);
  const [formComplated, setFormComplated] = useState(0);
  const [fieldEmpty, setFieldEmpty] = useState([]);

  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
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

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_API_URL}/sites`,
          config
        );
        setFolders(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFolders();
  }, []);

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
      // Handle single file selection for selectedFile and selectedImage
      setFormState({
        ...formState,
        [name]: files[0],
      });
    } else if (name === "selectedDOE") {
      // Handle multi-selection for selectedInfo and selectedDOE files
      const selectedFiles = Array.from(files);
      setFormState({
        ...formState,
        [name]: selectedFiles,
      });
    } else {
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  };
  const handleSubmitStep1 = async (event) => {
    event.preventDefault();

    // Collect data from the form relevant to the first step
    const formDataStep1 = new FormData();
    formDataStep1.append("selectedFile", formState.selectedFile);
    formDataStep1.append("site", formState.site);
    formDataStep1.append("title", formState.title);
    formDataStep1.append("publicOrPrivate", formState.publicOrPrivate);

    if (formState.publicOrPrivate === "Armoire electrique") {
      formDataStep1.append("input1", formState.input1);
      formDataStep1.append("input2", formState.input2);
    } else {
      formDataStep1.append("input", formState.input);
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API_URL}/FormUpload/mainpdf`,
        formDataStep1,
        {
          ...config,
          onUploadProgress: (progressEvent) => {
            const totalBytes = progressEvent.total;
            const startTime = new Date().getTime();

            const interval = setInterval(() => {
              const currentTime = new Date().getTime();
              const elapsedTime = currentTime - startTime;

              if (elapsedTime >= responseTime) {
                clearInterval(interval);
                setUploadProgress(100);
                return;
              }

              const uploadedBytes = (elapsedTime / responseTime) * totalBytes;
              const percentage = Math.min(
                Math.round((uploadedBytes / totalBytes) * 100),
                100
              );
              setUploadProgress(percentage);
            }, 100); // Update progress every 100 milliseconds

            // Simulate server response time
            const responseTime = 2000; // Adjust the response time in milliseconds as needed
          },
        }
      );

      if (response.status === 200) {
        setAlertMsg("success");
        handleClick();
        setLoading(false);
        setFormComplated((prev) => prev + 1);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } catch (error) {
      console.error(error);
      setAlertMsg("error");
      handleClick();
      setLoading(false);
    } finally {
      setIsUploading(false); // Upload complete or error, stop uploading
    }
  };

  const handleSubmitStep2 = async (event) => {
    event.preventDefault();

    const formDataStep1 = new FormData();
    formDataStep1.append("selectedImage", formState.selectedImage);

    try {
      setIsUploading(true);
      setUploadProgress(0);
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API_URL}/FormUpload/image`,
        formDataStep1,
        {
          ...config,
          onUploadProgress: (progressEvent) => {
            const totalBytes = progressEvent.total;
            const startTime = new Date().getTime();

            const interval = setInterval(() => {
              const currentTime = new Date().getTime();
              const elapsedTime = currentTime - startTime;

              if (elapsedTime >= responseTime) {
                clearInterval(interval);
                setUploadProgress(100);
                return;
              }

              const uploadedBytes = (elapsedTime / responseTime) * totalBytes;
              const percentage = Math.min(
                Math.round((uploadedBytes / totalBytes) * 100),
                100
              );
              setUploadProgress(percentage);
            }, 100);

            const responseTime = 2000;
          },
        }
      );

      if (response.status === 200) {
        setAlertMsg("success");
        handleClick();
        setLoading(false);
        setFormComplated((prev) => prev + 1);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } catch (error) {
      console.error(error);
      setAlertMsg("error");
      handleClick();
      setLoading(false);
    } finally {
      setIsUploading(false); // Upload complete or error, stop uploading
    }
  };
  const handleSubmitStep3 = async (event) => {
    event.preventDefault();

    const formDataStep1 = new FormData();
    formDataStep1.append("selectedInfo", formState.selectedInfo);

    try {
      setIsUploading(true);
      setUploadProgress(0);
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API_URL}/FormUpload/fiche`,
        formDataStep1,
        {
          ...config,
          onUploadProgress: (progressEvent) => {
            const totalBytes = progressEvent.total;
            const startTime = new Date().getTime();

            const interval = setInterval(() => {
              const currentTime = new Date().getTime();
              const elapsedTime = currentTime - startTime;

              if (elapsedTime >= responseTime) {
                clearInterval(interval);
                setUploadProgress(100);
                return;
              }

              const uploadedBytes = (elapsedTime / responseTime) * totalBytes;
              const percentage = Math.min(
                Math.round((uploadedBytes / totalBytes) * 100),
                100
              );
              setUploadProgress(percentage);
            }, 100);

            const responseTime = 2000;
          },
        }
      );

      if (response.status === 200) {
        setAlertMsg("success");
        handleClick();
        setLoading(false);
        setFormComplated((prev) => prev + 1);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } catch (error) {
      console.error(error);
      setAlertMsg("error");
      handleClick();
      setLoading(false);
    } finally {
      setIsUploading(false); // Upload complete or error, stop uploading
    }
  };
  const handleSubmitStep4 = async (event) => {
    event.preventDefault();

    // Ensure formState.selectedDOE is an array
    const selectedDOEFiles = Array.isArray(formState.selectedDOE)
      ? formState.selectedDOE
      : [formState.selectedDOE];

    const formDataStep1 = new FormData();
    selectedDOEFiles.forEach((file) => {
      formDataStep1.append("selectedDOE", file);
    });

    try {
      setIsUploading(true);
      setUploadProgress(0);
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API_URL}/FormUpload/doe`,
        formDataStep1,
        {
          ...config,
          onUploadProgress: (progressEvent) => {
            const totalBytes = progressEvent.total;
            const startTime = new Date().getTime();

            const interval = setInterval(() => {
              const currentTime = new Date().getTime();
              const elapsedTime = currentTime - startTime;

              if (elapsedTime >= responseTime) {
                clearInterval(interval);
                setUploadProgress(100);
                return;
              }

              const uploadedBytes = (elapsedTime / responseTime) * totalBytes;
              const percentage = Math.min(
                Math.round((uploadedBytes / totalBytes) * 100),
                100
              );
              setUploadProgress(percentage);
            }, 100);

            const responseTime = 2000;
          },
        }
      );

      if (response.status === 200) {
        setAlertMsg("success");
        handleClick();
        setLoading(false);
        setFormComplated((prev) => prev + 1);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } catch (error) {
      console.error(error);
      setAlertMsg("error");
      handleClick();
      setLoading(false);
    } finally {
      setIsUploading(false); // Upload complete or error, stop uploading
    }
  };

  const handleReset = () => {
    setFormState(initialState);
    setActiveStep(0);
  };

  const steps = [
    "Fiche technique",
    "Image d'équipement",
    "plan d'équipement",
    "Dossier des Ouvrages Executés",
  ];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            {!isUploading ? (
              <>
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
                        {folders.length > 0 ? (
                          folders?.map((folder, index) => (
                            <option value={folder.adresse} key={index}>
                              {folder.adresse}
                            </option>
                          ))
                        ) : (
                          <option value="/messites" className="cursor-pointer">
                            La liste est vide
                          </option>
                        )}
                      </select>
                      <input
                        className="max w-[28%] bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg pl-5 "
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
                            ?.find(
                              (folder) => folder.adresse === selectedFolder
                            )
                            ?.content.map((subFolder, index) => (
                              <option
                                value={subFolder.subFolder.name}
                                key={index}
                              >
                                {subFolder.subFolder.name}
                              </option>
                            ))}
                      </select>
                    </div>
                    {formState.publicOrPrivate === "Armoire electrique" && (
                      <div className="mt-2 flex sm:flex-row flex-col items-center justify-around">
                        <input
                          className="max w-[28%] bg-gray-100 text-gray-900 p-3 rounded-lg pl-5"
                          type="text"
                          placeholder="PTA"
                          value={formState.input1}
                          onChange={handleChange}
                          name="input1"
                          required
                        />
                        <input
                          className="max w-[28%] bg-gray-100 text-gray-900 p-3 rounded-lg pl-5 mt-2 sm:mt-0"
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
                    {formState.selectedFile && (
                      <Stack
                        sx={{
                          width: "100%",
                          color: "black",
                          marginTop: "10px",
                        }}
                        spacing={2}
                      >
                        <Alert
                          severity="info"
                          icon={false}
                          className="flex justify-start items-center "
                        >
                          <PictureAsPdfIcon sx={{ color: "black" }} />
                          <span className="font-bold ml-2">
                            {formState.selectedFile.name}
                          </span>
                        </Alert>
                      </Stack>
                    )}
                  </div>
                </div>
                {activeStep < steps.length - 1 && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmitStep1}
                    sx={{ mt: 5 }}
                  >
                    Suivant
                  </Button>
                )}
              </>
            ) : (
              <div className="mt-3">
                <LinearProgress
                  variant="determinate"
                  value={uploadProgress}
                  sx={{ width: "100%" }}
                />
                <div className="mt-2 text-center">
                  {uploadProgress}% Uploaded
                </div>
              </div>
            )}
          </>
        );
      case 1:
        return (
          <>
            {!isUploading ? (
              <>
                <div className="mt-5">
                  {formState.selectedImage ? (
                    <div className="relative mb-4">
                      <img
                        src={URL.createObjectURL(formState.selectedImage)}
                        alt="Selected file"
                        style={{
                          width: "100%",
                          height: "auto",
                          maxWidth: "300px",
                          maxHeight: "300px",
                        }}
                      />
                    </div>
                  ) : (
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
                  )}
                </div>
                {activeStep < steps.length - 1 && (
                  <div className="flex items-center mt-10">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmitStep2}
                    >
                      Suivant
                    </Button>
                    {formState.selectedImage && (
                      <div
                        className="text-black cursor-pointer ml-5"
                        onClick={() =>
                          setFormState({ ...formState, selectedImage: null })
                        }
                      >
                        <CancelOutlinedIcon />
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="mt-3">
                <LinearProgress
                  variant="determinate"
                  value={uploadProgress}
                  sx={{ width: "100%" }}
                />
                <div className="mt-2 text-center">
                  {uploadProgress}% Uploaded
                </div>
              </div>
            )}
          </>
        );
      case 2:
        return (
          <>
            {!isUploading ? (
              <>
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
                {formState.selectedInfo && (
                  <Stack
                    sx={{
                      width: "100%",
                      color: "black",
                      marginTop: "10px",
                    }}
                    spacing={2}
                  >
                    <Alert severity="info" icon={false}>
                      <PictureAsPdfIcon sx={{ color: "black" }} />
                      <span className="font-bold ml-2">
                        {formState.selectedInfo.name}
                      </span>
                    </Alert>
                  </Stack>
                )}
                {activeStep < steps.length - 1 && (
                  <div className="flex items-center mt-10">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmitStep3}
                    >
                      Suivant
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="mt-3">
                <LinearProgress
                  variant="determinate"
                  value={uploadProgress}
                  sx={{ width: "100%" }}
                />
                <div className="mt-2 text-center">
                  {uploadProgress}% Uploaded
                </div>
              </div>
            )}
          </>
        );
      case 3:
        return (
          <>
            {!isUploading ? (
              <>
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
                {formState.selectedDOE && (
                  <Stack
                    sx={{
                      width: "100%",
                      color: "black",
                      marginTop: "10px",
                    }}
                    spacing={2}
                  >
                    {formState.selectedDOE.map((file, index) => (
                      <Alert key={index} severity="info" icon={false}>
                        <PictureAsPdfIcon sx={{ color: "black" }} />
                        <span className="font-bold ml-2">{file.name}</span>
                      </Alert>
                    ))}
                  </Stack>
                )}
                {activeStep && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmitStep4}
                    sx={{ mt: 5 }}
                  >
                    Suivant
                  </Button>
                )}
              </>
            ) : (
              <div className="mt-3">
                <LinearProgress
                  variant="determinate"
                  value={uploadProgress}
                  sx={{ width: "100%" }}
                />
                <div className="mt-2 text-center">
                  {uploadProgress}% Uploaded
                </div>
              </div>
            )}
          </>
        );
      default:
        return null;
    }
  };

  const skipLength = () => {
    setActiveStep((prev) => prev + 1);
    setFormComplated((prev) => prev - 1);
    setFieldEmpty([...fieldEmpty, steps[activeStep]]);
  };

  return (
    <div className="h-[90vh] bg-gray-100">
      <div className="text-3xl text-center font-bold pt-5" />
      <form onReset={handleReset}>
        <div className="flex justify-center items-center">
          <div className="lg:w-[80%] md:w-[80%] w-full container mx-auto my-4 px-4 lg:px-20">
            <div className=" p-6 mr-auto rounded-2xl shadow-2xl bg-white">
              {activeStep === steps.length ? (
                <>
                  <div className="text-green-500 text-4xl mb-4 flex justify-center items-center">
                    <i className="fa-solid fa-circle-check"></i>
                  </div>
                  <h1 className="text-2xl text-center font-bold mb-4">
                    Ajout complété!
                  </h1>
                  {formComplated !== 4 && fieldEmpty.length > 0 && (
                    <div className="flex flex-col items-center mb-4">
                      <h1 className="w-full text-center font-bold text-red-500 uppercase">
                        Les champs non renseignés :
                      </h1>
                      <h4 className="text-md w-full text-center flex flex-col md:flex-row lg:flex-row xl:flex-row justify-center items-center">
                        {fieldEmpty.map((el, idx) => (
                          <div key={idx} className="pl-2">
                            | {el}
                          </div>
                        ))}
                      </h4>
                    </div>
                  )}
                  <div className="text-center">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => Navigate("/messites")}
                    >
                      Retourner à la liste
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center my-4">
                    <span className=" font-bold text-base ">
                      {steps[activeStep]}
                    </span>
                    <Button onClick={skipLength} color="primary">
                      ignorer
                    </Button>
                  </div>
                  <div className="mb-10">{getStepContent(activeStep)}</div>
                </>
              )}
            </div>
          </div>
        </div>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <ATert
          onClose={handleClose}
          severity={alertMsg === "success" ? "success" : "error"}
        >
          {alertMsg}
        </ATert>
      </Snackbar>
    </div>
  );
};

export default FormSend;
