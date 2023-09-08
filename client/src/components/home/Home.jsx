import React, { useEffect, useRef, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LOGO from "../../assets/logo2.png";
import { Link } from "react-router-dom";
import { Carousel } from "flowbite-react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IMG_1 from "../../assets/carrousel1.jpg";
import IMG_2 from "../../assets/carousel2.jpg";
import IMG_3 from "../../assets/carousel3.jpg";

const Home = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const pages = ["connexion", "inscription", "Home"];
  const decouvrirSectionRef = useRef(null);

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

  const scrollToDecouvrir = () => {
    if (decouvrirSectionRef.current) {
      const yOffset = -85; // Adjust this value to fine-tune the scrolling position
      const rect = decouvrirSectionRef.current.getBoundingClientRect();
      const y = rect.top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gray-100">
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
      <section className="text-gray-600 body-font ">
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
            <div onClick={scrollToDecouvrir} className="flex justify-center">
              <button className="font-sans sm:text-base inline-flex justify-center items-center py-3 px-5 mr-3 text-base font-medium text-center text-white rounded-lg custome__border__blue bg-[#F0854A] hover:bg-[#F0854A]">
                Découvrir plus
              </button>
              <button className="sm:text-base inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-[#125ba3] hover:text-white rounded-lg custome__border border-[#125ba3] hover:bg-[#125ba3]">
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

      <section className="bg-white rounded-lg px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10 mt-[14vh] ">
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
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  ></path>
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
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
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
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  ></path>
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path>
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
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <h3 class="mb-2 text-xl font-bold dark:text-white">
                Suivi centralisé
              </h3>
              <p class="text-gray-500 dark:text-gray-400">
                une installation simple des codes QR et une interface
                conviviale, facilitant ainsi leur utilisation.
              </p>
            </div>
            <div className="p-5 duration-300 transform bg-white border rounded  hover:-translate-y-2">
              <div class=" flex justify-center items-center mb-4 w-10 h-10   lg:h-12 lg:w-12 dark:bg-blue-900">
                <svg
                  class="w-5 h-5 text-[#125ba3] lg:w-6 lg:h-6 dark:text-blue-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
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
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clip-rule="evenodd"
                  ></path>
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

      <section className="mt-[14vh] dark:bg-gray-800">
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
      <div className="bg-white rounded-lg px-4 py-6 mx-auto max-w-screen-xl lg:px-6 mt-[14vh] ">
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
              <form>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="text"
                    className="text-black w-full px-4 py-2 border-[#125ba3] border-2 rounded-lg font-sans focus:outline-none  bg-white bg-opacity-90"
                    id="exampleInput90"
                    placeholder="Nom"
                  />
                </div>

                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="email"
                    className="text-black w-full px-4 py-2 border-[#125ba3] border-2 rounded-lg font-sans focus:outline-none bg-white bg-opacity-90"
                    placeholder="Votre adress"
                  />
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <textarea
                    className="text-black w-full px-4 py-2 border-[#125ba3] border-2 rounded-lg font-sans  focus:outline-none  bg-white bg-opacity-90"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Votre message"
                  ></textarea>
                </div>
                <button
                  type="button"
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
            <h2 className=" pt-5 w-full mb-2 font-sans text-2xl font-normal tracking-tight leading-[2rem] text-gray-900 sm:text-4xl">
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
