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
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
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
  const [name, setName] = useState(""); // Renamed state variable

  // for updates
  const [adresse, setAdresse] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [subContent, setSubContent] = useState([]);

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
    } catch (error) {
      console.error(error);
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
    } catch (error) {
      console.error(error); // Handle the error response
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
                borderRadius: "25px",
                width: 500,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div className="text-black pb-10">
                <div className="w-full max-w-lg ">
                  {type === "siteButton" ? (
                    <>
                      <h1 className="pt-10 text-center text-gray-700 text-lg font-bold mb-10">
                        <span>Villiuer saisir les informations du site</span>
                      </h1>

                      <div className="w-full mb-6 md:flex md:flex-wrap mx-auto">
                        <TextField
                          className="m-1 w-full"
                          id="nom_site"
                          label="Nom du site"
                          variant="outlined"
                          size="small"
                          value={name}
                          onChange={handleNameChange}
                          required
                        />
                      </div>

                      <div className="flex flex-wrap mb-2 justify-center">
                        <div className="w-full md:w-1/2 px-1 mb-6">
                          <TextField
                            id="adress_site"
                            label="Adresse du site"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={siteAddress}
                            onChange={handleSiteAddressChange}
                          />
                        </div>
                        <div className="w-full md:w-1/2 px-1 mb-6">
                          <TextField
                            id="code_postal"
                            label="Code postal"
                            variant="outlined"
                            className="w-32 md:w-40"
                            size="small"
                            value={siteCodePostal}
                            onChange={handleSiteCodePostalChange}
                          />
                        </div>
                      </div>

                      <div className="w-full px-1 mb-6 mx-auto">
                        <FormControl size="small" className="w-full">
                          <InputLabel id="demo-multiple-checkbox-label">
                            Category
                          </InputLabel>
                          <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={selectedCategories}
                            onChange={handleCategoryChange}
                            input={<OutlinedInput label="Category" />}
                            renderValue={(selected) => selected.join(", ")}
                            MenuProps={MenuProps}
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
                          onClick={close}
                        >
                          Annuler
                        </Button>
                      </div>
                    </>
                  ) : screenSize.width > 700 && type === "editSite" ? (
                    <>
                      <h1 className="pt-10 block uppercase tracking-wide text-center text-gray-700 text-lg font-bold mb-10 flex justify-center items-center">
                        <span className="text-sm">
                          Modifier les informations du site
                        </span>
                        <HighlightOffIcon
                          color="black"
                          sx={{ cursor: "pointer", ml: 2 }}
                          onClick={close}
                        />
                      </h1>
                      <FormControl
                        fullWidth
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          marginLeft: 7,
                        }}
                      >
                        <div className="w-full md:w-1/2 px-1 mb-6">
                          <TextField
                            id="adress_site"
                            label="Adresse du site"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={adresse}
                            onChange={(e) => setAdresse(e.target.value)}
                          />
                        </div>
                        <div className="w-full md:w-1/2 px-1">
                          <TextField
                            id="code_postal"
                            label="Code postal"
                            variant="outlined"
                            sx={{ m: 0, width: 112 }}
                            size="small"
                            value={codePostal}
                            onChange={(e) => setCodePostal(e.target.value)}
                          />
                        </div>
                      </FormControl>

                      <div className="flex flex-wrap mb-2">
                        <div className="w-full md:w-1/3 px-3 mb-6">
                          <div>
                            <FormControl
                              sx={{ m: 1, width: 361, ml: 6 }}
                              size="small"
                            >
                              <InputLabel id="demo-multiple-checkbox-label">
                                Category
                              </InputLabel>
                              <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={subContent}
                                onChange={(e) => setSubContent(e.target.value)}
                                input={<OutlinedInput label="Category" />}
                                renderValue={(selected) => selected.join(", ")}
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
                        </div>
                      </div>
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
                          onClick={close}
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
