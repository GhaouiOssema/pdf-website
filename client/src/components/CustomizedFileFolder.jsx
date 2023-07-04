import React, { useState } from "react";
import Box from "@mui/material/Box";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";
import { Backdrop, CircularProgress } from "@mui/material";
import View from "./View";

const data = [
  { icon: <SummarizeOutlinedIcon />, label: "Authentication" },
  { icon: <SummarizeOutlinedIcon />, label: "Database" },
  { icon: <SummarizeOutlinedIcon />, label: "Storage" },
  { icon: <SummarizeOutlinedIcon />, label: "Hosting" },
  { icon: <SummarizeOutlinedIcon />, label: "Authentication" },
  { icon: <SummarizeOutlinedIcon />, label: "Database" },
  { icon: <SummarizeOutlinedIcon />, label: "Storage" },
  { icon: <SummarizeOutlinedIcon />, label: "Hosting" },
  { icon: <SummarizeOutlinedIcon />, label: "Authentication" },
  { icon: <SummarizeOutlinedIcon />, label: "Database" },
  { icon: <SummarizeOutlinedIcon />, label: "Storage" },
  { icon: <SummarizeOutlinedIcon />, label: "Hosting" },
  { icon: <SummarizeOutlinedIcon />, label: "Authentication" },
  { icon: <SummarizeOutlinedIcon />, label: "Database" },
  { icon: <SummarizeOutlinedIcon />, label: "Storage" },
  { icon: <SummarizeOutlinedIcon />, label: "Hosting" },
  { icon: <SummarizeOutlinedIcon />, label: "Authentication" },
  { icon: <SummarizeOutlinedIcon />, label: "Database" },
  { icon: <SummarizeOutlinedIcon />, label: "Storage" },
  { icon: <SummarizeOutlinedIcon />, label: "Hosting" },
  { icon: <SummarizeOutlinedIcon />, label: "Authentication" },
  { icon: <SummarizeOutlinedIcon />, label: "Database" },
  { icon: <SummarizeOutlinedIcon />, label: "Storage" },
  { icon: <SummarizeOutlinedIcon />, label: "Hosting" },
  { icon: <SummarizeOutlinedIcon />, label: "Authentication" },
  { icon: <SummarizeOutlinedIcon />, label: "Database" },
  { icon: <SummarizeOutlinedIcon />, label: "Storage" },
  { icon: <SummarizeOutlinedIcon />, label: "Hosting" },
  { icon: <SummarizeOutlinedIcon />, label: "Authentication" },
  { icon: <SummarizeOutlinedIcon />, label: "Database" },
  { icon: <SummarizeOutlinedIcon />, label: "Storage" },
  { icon: <SummarizeOutlinedIcon />, label: "Hosting" },
  { icon: <SummarizeOutlinedIcon />, label: "Authentication" },
  { icon: <SummarizeOutlinedIcon />, label: "Database" },
  { icon: <SummarizeOutlinedIcon />, label: "Storage" },
  { icon: <SummarizeOutlinedIcon />, label: "Hosting" },
  { icon: <SummarizeOutlinedIcon />, label: "Authentication" },
  { icon: <SummarizeOutlinedIcon />, label: "Database" },
  { icon: <SummarizeOutlinedIcon />, label: "Storage" },
  { icon: <SummarizeOutlinedIcon />, label: "Hosting" },
  { icon: <SummarizeOutlinedIcon />, label: "Authentication" },
  { icon: <SummarizeOutlinedIcon />, label: "Database" },
  { icon: <SummarizeOutlinedIcon />, label: "Storage" },
  { icon: <SummarizeOutlinedIcon />, label: "Hosting" },
];
const CustomScrollbar = styled(Box)`
  overflow: auto;
  height: 100%;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.3) rgba(0, 0, 0, 0.1);

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background-color: white;
    border-radius: 3px;
  }
`;

const FireNav = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});
const CustomizedFileFolder = ({ PdfData }) => {
  const [open, setOpen] = useState(true);
  const [openSection, setOpenSection] = useState(false);
  const handleClose = () => {
    setOpenSection(false);
  };
  return (
    <>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={openSection}
        onClick={handleClose}
      >
        <View type="folderItemButton" />
      </Backdrop>
      <Box sx={{ display: "flex" }}>
        <ThemeProvider
          theme={createTheme({
            components: {
              MuiListItemButton: {
                defaultProps: {
                  disableTouchRipple: true,
                },
              },
            },
            palette: {
              mode: "dark",
              primary: { main: "rgb(102, 157, 246)" },
              background: { paper: "rgb(30,58,138)" },
            },
          })}
        >
          <Paper elevation={0} sx={{ width: 256 }}>
            <FireNav component="nav" disablePadding>
              <Divider />
              <Box
                sx={{
                  bgcolor: open ? "rgba(71, 98, 130, 0.2)" : null,
                  pb: open ? 2 : 0,
                }}
              >
                <ListItemButton
                  alignItems="flex-start"
                  onClick={() => setOpen(!open)}
                  sx={{
                    px: 3,
                    pt: 2.5,
                    pb: open ? 0 : 2.5,
                    "&:hover, &:focus": {
                      "& svg": { opacity: open ? 1 : 0 },
                    },
                  }}
                >
                  <ListItemText
                    primary="Les raports"
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontWeight: "medium",
                      lineHeight: "20px",
                      mb: "2px",
                    }}
                    secondary={PdfData.title}
                    secondaryTypographyProps={{
                      noWrap: true,
                      fontSize: 12,
                      lineHeight: "16px",
                      color: open ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
                    }}
                    sx={{ my: 0 }}
                  />
                  <KeyboardArrowDown
                    sx={{
                      mr: -1,
                      opacity: 0,
                      transform: open ? "rotate(-180deg)" : "rotate(0)",
                      transition: "0.2s",
                    }}
                  />
                </ListItemButton>
                {open && (
                  <CustomScrollbar
                    style={{
                      maxHeight: "30vh", // Adjust the max height as needed
                      overflowX: "hidden",
                    }}
                  >
                    {data.length > 0 ? (
                      data.map((item) => (
                        <ListItemButton
                          key={item.label}
                          onClick={() => setOpenSection(true)}
                          sx={{
                            py: 0,
                            minHeight: 32,
                            color: "rgba(255,255,255,.8)",
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              color: "inherit",
                            }}
                          >
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{
                              fontSize: 14,
                              fontWeight: "medium",
                            }}
                          />
                        </ListItemButton>
                      ))
                    ) : (
                      <ListItemButton
                        sx={{
                          py: 0,
                          minHeight: 32,
                          color: "rgba(255,255,255,.8)",
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            color: "inherit",
                          }}
                        >
                          <DangerousOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="aucun raport existe"
                          primaryTypographyProps={{
                            fontSize: 14,
                            fontWeight: "medium",
                          }}
                        />
                      </ListItemButton>
                    )}
                  </CustomScrollbar>
                )}
              </Box>
            </FireNav>
          </Paper>
        </ThemeProvider>
      </Box>
    </>
  );
};

export default CustomizedFileFolder;
