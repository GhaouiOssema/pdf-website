import React, { useEffect, useRef, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import axios from "axios";
import { Box, CircularProgress } from "@mui/material";

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
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteResponseConfirmation, setDeleteResponseConfirmation] =
    useState(false);
  const menuRef = useRef(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        setLoading(false);
        setDeleteResponseConfirmation(true);
        handleClose(); // Close the menu
      } else {
        console.error("Failed to delete folder");
      }
    } catch (error) {
      console.error("An error occurred while deleting the folder:", error);
    }
  };

  const handleEdit = (folderId, event) => {
    setFolderIdUpdate(folderId);
    setOpenSection(true);
    setButtonType("editSite");
    handleClose(); // Close the menu
  };

  const handleOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      handleClose(); // Close the menu
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

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
  }, [deleteResponseConfirmation]);

  return (
    <div className="mt-5">
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={anchorEl ? "long-menu" : undefined}
        aria-expanded={Boolean(anchorEl)}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
        ref={menuRef}
      >
        <MenuItem onClick={(event) => handleDelete(folders._id, event)}>
          <div className="w-full flex justify-around items-center font-sans font-medium text-red-500">
            {loading ? (
              <CircularIndeterminate sx={{ color: "#EF4444" }} />
            ) : (
              <DeleteIcon sx={{ color: "#EF4444" }} />
            )}
            <span>Supprimer</span>
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
