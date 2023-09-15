import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { lg: 400, md: 400, sm: 300, xs: 300 },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

const QrView = ({ open, setOpen, site, dossier, id }) => {
  const handleClose = () => setOpen(false);
  const qrCodeRef = React.useRef(null);

  const handleDownloadQRCode = () => {
    html2canvas(qrCodeRef.current).then((canvas) => {
      const qrCodeDataURL = canvas.toDataURL();
      const downloadLink = document.createElement("a");
      downloadLink.href = qrCodeDataURL;
      downloadLink.download = "qr_code.png";
      downloadLink.click();
    });
  };

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          TransitionComponent: Fade,
        }}
      >
        <div>
          <Box sx={style}>
            <span className="text-lg font-sans font-medium flex justify-center flex-wrap text-center">
              Scannez moi
            </span>
            <div className="flex justify-center items-center mb-2">
              <div
                className="w-auto h-auto bg-black  mt-2 mb-2"
                ref={qrCodeRef}
              >
                <QRCode
                  className="w-60 h-60 "
                  value={`${
                    import.meta.env.VITE_NETLIFY_URL
                  }/publique/${site}/${dossier}/pdf/${id}`}
                />
              </div>
            </div>
            <div
              onClick={handleDownloadQRCode}
              className="cursor-pointer w-full flex justify-center"
            >
              <span className="w-full text-center uppercase text-sm tracking-wide bg-[#125ba3] text-gray-100 px-2 py-[10px] rounded-md focus:outline-none focus:shadow-outline hover:bg-green-700">
                Télècharger
              </span>
            </div>
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default QrView;
