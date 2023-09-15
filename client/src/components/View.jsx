import {
  Box,
  Container,
  CssBaseline,
  ListItemText,
  Checkbox,
  TextField,
  Stack,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";

const ITEM_HEIGHT = 30;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Climatisation",
  "Chauffage",
  "Armoire electrique",
  "Ventilasion",
];

const RaportView = ({
  type,
  close,
  setAlertMsg,
  setOpen,
  handleClick,
  alertMsg,
  folderIdUpdate,
  existingFolders,
}) => {
  const [siteAddress, setSiteAddress] = useState("");
  const [siteCodePostal, setSiteCodePostal] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [name, setName] = useState("");

  // for updates
  const [adresse, setAdresse] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [subContent, setSubContent] = useState([]);

  const [errorMessageForCreatingSite, seterrorMessageForCreatingSite] =
    useState("");
  const [errorMessageForUpdatingSite, seterrorMessageForUpdatingSite] =
    useState("");

  const handleSiteAddressChange = (event) => {
    setSiteAddress(event.target.value);
  };

  const handleSiteCodePostalChange = (value) => {
    setSiteCodePostal(value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategories(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const addSite = async () => {
    try {
      const formData = {
        adresse: siteAddress,
        code_postal: siteCodePostal,
        subFolders: selectedCategories,
        name: name,
      };

      const anyFieldEmpty = Object.values(formData).some(
        (value) => value === null || value === undefined || value === ""
      );

      const isCodePostalValid =
        formData.code_postal && formData.code_postal.length === 5;

      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const { userId, userName } = JSON.parse(atob(token.split(".")[1]));
      // Extract the necessary information from the token payload

      if (anyFieldEmpty) {
        seterrorMessageForCreatingSite("Tous les champs doivent être remplis");
        return;
      }

      if (!isCodePostalValid) {
        seterrorMessageForCreatingSite(
          "Code postal invalide : Le code postal doit comporter au moins 5 chiffres."
        );
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API_URL}/sites/creation`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-User-Id": userId,
            "X-User-Name": userName,
          },
        }
      );

      setAlertMsg("success");
      setOpen(true);
      handleClick();
      seterrorMessageForCreatingSite("");
    } catch (error) {
      setAlertMsg("");
      setOpen(false);
      seterrorMessageForCreatingSite(error.response.data.message);
    }
  };

  const updateSite = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = {
        adresse: adresse,
        code_postal: codePostal,
        subfolders: subContent,
        name: name,
      };

      const anyFieldEmpty = Object.values(data).some(
        (value) => value === null || value === undefined || value === ""
      );

      const isCodePostalValid =
        data.code_postal && data.code_postal.length === 5;

      if (!token) {
        return;
      }

      if (anyFieldEmpty) {
        seterrorMessageForUpdatingSite("Tous les champs doivent être remplis");
        return;
      }

      if (!isCodePostalValid) {
        seterrorMessageForUpdatingSite(
          "Code postal invalide : Le code postal doit comporter au moins 5 chiffres."
        );
        return;
      }

      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_API_URL}/site/${folderIdUpdate}`,
        data,
        config
      );

      setAlertMsg("success");
      handleClick();
      setOpen(true);
      seterrorMessageForUpdatingSite("");
    } catch (error) {
      // seterrorMessageForUpdatingSite(error.response.data.message);
      setAlertMsg("");
      setOpen(false);
    }
  };

  useEffect(() => {
    let timeoutNavigate;

    const action = () => {
      window.location.reload();
    };

    if (alertMsg === "success") {
      timeoutNavigate = setTimeout(action, 100);
    }

    return () => {
      clearTimeout(timeoutNavigate);
    };
  }, [alertMsg]);

  return (
    <>
      <div className=" md:w-[100%] absolute flex justify-center">
        <CssBaseline />
        <form>
          <Container fixed className=" ">
            <Box
              component="form"
              sx={{
                bgcolor: "#F4F4F5",
                height: "100%",
                borderRadius: 2,
                width: { lg: 500, md: 500, sm: 400, xs: 300 },
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div className="text-black pb-10 ">
                <div className="w-full max-w-lg">
                  {type === "siteButton" ? (
                    <>
                      <h1 className="pt-10 tracking-wide text-center text-gray-700 text-lg font-sans font-bold mb-10 flex justify-center items-center flex-wrap whitespace-normal sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl px-4">
                        <span className="w-full text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg tracking-wide break-words">
                          Veuillez saisir les informations du site
                        </span>
                      </h1>

                      <div className="px-3 mb-6">
                        <label
                          htmlFor="nom_site"
                          className="block text-gray-700 font-sans font-medium mb-2 text-start"
                        >
                          Nom
                        </label>
                        <input
                          type="text"
                          id="nom_site"
                          className="text-black w-full px-4 py-2 border-none rounded-lg font-sans focus:outline-none focus:ring bg-white bg-opacity-90"
                          placeholder="le nom du site"
                          value={name}
                          onChange={handleNameChange}
                        />
                      </div>

                      <div className="px-3 mb-6">
                        <label
                          htmlFor="adress_site"
                          className="block text-gray-700 font-sans font-medium mb-2 text-start"
                        >
                          Adresse
                        </label>
                        <input
                          type="text"
                          id="adress_site"
                          className="text-black w-full px-4 py-2 border-none rounded-lg font-sans focus:outline-none focus:ring bg-white bg-opacity-90"
                          placeholder="Adresse du site"
                          value={siteAddress}
                          onChange={handleSiteAddressChange}
                        />
                      </div>
                      <div className="px-3 mb-6">
                        <label
                          htmlFor="code_postal"
                          className="block text-gray-700 font-sans font-medium mb-2 text-start"
                        >
                          Code postal
                        </label>
                        <input
                          type="number"
                          id="code_postal"
                          className="text-black w-full px-4 py-2 border-none rounded-lg font-sans focus:outline-none focus:ring bg-white bg-opacity-90"
                          placeholder="Code postal"
                          value={siteCodePostal}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (inputValue.length <= 5) {
                              handleSiteCodePostalChange(inputValue);
                            }
                          }}
                          min="1000"
                          max="9999"
                          step="1"
                          maxLength="5"
                        />
                      </div>

                      <div className="px-3 mb-6">
                        <label
                          htmlFor="code_postal"
                          className="block text-gray-700 font-sans font-medium mb-2 text-start"
                        >
                          Catégorie
                        </label>
                        <FormControl sx={{ width: "100%" }} size="small">
                          <InputLabel
                            id="checkbox-label"
                            sx={{ width: "100%" }}
                          >
                            Sélectionnez une Catégorie
                          </InputLabel>
                          <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={selectedCategories}
                            onChange={handleCategoryChange}
                            input={
                              <OutlinedInput label="Sélectionnez une Catégorie" />
                            }
                            renderValue={(selected) => {
                              if (selected.length <= 2) {
                                return selected.join(", ");
                              } else {
                                const firstTwo = selected
                                  .slice(0, 2)
                                  .join(", ");
                                const moreCount = selected.length - 2;
                                return `${firstTwo} + ${moreCount}`;
                              }
                            }}
                            MenuProps={MenuProps}
                            fullWidth
                            sx={{ bgcolor: "white" }}
                          >
                            {names.map((name) => (
                              <MenuItem key={name} value={name}>
                                <Checkbox
                                  checked={
                                    selectedCategories.indexOf(name) > -1
                                  }
                                />
                                <ListItemText primary={name} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>

                      <div className="px-3 mb-6">
                        <Button
                          variant="outlined"
                          color="success"
                          onClick={addSite}
                        >
                          Ajouter
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => {
                            close();
                            seterrorMessageForCreatingSite("");
                            setSiteAddress("");
                            setSiteCodePostal("");
                            setSelectedCategories([]);
                            setName("");
                          }}
                          sx={{ ml: 3 }}
                        >
                          Annuler
                        </Button>
                      </div>

                      {errorMessageForCreatingSite && (
                        <div className="flex px-6 text-center text-sm font-sans font-base text-red-500 dark:text-white break-words tracking-wide">
                          {errorMessageForCreatingSite}
                        </div>
                      )}
                    </>
                  ) : type === "editSite" ? (
                    <>
                      <h1 className="pt-10 tracking-wide text-center text-gray-700 text-lg font-sans font-bold mb-10 flex justify-center items-center flex-wrap whitespace-normal sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                        <span className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
                          Modifier les informations du site
                        </span>
                      </h1>

                      <div className="px-3 mb-6">
                        <label
                          htmlFor="adress_site"
                          className="block text-gray-700 font-sans font-medium mb-2 text-start"
                        >
                          Nom du site
                        </label>
                        <input
                          type="text"
                          id="adress_site"
                          className="text-black w-full px-4 py-2 border-none rounded-lg font-sans focus:outline-none focus:ring bg-white bg-opacity-90"
                          placeholder="Nom du site"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="px-3 mb-6">
                        <label
                          htmlFor="adress_site"
                          className="block text-gray-700 font-sans font-medium mb-2 text-start"
                        >
                          Adresse du site
                        </label>
                        <input
                          type="text"
                          id="adress_site"
                          className="text-black w-full px-4 py-2 border-none rounded-lg font-sans focus:outline-none focus:ring bg-white bg-opacity-90"
                          placeholder="Adresse du site"
                          value={adresse}
                          onChange={(e) => setAdresse(e.target.value)}
                          required
                        />
                      </div>

                      <div className="px-3 mb-6">
                        <label
                          htmlFor="code_postal"
                          className="block text-gray-700 font-sans font-medium mb-2 text-start"
                        >
                          Code postal
                        </label>
                        <input
                          type="number"
                          id="code_postal"
                          className="text-black w-full px-4 py-2 border-none rounded-lg font-sans focus:outline-none focus:ring bg-white bg-opacity-90"
                          placeholder="Code postal"
                          value={codePostal}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (inputValue.length <= 5) {
                              setCodePostal(inputValue);
                            }
                          }}
                          min="1000"
                          max="9999"
                          step="1"
                          maxLength="5"
                          required
                        />
                      </div>

                      <div className="px-3 mb-6">
                        <label className="block text-gray-700 font-sans font-medium mb-2 text-start">
                          Catégorie
                        </label>
                        <FormControl sx={{ width: "100%" }} size="small">
                          <InputLabel id="demo-multiple-checkbox-label">
                            Sélectionnez une Catégorie
                          </InputLabel>
                          <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={subContent}
                            onChange={(e) => setSubContent(e.target.value)}
                            input={
                              <OutlinedInput label="Sélectionnez une Catégorie" />
                            }
                            renderValue={(selected) => {
                              if (selected.length <= 2) {
                                return selected.join(", ");
                              } else {
                                const firstTwo = selected
                                  .slice(0, 2)
                                  .join(", ");
                                const moreCount = selected.length - 2;
                                return `${firstTwo} + ${moreCount}`;
                              }
                            }}
                            MenuProps={MenuProps}
                            sx={{ bgcolor: "white" }}
                          >
                            {names.map((folderName) => {
                              const isExisting = existingFolders.content.some(
                                (subFolder) =>
                                  subFolder.subFolder.name === folderName
                              );
                              const isChecked = subContent.includes(folderName);
                              const defaultSubfolder =
                                names.indexOf(folderName) <
                                existingFolders.content.length;

                              return (
                                <MenuItem
                                  key={folderName}
                                  value={folderName}
                                  disabled={isExisting}
                                  selected={isChecked}
                                >
                                  <Checkbox
                                    checked={
                                      defaultSubfolder
                                        ? defaultSubfolder
                                        : isChecked
                                    }
                                  />
                                  <ListItemText primary={folderName} />
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </div>

                      <div className="px-3 mb-6">
                        <Button
                          variant="outlined"
                          color="success"
                          onClick={updateSite}
                          sx={{
                            color: "#125ba3",
                            "&:hover": { backgroundColor: "transparent" },
                          }}
                        >
                          Modifier
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => {
                            close();
                            seterrorMessageForUpdatingSite("");
                            setAdresse("");
                            setCodePostal("");
                            setSubContent([]);
                          }}
                          sx={{
                            color: "#DC2626",
                            "&:hover": { backgroundColor: "transparent" },
                            ml: 3,
                          }}
                        >
                          Annuler
                        </Button>
                      </div>

                      {errorMessageForUpdatingSite && (
                        <div className="w-full text-center text-sm font-sans font-base text-red-500 dark:text-white break-words tracking-wide">
                          {errorMessageForUpdatingSite}
                        </div>
                      )}
                    </>
                  ) : null}
                </div>
              </div>
            </Box>
          </Container>
        </form>
      </div>
    </>
  );
};

export default RaportView;
