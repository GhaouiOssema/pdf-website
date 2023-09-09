import React, { useEffect, useRef, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LOGO from "../../assets/logo2.png";
import { Link } from "react-router-dom";
import { Button, Carousel } from "flowbite-react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IMG_1 from "../../assets/carrousel1.jpg";
import IMG_2 from "../../assets/carousel2.jpg";
import IMG_3 from "../../assets/carousel3.jpg";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogActions, DialogContent, Slide } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Popup = ({ open, setOpen }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <>
        <DialogContent>
          <div className="text-[#125ba3] text-center text-3xl mb-4 flex justify-center items-center">
            <i className="fa-solid fa-circle-check"></i>
          </div>
          <p className="font-sans font-semibold text-[#125ba3] text-center">
            Votre message a été envoyé correctement.
          </p>
        </DialogContent>
      </>
    </Dialog>
  );
};

const Home = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const pages = ["connexion", "inscription", "Home"];
  const decouvrirSectionRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const ContactUs = useRef(null);
  const popupRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOutsideClick = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsNavbarVisible(true);
    } else {
      setIsNavbarVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToContactUs = () => {
    if (ContactUs.current) {
      const yOffset = -85;
      const rect = ContactUs.current.getBoundingClientRect();
      const y = rect.top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const scrollToDecouvrir = () => {
    if (decouvrirSectionRef.current) {
      const yOffset = -85;
      const rect = decouvrirSectionRef.current.getBoundingClientRect();
      const y = rect.top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const sendContactForm = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_API_URL}/contactus/message/${email}`,
        {
          email,
          name,
          message,
        }
      );

      if (res.status === 200) {
        setOpen(true);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="bg-gray-100">
      {open && <Popup open={open} setOpen={setOpen} />}
      {isNavbarVisible && (
        <header className="fixed w-full z-50 transition-all bg-white top-0 left-0 right-0">
          <nav className="px-4 lg:px-6 py-2.5 bg-none dark:bg-gray-800">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl">
              <a
                href="#"
                className="flex w-full lg:w-1/6 md:w-1/6 justify-center lg:justify-start md:justify-start items-center lg:mb-0 mb-5"
              >
                <img
                  src={LOGO}
                  className="mr-3 h-6 sm:h-9"
                  alt="Flowbite Logo"
                />
              </a>
              <div className=" flex justify-center items-center lg:w-[26.2%] md:w-[26.2%] w-full">
                <Link
                  to={"/"}
                  className="cursor-pointer text-black font-medium text-sm px-4 py-2.5 mr-2"
                  style={{ position: "relative", display: "inline-block" }}
                >
                  {pages[2]}
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "50%",
                      height: "3px",
                      background: "#F0854A",
                    }}
                  />
                </Link>

                <Link
                  to={"/seconnecter"}
                  className="cursor-pointer text-black text-sm px-4 py-2.5 mr-2"
                >
                  {pages[0]}
                </Link>
                <Link
                  to={"/inscription"}
                  className="cursor-pointer text-black text-sm px-4 py-2.5 mr-2"
                >
                  {pages[1]}
                </Link>
              </div>
            </div>
          </nav>
        </header>
      )}

      <section className="text-gray-600 body-font" ref={popupRef}>
        <div className="container mx-auto flex px-5 py-24 h-screen items-center justify-center flex-col">
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="font-sans py-10 tracking-wide leading-10 gradient-text title-font md:text-4xl xl:text-5xl sm:text-3xl text-3xl mb-4 font-extrabold text-gray-900">
              Une maintenance simplifiée
              {/* <img
                alt="scribble"
                src={IMG}
                className="mx-auto md:absolute md:ml-[37rem] md:h-[3rem] md:mt-[-23px] md:w-[310px]"
              /> */}
              <br />
              <span>dès aujourd'hui.</span>
            </h1>

            <p className="mb-8 leading-relaxed md:text-xl xl:text-xl sm:text-lg text-base font-sans ">
              Maximisez l'efficacité de votre gestion et entretien d'équipements
              grâce à notre solution QR . Bénéficiez d'une maintenance
              simplifiée qui assure une performance optimale de vos
              installations.
            </p>
            <ul className="circles">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <div className="relative flex justify-center">
              <button
                onClick={scrollToDecouvrir}
                className="font-sans sm:text-base inline-flex justify-center items-center py-3 px-5 mr-3 text-base font-medium text-center text-white rounded-lg custome__border__blue bg-[#F0854A] hover:bg-[#F0854A]"
              >
                Découvrir plus
              </button>
              <button
                onClick={scrollToContactUs}
                className="sm:text-base inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-[#125ba3] hover:text-white rounded-lg custome__border border-[#125ba3] hover:bg-[#125ba3]"
              >
                Nous contacter
              </button>
            </div>
          </div>
        </div>
      </section>

      <div
        ref={decouvrirSectionRef}
        className=" bg-white rounded-lg px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20"
      >
        <div className="w-full mb-10 md:mx-auto sm:text-center  md:mb-12">
          <h2 className="  w-full mb-6 font-sans text-2xl font-normal tracking-tight leading-[2rem] text-gray-900 sm:text-4xl ">
            Le technicien n'a qu'à scanner le QR pour consulter les anciennes
            interventions et rédiger de nouveaux rapports,{" "}
            <span className="font-bold text-[#125ba3]">
              mais c'est à toi de :{" "}
            </span>
          </h2>
        </div>
        <div className="relative grid gap-8 row-gap-5 mb-8 md:row-gap-8 lg:grid-cols-4 sm:grid-cols-2">
          <div className="absolute inset-0 flex items-center justify-center sm:hidden lg:flex">
            <div className="w-px h-full bg-gray-300 lg:w-full lg:h-px" />
          </div>
          <div className="p-5 duration-300 transform bg-white border rounded  hover:-translate-y-2">
            <div className="flex items-center justify-between mb-2">
              <p className=" text-gray-900 text-lg font-bold leading-5">
                {" "}
                Connexion à Votre Espace Compte
              </p>
              <p className="text-white flex items-center justify-center w-6 h-6 font-bold rounded text-deep-purple-accent-400 bg-[#125ba3]">
                1
              </p>
            </div>
            <p className="font-sans text-sm text-gray-500">
              Connectez-vous à votre espace compte pour accéder à toutes les
              fonctionnalités.
            </p>
          </div>
          <div className="p-5 duration-300 transform bg-white border rounded  hover:-translate-y-2">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-900 text-lg font-bold leading-5">
                Ajout de Sites
              </p>
              <p className="text-white flex items-center justify-center w-6 h-6 font-bold rounded text-deep-purple-accent-400 bg-[#125ba3]">
                2
              </p>
            </div>
            <p className="font-sans text-sm text-gray-500">
              Ajoutez des sites en fonction de l'emplacement de vos équipements.
            </p>
          </div>
          <div className="p-5 duration-300 transform bg-white border rounded  hover:-translate-y-2">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-900 text-lg font-bold leading-5">
                Ajout d'Équipements
              </p>
              <p className="text-white flex items-center justify-center w-6 h-6 font-bold rounded text-deep-purple-accent-400 bg-[#125ba3]">
                3
              </p>
            </div>
            <p className="font-sans text-sm text-gray-500">
              Ajoutez les équipements correspondants à chaque site en incluant
              leurs détails essentiels.
            </p>
          </div>
          <div className="p-5 duration-300 transform bg-white  border rounded hover:-translate-y-2">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-900 text-lg font-sans font-bold leading-5">
                {" "}
                Maintenance Facilitée
              </p>
              <p className="text-white flex items-center justify-center w-6 h-6 font-bold rounded text-deep-purple-accent-400 bg-[#125ba3]">
                4
              </p>
            </div>
            <p className="font-sans text-sm text-gray-500">
              Imprimez et collez le QR code sur chaque équipement.
            </p>
          </div>
        </div>
      </div>

      <section className="bg-white rounded-lg px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10 mt-[8vh] ">
        <div class=" px-4 mx-auto max-w-screen-xl sm:py-7 lg:px-6">
          <div class=" mb-8 lg:mb-16">
            <h2 className=" w-full mb-6 font-sans text-2xl font-normal tracking-tight leading-[2rem] text-gray-900 sm:text-4xl ">
              Transformez la maintenance en une source d'efficacité. Découvrez
              nos avantages et commencez à optimiser votre activité.
            </h2>
          </div>
          <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            <div className="p-5 duration-300 transform bg-white border rounded  hover:-translate-y-2">
              <div class="flex justify-center items-center mb-4 w-10 h-10   lg:h-12 lg:w-12 dark:bg-blue-900">
                <svg
                  class="w-5 h-5 text-[#125ba3] lg:w-6 lg:h-6 dark:text-blue-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 16.5V8.5M16 12.5L8 12.5008M3 5.5L5 3.5M21 5.5L19 3.5M20 12.5C20 16.9183 16.4183 20.5 12 20.5C7.58172 20.5 4 16.9183 4 12.5C4 8.08172 7.58172 4.5 12 4.5C16.4183 4.5 20 8.08172 20 12.5Z"
                    stroke="#125ba3"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h3 class="mb-2 text-xl font-bold dark:text-white">
                Gagnez du temps
              </h3>
              <p class="text-gray-500 dark:text-gray-400">
                Notre solution simplifie et accélère le processus de
                maintenance, réduisant ainsi les temps d'arrêt de production.
              </p>
            </div>
            <div className="p-5 duration-300 transform bg-white border rounded  hover:-translate-y-2">
              <div class="flex justify-center items-center mb-4 w-10 h-10   lg:h-12 lg:w-12 dark:bg-blue-900">
                <svg
                  class="w-5 h-5 text-[#125ba3] lg:w-6 lg:h-6 dark:text-blue-300"
                  fill="#125ba3"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 319.746 319.746"
                  xml:space="preserve"
                >
                  <path
                    d="M285.505,310.745c0,4.971-4.029,9-9,9h-65.867c-0.056,0.001-0.112,0.001-0.168,0.001c-0.057,0-0.112,0-0.168-0.001h-78.303
	c-0.112,0.002-0.225,0.002-0.337,0h-78.3c-0.112,0.002-0.225,0.002-0.337,0H9.305c-4.971,0-9-4.029-9-9s4.029-9,9-9h34.888V68.535
	c0-4.971,4.029-9,9-9s9,4.029,9,9v233.21h60.637V147.218c0-4.971,4.029-9,9-9c4.971,0,9,4.029,9,9v154.527h60.64v-91.58
	c0-4.971,4.029-9,9-9s9,4.029,9,9v91.58h57.035C281.476,301.745,285.505,305.774,285.505,310.745z M310.442,167.062
	c-4.971,0-9,4.029-9,9v24.574l-198.001-198c-1.805-1.805-4.189-2.688-6.552-2.634H9.305c-4.971,0-9,4.029-9,9s4.029,9,9,9h84.046
	l195.364,195.362H264.14c-4.971,0-9,4.029-9,9s4.029,9,9,9h46.302c2.917,0,5.511-1.388,7.155-3.54
	c0.369-0.482,0.684-0.995,0.941-1.526c0.579-1.188,0.903-2.523,0.903-3.934v-0.001v-46.302
	C319.442,171.091,315.412,167.062,310.442,167.062z"
                  />
                </svg>
              </div>
              <h3 class="mb-2 text-xl font-bold dark:text-white">
                Réduisez les coûts
              </h3>
              <p class="text-gray-500 dark:text-gray-400">
                Une maintenance préventive basée sur des données précises aide à
                prévenir les pannes coûteuses et prolonge la durée de vie de vos
                machines.
              </p>
            </div>
            <div className="p-5 duration-300 transform bg-white border rounded  hover:-translate-y-2">
              <div class="flex justify-center items-center mb-4 w-10 h-10   lg:h-12 lg:w-12 dark:bg-blue-900">
                <svg
                  class="w-5 h-5 text-[#125ba3] lg:w-6 lg:h-6 dark:text-blue-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.859 16.4999L12.3975 14.0385L11.6459 14.7902C10.8764 15.5597 10.4916 15.9444 10.0781 15.8536C9.66452 15.7628 9.47641 15.2522 9.10019 14.231L7.84544 10.8253C7.09492 8.78816 6.71966 7.7696 7.24463 7.24463C7.7696 6.71966 8.78816 7.09492 10.8253 7.84544L14.231 9.10019C15.2522 9.47641 15.7628 9.66451 15.8536 10.0781C15.9444 10.4916 15.5597 10.8764 14.7902 11.6459L14.0385 12.3975L16.4999 14.859C16.7548 15.1138 16.8822 15.2413 16.9411 15.3834C17.0196 15.573 17.0196 15.7859 16.9411 15.9755C16.8822 16.1176 16.7548 16.2451 16.4999 16.4999C16.2451 16.7548 16.1176 16.8822 15.9755 16.9411C15.7859 17.0196 15.573 17.0196 15.3834 16.9411C15.2413 16.8822 15.1138 16.7548 14.859 16.4999Z"
                    stroke="#125ba3"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
                    stroke="#125ba3"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
              <h3 class="mb-2 text-xl font-bold dark:text-white">
                Facilité d'utilisation
              </h3>
              <p class="text-gray-500 dark:text-gray-400">
                une installation simple des codes QR et une interface
                conviviale, facilitant ainsi leur utilisation.
              </p>
            </div>
            <div className="p-5 duration-300 transform bg-white border rounded  hover:-translate-y-2">
              <div class="flex justify-center items-center mb-4 w-10 h-10   lg:h-12 lg:w-12 dark:bg-blue-900">
                <svg
                  class="w-5 h-5 text-[#125ba3] lg:w-6 lg:h-6 dark:text-blue-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 15V14H14V15H15ZM20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L20.2929 21.7071ZM15 9H14V10H15V9ZM21.7071 3.70711C22.0976 3.31658 22.0976 2.68342 21.7071 2.29289C21.3166 1.90237 20.6834 1.90237 20.2929 2.29289L21.7071 3.70711ZM9 15H10V14H9V15ZM2.29289 20.2929C1.90237 20.6834 1.90237 21.3166 2.29289 21.7071C2.68342 22.0976 3.31658 22.0976 3.70711 21.7071L2.29289 20.2929ZM9 9V10H10V9H9ZM3.70711 2.29289C3.31658 1.90237 2.68342 1.90237 2.29289 2.29289C1.90237 2.68342 1.90237 3.31658 2.29289 3.70711L3.70711 2.29289ZM16 20V15H14V20H16ZM15 16H20V14H15V16ZM14.2929 15.7071L20.2929 21.7071L21.7071 20.2929L15.7071 14.2929L14.2929 15.7071ZM14 4V9H16V4H14ZM15 10H20V8H15V10ZM15.7071 9.70711L21.7071 3.70711L20.2929 2.29289L14.2929 8.29289L15.7071 9.70711ZM10 20V15H8V20H10ZM9 14H4V16H9V14ZM8.29289 14.2929L2.29289 20.2929L3.70711 21.7071L9.70711 15.7071L8.29289 14.2929ZM8 4V9H10V4H8ZM9 8H4V10H9V8ZM9.70711 8.29289L3.70711 2.29289L2.29289 3.70711L8.29289 9.70711L9.70711 8.29289Z"
                    fill="#125ba3"
                  />
                </svg>
              </div>
              <h3 class="mb-2 text-xl font-bold dark:text-white">
                Suivi centralisé
              </h3>
              <p class="text-gray-500 dark:text-gray-400">
                Tous les rapports de maintenance sont automatiquement
                enregistrés dans notre système, vous permettant de suivre
                l'historique de chaque machine et de planifier les interventions
                futures.
              </p>
            </div>
            <div className="p-5 duration-300 transform bg-white border rounded  hover:-translate-y-2">
              <div class=" flex justify-center items-center mb-4 w-10 h-10   lg:h-12 lg:w-12 dark:bg-blue-900">
                <svg
                  class="w-5 h-5 text-[#125ba3] lg:w-6 lg:h-6 dark:text-blue-300"
                  fill="#125ba3"
                  viewBox="0 0 32 32"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>network</title>
                  <path d="M27 21.75c-0.795 0.004-1.538 0.229-2.169 0.616l0.018-0.010-2.694-2.449c0.724-1.105 1.154-2.459 1.154-3.913 0-1.572-0.503-3.027-1.358-4.212l0.015 0.021 3.062-3.062c0.57 0.316 1.249 0.503 1.971 0.508h0.002c2.347 0 4.25-1.903 4.25-4.25s-1.903-4.25-4.25-4.25c-2.347 0-4.25 1.903-4.25 4.25v0c0.005 0.724 0.193 1.403 0.519 1.995l-0.011-0.022-3.062 3.062c-1.147-0.84-2.587-1.344-4.144-1.344-0.868 0-1.699 0.157-2.467 0.443l0.049-0.016-0.644-1.17c0.726-0.757 1.173-1.787 1.173-2.921 0-2.332-1.891-4.223-4.223-4.223s-4.223 1.891-4.223 4.223c0 2.332 1.891 4.223 4.223 4.223 0.306 0 0.605-0.033 0.893-0.095l-0.028 0.005 0.642 1.166c-1.685 1.315-2.758 3.345-2.758 5.627 0 0.605 0.076 1.193 0.218 1.754l-0.011-0.049-0.667 0.283c-0.78-0.904-1.927-1.474-3.207-1.474-2.334 0-4.226 1.892-4.226 4.226s1.892 4.226 4.226 4.226c2.334 0 4.226-1.892 4.226-4.226 0-0.008-0-0.017-0-0.025v0.001c-0.008-0.159-0.023-0.307-0.046-0.451l0.003 0.024 0.667-0.283c1.303 2.026 3.547 3.349 6.1 3.349 1.703 0 3.268-0.589 4.503-1.574l-0.015 0.011 2.702 2.455c-0.258 0.526-0.41 1.144-0.414 1.797v0.001c0 2.347 1.903 4.25 4.25 4.25s4.25-1.903 4.25-4.25c0-2.347-1.903-4.25-4.25-4.25v0zM8.19 5c0-0.966 0.784-1.75 1.75-1.75s1.75 0.784 1.75 1.75c0 0.966-0.784 1.75-1.75 1.75v0c-0.966-0.001-1.749-0.784-1.75-1.75v-0zM5 22.42c-0.966-0.001-1.748-0.783-1.748-1.749s0.783-1.749 1.749-1.749c0.966 0 1.748 0.782 1.749 1.748v0c-0.001 0.966-0.784 1.749-1.75 1.75h-0zM27 3.25c0.966 0 1.75 0.784 1.75 1.75s-0.784 1.75-1.75 1.75c-0.966 0-1.75-0.784-1.75-1.75v0c0.001-0.966 0.784-1.749 1.75-1.75h0zM11.19 16c0-0.001 0-0.002 0-0.003 0-2.655 2.152-4.807 4.807-4.807 1.328 0 2.53 0.539 3.4 1.409l0.001 0.001 0.001 0.001c0.87 0.87 1.407 2.072 1.407 3.399 0 2.656-2.153 4.808-4.808 4.808s-4.808-2.153-4.808-4.808c0-0 0-0 0-0v0zM27 27.75c-0.966 0-1.75-0.784-1.75-1.75s0.784-1.75 1.75-1.75c0.966 0 1.75 0.784 1.75 1.75v0c-0.001 0.966-0.784 1.749-1.75 1.75h-0z"></path>
                </svg>
              </div>
              <h3 class="mb-2 text-xl font-bold dark:text-white">
                Évolutivité
              </h3>
              <p class="text-gray-500 dark:text-gray-400">
                Notre solution est parfaitement adaptable à vos besoins, que
                vous ayez une petite entreprise ou une grande usine.
              </p>
            </div>
            <div className="p-5 duration-300 transform bg-white border rounded  hover:-translate-y-2">
              <div class="flex justify-center items-center mb-4 w-10 h-10   lg:h-12 lg:w-12 dark:bg-blue-900">
                <svg
                  class="w-5 h-5 text-[#125ba3] lg:w-6 lg:h-6 dark:text-blue-300"
                  viewBox="0 0 24 24"
                  id="_24x24_On_Light_Support"
                  data-name="24x24/On Light/Support"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <rect
                      id="view-box"
                      width="24"
                      height="24"
                      fill="none"
                    ></rect>
                    <path
                      id="Shape"
                      d="M8,17.751a2.749,2.749,0,0,1,5.127-1.382C15.217,15.447,16,14,16,11.25v-3c0-3.992-2.251-6.75-5.75-6.75S4.5,4.259,4.5,8.25v3.5a.751.751,0,0,1-.75.75h-1A2.753,2.753,0,0,1,0,9.751v-1A2.754,2.754,0,0,1,2.75,6h.478c.757-3.571,3.348-6,7.022-6s6.264,2.429,7.021,6h.478a2.754,2.754,0,0,1,2.75,2.75v1a2.753,2.753,0,0,1-2.75,2.75H17.44A5.85,5.85,0,0,1,13.5,17.84,2.75,2.75,0,0,1,8,17.751Zm1.5,0a1.25,1.25,0,1,0,1.25-1.25A1.251,1.251,0,0,0,9.5,17.751Zm8-6.75h.249A1.251,1.251,0,0,0,19,9.751v-1A1.251,1.251,0,0,0,17.75,7.5H17.5Zm-16-2.25v1A1.251,1.251,0,0,0,2.75,11H3V7.5H2.75A1.251,1.251,0,0,0,1.5,8.751Z"
                      transform="translate(1.75 2.25)"
                      fill="#125ba3"
                    ></path>
                  </g>
                </svg>
              </div>
              <h3 class="mb-2 text-xl font-bold dark:text-white">
                Support dédié
              </h3>
              <p class="text-gray-500 dark:text-gray-400">
                Bénéficiez d'un service client dédié pour répondre à vos
                questions et vous assister à chaque étape de la mise en place de
                la solution.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-[8vh] dark:bg-gray-800">
        <div className=" bg-white rounded-lg mt-14  px-4 py-6 mx-auto max-w-screen-xl lg:px-6">
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              mb: 2,
              fontSize: { sm: "2em", md: "2em", lg: "2em", xl: "3em" },
            }}
          >
            <span className="font-sans font-normal text-gray-900">
              Questions fréquemment posées
            </span>
          </Typography>
          <Accordion sx={{ borderRadius: "8px", boxShadow: "none" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                Dois-je acheter un équipement spécial pour utiliser la solution
                QR ?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <span className="font-sans font-bold">Réponse :</span> Non, vous
                n'avez pas besoin d'équipement spécial. Notre solution QR
                fonctionne en ligne, et vous pouvez l'utiliser avec les
                équipements que vous avez déjà. Vous avez simplement besoin d'un
                téléphone ou d'un ordinateur pour y accéder.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ borderRadius: "8px", boxShadow: "none", mt: 1 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>
                {" "}
                Comment puis-je obtenir de l'aide en cas de problème technique ?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <span className="font-sans font-bold">Réponse :</span> Si vous
                rencontrez des problèmes techniques, contactez notre service
                clientèle. Nous sommes là pour vous aider à résoudre vos
                problèmes.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ borderRadius: "8px", boxShadow: "none", mt: 1 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>
                Comment puis-je résoudre les problèmes de lecture des QR codes
                sur mes équipements ?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <span className="font-sans font-bold">Réponse : </span>
                Assurez-vous que les QR codes sont propres et lisibles. Si vous
                avez des problèmes persistants, contactez notre support
                technique pour obtenir de l'aide.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </section>

      <div
        ref={ContactUs}
        className="bg-white rounded-lg px-4 py-6 mx-auto max-w-screen-xl lg:px-6 mt-[8vh] "
      >
        <section>
          <div className="flex flex-wrap">
            <div className="mb-10 w-full shrink-0 grow-0 basis-auto md:mb-0 md:w-6/12 md:px-3 lg:px-6">
              <h2 className=" pt-5 w-full mb-2 font-sans text-2xl font-normal tracking-tight leading-[2rem] text-gray-900 sm:text-4xl ">
                Besoin de nous joindre rapidement ?
                <span className="font-bold text-[#125ba3]">
                  {" "}
                  Pas de souci !{" "}
                </span>
              </h2>
              <p className="mb-6 font-sans text-gray-500 dark:text-neutral-300">
                <br />{" "}
                <span className="text-gray-700 font-medium">Par Email : </span>
                <span className="text-gray-700 font-thin ">
                  Rédigez simplement votre message ici, et nous vous répondrons
                  en moins de 24 heures.
                </span>{" "}
                <br />{" "}
                <span className="text-gray-700 font-medium">
                  Par Téléphone :{" "}
                </span>
                <span className="text-gray-700 font-thin">
                  Pour une assistance immédiate, appelez-nous.
                </span>{" "}
                <br />
                <br />
                <span className="text-gray-700 font-light ">
                  {" "}
                  Votre satisfaction est notre priorité. Nous sommes là pour
                  vous aider!
                </span>
              </p>
              <p className="mb-2 text-neutral-500 dark:text-neutral-300">
                Île-de-France, France
              </p>
              <p className="mb-2 text-neutral-500 dark:text-neutral-300">
                + 33 000 000 00
              </p>
              <p className="mb-2 text-neutral-500 dark:text-neutral-300">
                contact@qrsolution.fr
              </p>
            </div>
            <div className="bg-white shadow-md rounded-xl  flex justify-center flex-col  mb-12 w-full shrink-0 grow-0 basis-auto md:mb-0 md:w-6/12 md:px-3 lg:px-6">
              <form onSubmit={sendContactForm}>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="text"
                    className="text-black w-full px-4 py-2 border-[#125ba3] border-2 rounded-lg font-sans focus:outline-none  bg-white bg-opacity-90"
                    id="exampleInput90"
                    placeholder="Nom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="email"
                    className="text-black w-full px-4 py-2 border-[#125ba3] border-2 rounded-lg font-sans focus:outline-none bg-white bg-opacity-90"
                    placeholder="Votre adress"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <textarea
                    className="text-black w-full px-4 py-2 border-[#125ba3] border-2 rounded-lg font-sans  focus:outline-none  bg-white bg-opacity-90"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Votre message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  className="w-full flex justify-center hover:bg-[#F0854A] bg-[#125ba3] text-gray-100 font-sans p-4 rounded-lg tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
                >
                  Envoyer
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>

      <section className="dark:bg-gray-900 w-full">
        <div className="py-8 px-5 mx-auto">
          <div className="text-center bg-white rounded-lg px-4 py-6 mx-auto max-w-screen-xl lg:px-6 ">
            <h2 className=" pt-5 w-full mb-2 font-sans text-3xl font-normal tracking-tight leading-[2rem] text-gray-900">
              Boostez l'efficacité de votre maintenance dès à présent !
            </h2>
            <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg text-center">
              Prêt à transformer votre gestion de maintenance ?
            </p>
            <Link
              to="/inscription"
              className="font-sans sm:text-base inline-flex justify-center items-center py-3 px-5 mr-3 text-base font-medium text-center text-white rounded-lg custome__border__blue bg-[#F0854A] hover:bg-[#F0854A]"
            >
              s'inscrire
            </Link>
          </div>
        </div>
      </section>

      <footer className="text-gray-600 body-font bg-gray-100">
        <div className="container px-5 py-4 mx-auto flex items-center sm:flex-row flex-col">
          <div className="w-full flex sm:flex-row flex-col items-center justify-around">
            <a className="ml-0 md:ml-20 lg:ml20 xl:ml:40 2xl:ml-40 flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
              <img
                src={LOGO}
                alt="logo"
                className="w-40 h-full hidden md:block"
              />
            </a>
            <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
              &copy; {new Date().getFullYear()} WeCom. Tous droits réservés.
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start mr-0 lg:mr20 xl:mr:40 2xl:mr-40">
              <a className="text-gray-500">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a className="ml-3 text-gray-500">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a className="ml-3 text-gray-500">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
              <a className="ml-3 text-gray-500">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="none"
                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                  ></path>
                  <circle cx="4" cy="4" r="2" stroke="none"></circle>
                </svg>
              </a>
            </span>
          </div>
        </div>
      </footer>

      {isNavbarVisible && (
        <div className="fixed bottom-20 right-6 z-50">
          <button
            onClick={scrollToTop}
            className="bg-[#F0854A] text-white py-2 px-4 rounded-full shadow-md focus:outline-none focus:bg-[#125ba3] hover:bg-[#125ba3]"
          >
            <KeyboardArrowUpIcon size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
