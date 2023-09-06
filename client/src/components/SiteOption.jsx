import React, { useEffect, useRef, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import axios from "axios";
import { Box, Button, CircularProgress, Stack } from "@mui/material";

const ITEM_HEIGHT = 48;

const CircularIndeterminate = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress size={20} sx={{ color: "red" }} />
    </Box>
  );
};

const SiteOption = ({
  folders,
  setOpenSection,
  setButtonType,
  setFolderIdUpdate,
  optionRef,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [loading, setLoading] = useState(false);
  const [deleteResponseConfirmation, setDeleteResponseConfirmation] =
    useState(false);

  const handleClick = (event) => {
    if (event && typeof event.stopPropagation === "function") {
      setAnchorEl(event.currentTarget);
      event.stopPropagation();
    }
  };

  const handleClose = (event) => {
    if (event && typeof event.stopPropagation === "function") {
      event.stopPropagation();
      setAnchorEl(null);
    }
  };

  const handleDelete = async (folderId, event) => {
    event.stopPropagation();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.delete(
        `${import.meta.env.VITE_SERVER_API_URL}/site/${folderId}`,
        config
      );

      if (res.status === 200) {
        handleClose(event);
        setLoading(false);
        setDeleteResponseConfirmation(true);
      } else {
        console.error("Failed to delete folder");
      }
    } catch (error) {
      console.error("An error occurred while deleting the folder:", error);
    }
  };

  const handleEdit = async (folderId, event) => {
    setFolderIdUpdate(folderId);
    handleClose(event);
    setOpenSection(true);
    setButtonType("editSite");
  };

  useEffect(() => {
    let timeoutReload;

    const action = () => {
      window.location.reload();
    };

    if (deleteResponseConfirmation === true) {
      timeoutReload = setTimeout(action, 1000);
    }

    return () => {
      clearTimeout(timeoutReload);
    };
  }, [open]);

  const handleOutsideClick = (event) => {
    if (optionRef.current && !optionRef.current.contains(event.target)) {
      handleClose(event);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={(event) => handleClick(event)}
        onClose={(event) => handleClose(event)}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem
          onClick={(event) => handleDelete(folders._id, event)}
          onClose={(event) => handleClose(event)}
        >
          <div className="w-full flex justify-around items-center font-sans font-medium text-red-500">
            {loading ? (
              <CircularIndeterminate sx={{ color: "#EF4444" }} />
            ) : (
              <DeleteIcon sx={{ color: "#EF4444" }} />
            )}
            <span>Suprimer</span>
          </div>
        </MenuItem>
        <MenuItem onClick={(event) => handleEdit(folders._id, event)}>
          <div className="w-full flex justify-around font-sans font-medium text-blue-500">
            <EditNoteIcon sx={{ color: "#3B82F6" }} />
            <span>Modifier</span>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default SiteOption;
