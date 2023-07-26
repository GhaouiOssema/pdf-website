import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, FormLabel, Stack, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import PdfView from "./PdfView";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const VerificationCode = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [open, setOpen] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { site, dossier, id } = useParams();

  const decodedId = decodeURIComponent(id);

  const parts = decodedId.split(" ");
  const concatenatedValue = "" + parts[0] + parts[1];

  const navigate = useNavigate();
  const handleClose = () => setOpen(false);

  const handleConfirmation = async () => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_SERVER_API_URL
        }/public/verification/view/${verificationCode}`
      );

      const { verified } = response.data;
      if (verified) {
        alert(verified);
        localStorage.setItem("confirmed", "true");
        navigate(`/publique/${site}/${dossier}/pdf/view/${id}`);
      } else {
        alert(verified);
      }
    } catch (error) {
      console.error("Error occurred during verification:", error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
            }}
          >
            <div className="mb-2 block">
              <Typography
                variant="h7"
                component="h2"
                sx={{ fontWeight: "bold", textAlign: "center" }}
              >
                Enter le code du Verification
              </Typography>
            </div>
            <div className="relative">
              <TextField
                fullWidth
                id="verificationCode"
                type={showPassword ? "text" : "password"}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={toggleShowPassword}
              >
                {showPassword ? (
                  <VisibilityOutlinedIcon />
                ) : (
                  <VisibilityOffOutlinedIcon />
                )}
              </div>
            </div>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                pt: 2,
              }}
            >
              <Button
                fullWidth
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleConfirmation}
              >
                Verifier
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default VerificationCode;
