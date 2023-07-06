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

const names = ["climatiseur", "chauffage", "Armoire electrique", "Ventilateur"];

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
  const addSite = async () => {
    try {
      const formData = {
        adresse: siteAddress,
        code_postal: siteCodePostal,
        subFolders: selectedCategories,
      };

      const token = localStorage.getItem("token");
      console.log(formData);

      if (!token) {
        return;
      }

      const { userId, userName } = JSON.parse(atob(token.split(".")[1]));
      // Extract the necessary information from the token payload

      const response = await axios.post(
        "http://localhost:3000/sites/creation",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-User-Id": userId, // Pass the userId as a custom header
            "X-User-Name": userName, // Pass the userName as a custom header
          },
        }
      );

      setAlertMsg("success");
      handleClick();
      setOpen(true);
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
        subfolders: subContent, // Use "subfolders" instead of "subFolders"
      };

      console.log(subContent);

      const response = await axios.put(
        `http://localhost:3000/site/${folderIdUpdate}`,
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
      timeoutNavigate = setTimeout(action, 2000);
    }

    return () => {
      clearTimeout(timeoutNavigate);
    };
  }, [alertMsg]);

  return (
    <>
      <div className="w-[100%] boor">
        <CssBaseline />
        <form>
          <Container fixed>
            <Box
              component="form"
              sx={{
                bgcolor: "white",
                height: "50vh",
                borderRadius: "25px",
                width: 500,
                marginLeft: 35,
              }}
            >
              <div className="text-black">
                <div className="w-full max-w-lg ">
                  {screenSize.width > 700 && type === "siteButton" ? (
                    <>
                      <h1 className="pt-10 block uppercase tracking-wide text-center text-gray-700 text-lg font-bold mb-10 flex justify-center items-center">
                        <span className="text-sm">
                          Villiuer saisir les informations du site
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
                        <div className="w-full md:w-1/2 px-1 mb-6 md:mb-0">
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
                        <div className="w-full md:w-1/2 px-1">
                          <TextField
                            id="code_postal"
                            label="Code postal"
                            variant="outlined"
                            sx={{ m: 0, width: 112 }}
                            size="small"
                            value={siteCodePostal}
                            onChange={handleSiteCodePostalChange}
                          />
                        </div>
                      </FormControl>

                      <div className="flex flex-wrap mb-2">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
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
                      </Stack>
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
                        <div className="w-full md:w-1/2 px-1 mb-6 md:mb-0">
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
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
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
