import React from "react";
import LOGO from "../assets/logo2.png";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box, Stack } from "@mui/material";

const Footer = () => {
  return (
    <footer className="text-center text-black bg-[#f3f3ff]">
      <div className="p-1 flex justify-center">
        <div className="flex justify-around items-center flex-wrap w-full ">
          <img src={LOGO} className="mr-3 h-8" alt="Logo" />
          <div className="">
            <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-4">
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { width: "100%" }, // Adjust the width as needed
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  size="small"
                />
              </Box>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 text-center">© 2023 Copyright: QR Solution</div>
    </footer>
  );
};

export default Footer;
