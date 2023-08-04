import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Alert, Stack } from "@mui/material";

const StepForm1 = ({ onFormSubmit }) => {
  const [selectedFolder, setSelectedFolder] = useState("");
  const Navigate = useNavigate();
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

  const [folders, setFolders] = useState([]);
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

  const initialState = {
    selectedFile: null,
    title: "",
    owner: "",
    publicOrPrivate: "",
    input1: "",
    input2: "",
    input: "",
    site: "",
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
    } else if (name === "selectedFile") {
      // Handle single file selection for selectedFile and selectedImage
      setFormState({
        ...formState,
        [name]: files[0],
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

    Object.entries(initialState).forEach(([key, value]) => {
      formData.append(key, value || "");
    });

    Object.entries(formState).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        // Handle the array case properly by appending each element separately
        value.forEach((item) => {
          formData.append(key, item);
        });
      } else {
        formData.append(key, value || "");
      }
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API_URL}/FormUpload`,
        formData,
        config
      );
      onFormSubmit(true);
    } catch (error) {
      // setLoading(false);
      console.log(error);
      onFormSubmit(false);
    }
  };

  return (
    <div>
      <form>
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
          </>
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
                La list est vide
              </option>
            )}
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
        <button type="submit">sub</button>
      </form>
    </div>
  );
};

export default StepForm1;
