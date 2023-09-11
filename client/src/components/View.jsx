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
}) => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

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

  const handleSiteCodePostalChange = (event) => {
    setSiteCodePostal(event.target.value);
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

      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const { userId, userName } = JSON.parse(atob(token.split(".")[1]));
      // Extract the necessary information from the token payload

      if (anyFieldEmpty) {
        console.log("One or more fields are empty");
        setOpen(false); // Close the popup or set its visibility to false
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
      seterrorMessageForCreatingSite("Le dossier existe déjà");
      setAlertMsg("");
      setOpen(false);
      setErrorMessage(err.response.data.error);
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
      seterrorMessageForUpdatingSite("Le dossier existe déjà");
      setAlertMsg("");
      setOpen(false);
      setErrorMessage(err.response.data.error);
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
                bgcolor: "white",
                height: "100%",
                borderRadius: 2,
                width: { lg: 500, md: 500, sm: 300, xs: 300 },
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div className="text-black pb-10">
                <div className="w-full max-w-lg ">
                  {type === "siteButton" ? (
                    <>
                      <h1 className="pt-10 tracking-wide text-center text-gray-700 text-lg font-sans font-bold mb-10 flex justify-center items-center flex-wrap whitespace-normal sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                        <span className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
                          Veuillez saisir les informations du site
                        </span>
                      </h1>

                      <div className="px-3 mb-6">
                        <label
                          htmlFor="nom_site"
                          className="w-full block mb-2 text-md font-sans font-medium text-gray-900 dark:text-white"
                        >
                          Nom
                        </label>
                        <input
                          type="text"
                          id="nom_site"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light"
                          placeholder="le nom du site"
                          value={name}
                          onChange={handleNameChange}
                          required
                        />
                      </div>

                      <div className="px-3 mb-6">
                        <label
                          htmlFor="adress_site"
                          className="w-full block mb-2 text-md font-sans font-medium text-gray-900 dark:text-white"
                        >
                          Adresse
                        </label>
                        <input
                          type="text"
                          id="adress_site"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light"
                          placeholder="Adresse du site"
                          value={siteAddress}
                          onChange={handleSiteAddressChange}
                          required
                        />
                      </div>
                      <div className="px-3 mb-6">
                        <label
                          htmlFor="code_postal"
                          className="w-full block mb-2 text-md font-sans font-medium text-gray-900 dark:text-white"
                        >
                          Code postal
                        </label>
                        <input
                          type="text"
                          id="code_postal"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light"
                          placeholder="Code postal"
                          value={siteCodePostal}
                          onChange={handleSiteCodePostalChange}
                          required
                        />
                      </div>

                      <div className="px-3 mb-6">
                        <label
                          htmlFor="code_postal"
                          className="w-full block mb-2 text-md font-sans font-medium text-gray-900 dark:text-white"
                        >
                          Catégorie
                        </label>
                        <FormControl sx={{ width: "100%" }} size="small">
                          <InputLabel
                            id="checkbox-label"
                            sx={{ width: "100%" }}
                          >
                            Sélectionnez un Catégorie
                          </InputLabel>
                          <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={selectedCategories}
                            onChange={handleCategoryChange}
                            input={
                              <OutlinedInput label="Sélectionnez un Catégorie" />
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
                            sx={{ bgcolor: "#FAFAFA" }}
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

                      {errorMessageForCreatingSite && (
                        <div className="w-full text-center block mb-2 text-md font-sans font-base text-red-500 dark:text-white">
                          {errorMessageForCreatingSite}
                        </div>
                      )}

                      <div className="flex flex-wrap justify-center space-x-2">
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
                        >
                          Annuler
                        </Button>
                      </div>
                    </>
                  ) : type === "editSite" ? (
                    <>
                      <h1 className="pt-10 tracking-wide text-center text-gray-700 text-lg font-sans font-bold mb-10 flex justify-center items-center flex-wrap whitespace-normal sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                        <span className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
                          Modifier les informations du site
                        </span>
                      </h1>

                      <div className="mb-6">
                        <label
                          htmlFor="adress_site"
                          className="w-full block mb-2 text-md font-sans font-medium text-gray-900 dark:text-white"
                        >
                          Adresse du site
                        </label>
                        <input
                          type="text"
                          id="adress_site"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light"
                          placeholder="Adresse du site"
                          value={adresse}
                          onChange={(e) => setAdresse(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-6">
                        <label
                          htmlFor="code_postal"
                          className="w-full block mb-2 text-md font-sans font-medium text-gray-900 dark:text-white"
                        >
                          Code postal
                        </label>
                        <input
                          type="text"
                          id="code_postal"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light"
                          placeholder="Code postal"
                          value={codePostal}
                          onChange={(e) => setCodePostal(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-6">
                        <label
                          htmlFor="code_postal"
                          className="w-full block mb-2 text-md font-sans font-medium text-gray-900 dark:text-white"
                        >
                          Catégorie
                        </label>
                        <FormControl sx={{ width: "100%" }} size="small">
                          <InputLabel id="demo-multiple-checkbox-label">
                            Sélectionnez un Catégorie
                          </InputLabel>
                          <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={subContent}
                            onChange={(e) => setSubContent(e.target.value)}
                            input={
                              <OutlinedInput label="Sélectionnez un Catégorie" />
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
                          >
                            {names.map((name) => (
                              <MenuItem key={name} value={name}>
                                <Checkbox
                                  checked={subContent.indexOf(name) > -1}
                                />
                                <ListItemText primary={name} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>

                      {errorMessageForUpdatingSite && (
                        <div className="w-full text-center block mb-2 text-md font-sans font-base text-red-500 dark:text-white">
                          {errorMessageForUpdatingSite}
                        </div>
                      )}

                      <Stack
                        spacing={2}
                        direction="row"
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          variant="outlined"
                          color="success"
                          onClick={updateSite}
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
                        >
                          Annuler
                        </Button>
                      </Stack>
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
