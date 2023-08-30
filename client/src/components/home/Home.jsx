import React, { useEffect, useRef, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LOGO from "../../assets/logo2.png";
import { Link } from "react-router-dom";
import { Carousel } from "flowbite-react";
import IMG_1 from "../../assets/img_1.png";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
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
      decouvrirSectionRef.current.scrollIntoView({ behavior: "smooth" });
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
                  className="cursor-pointer text-black font-medium text-sm px-4 py-2.5 mr-2"
                >
                  {pages[1]}
                </Link>
              </div>
            </div>
          </nav>
        </header>
      )}

      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 h-screen items-center justify-center flex-col">
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="gradient-text title-font md:text-5xl xl:text-6xl sm:text-3xl text-3xl mb-4 font-extrabold text-gray-900">
              Une maintenance simplifiée dès aujourd'hui.
            </h1>
            <p className="mb-8 leading-relaxed md:text-xl xl:text-xl sm:text-lg text-base ">
              Maximisez l'efficacité de votre gestion et entretien d'équipements
              grâce à notre solution QR . Bénéficiez d'une maintenance
              simplifiée qui assure une performance optimale de vos
              installations.
            </p>
            <div onClick={scrollToDecouvrir} className="flex justify-center">
              <button className="sm:text-base inline-flex justify-center items-center py-3 px-5 mr-3 text-base font-medium text-center text-white rounded-lg custome__border__blue bg-[#F0854A] hover:bg-[#F0854A]">
                Découvrir plus
              </button>
              <button className="sm:text-base inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-[#125ba3] hover:text-white rounded-lg custome__border border-[#125ba3] hover:bg-[#125ba3]">
                Nous contacter
              </button>
            </div>
          </div>
        </div>
      </section>

      <div ref={decouvrirSectionRef} />
      <section className="bg-gray-50 dark:bg-gray-800">
        <div className="px-4 py-6 mx-auto max-w-screen-xl lg:px-6">
          <Carousel>
            <div className="relative flex flex-col sm:flex-row justify-around bg-blue-400 w-full h-full">
              <div className="w-full sm:w-1/2 h-full">
                <img
                  alt="..."
                  src={IMG_1}
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="w-full sm:w-1/2 flex justify-center items-center p-4">
                <span className="text-white font-bold text-center text-lg sm:text-xl md:text-2xl lg:text-3xl">
                  Importez facilement les plans détaillés de vos machines et
                  gérez leur maintenance de manière efficace et structurée.
                </span>
              </div>
            </div>
            <div className="relative flex flex-col sm:flex-row justify-around bg-red-400 w-full h-full">
              <div className="w-full sm:w-1/2 h-full">
                <img
                  alt="..."
                  src={IMG_1}
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="w-full sm:w-1/2 flex justify-center items-center p-4">
                <span className="text-white font-bold text-center text-lg sm:text-xl md:text-2xl lg:text-3xl">
                  Importez facilement les plans détaillés de vos machines et
                  gérez leur maintenance de manière efficace et structurée.
                </span>
              </div>
            </div>
            {/* <div className="relative flex flex-col sm:flex-row justify-around bg-blue-400 w-full h-full">
              <div className="w-full sm:w-1/2 h-full">
                <img
                  alt="..."
                  src={IMG_1}
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="w-full sm:w-1/2 flex justify-center items-center p-4">
                <span className="text-white font-bold text-center text-lg sm:text-xl md:text-2xl lg:text-3xl">
                  Importez facilement les plans détaillés de vos machines et
                  gérez leur maintenance de manière efficace et structurée.
                </span>
              </div>
            </div> */}
          </Carousel>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-800">
        <div className="px-4 py-6 mx-auto max-w-screen-xl lg:px-6">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Accordion 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Accordion 2</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Accordion 2</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </section>

      {/* <section className="flex flex-col items-center justify-center">
        <div className="p-6 bg-gray-800 text-gray-100 max-w-screen-xl mb-[5rem] rounded-xl">
          <div className="container mx-auto">
            <span className="block mb-2 text-xs font-medium tracki text-center uppercase text-violet-400">
              How it works
            </span>
            <h2 className="text-5xl font-bold text-center text-gray-50 mb-6">
              Building with Mamba is simple
            </h2>
            <div className="">
              <div className="grid slides pb-6 w-auto">
                <div className="flex flex-col p-8 space-y-4 rounded-md bg-gray-900 ml-5">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full bg-violet-400 text-gray-900">
                    1
                  </div>
                  <p className="text-2xl font-semibold">
                    <b>Nulla.</b>Nostrum, corrupti blanditiis. Illum,
                    architecto?
                  </p>
                </div>
                <div className="flex flex-col p-8 space-y-4 rounded-md bg-gray-900 ml-5">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full bg-violet-400 text-gray-900">
                    2
                  </div>
                  <p className="text-2xl font-semibold">
                    <b>Accusantium.</b>Vitae saepe atque neque sunt eius dolor
                    veniam alias debitis?
                  </p>
                </div>
                <div className="flex flex-col p-8 space-y-4 rounded-md bg-gray-900 ml-5">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full bg-violet-400 text-gray-900">
                    3
                  </div>
                  <p className="text-2xl font-semibold">
                    <b>Maxime.</b>Expedita temporibus culpa reprehenderit
                    doloribus consectetur odio!
                  </p>
                </div>
                <div className="flex flex-col p-8 space-y-4 rounded-md bg-gray-900 ml-5">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full bg-violet-400 text-gray-900">
                    3
                  </div>
                  <p className="text-2xl font-semibold">
                    <b>Maxime.</b>Expedita temporibus culpa reprehenderit
                    doloribus consectetur odio!
                  </p>
                </div>
                <div className="flex flex-col p-8 space-y-4 rounded-md bg-gray-900 ml-5">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full bg-violet-400 text-gray-900">
                    3
                  </div>
                  <p className="text-2xl font-semibold">
                    <b>Maxime.</b>Expedita temporibus culpa reprehenderit
                    doloribus consectetur odio!
                  </p>
                </div>
                <div className="flex flex-col p-8 space-y-4 rounded-md bg-gray-900 ml-5">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full bg-violet-400 text-gray-900">
                    3
                  </div>
                  <p className="text-2xl font-semibold">
                    <b>Maxime.</b>Expedita temporibus culpa reprehenderit
                    doloribus consectetur odio!
                  </p>
                </div>
                <div className="flex flex-col p-8 space-y-4 rounded-md bg-gray-900 ml-5">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full bg-violet-400 text-gray-900">
                    3
                  </div>
                  <p className="text-2xl font-semibold">
                    <b>Maxime.</b>Expedita temporibus culpa reprehenderit
                    doloribus consectetur odio!
                  </p>
                </div>
                <div className="flex flex-col p-8 space-y-4 rounded-md bg-gray-900 ml-5">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full bg-violet-400 text-gray-900">
                    3
                  </div>
                  <p className="text-2xl font-semibold">
                    <b>Maxime.</b>Expedita temporibus culpa reprehenderit
                    doloribus consectetur odio!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="bg-gray-50 dark:bg-gray-800">
        <div className="px-4 py-6 mx-auto max-w-screen-xl lg:px-6">
          <div className="max-w-screen-md mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">
              Avantages clés
            </h2>
            <p className="text-gray-500 sm:text-xl dark:text-gray-400">
              Boostez l'efficacité de votre maintenance
            </p>
          </div>
          <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                <svg
                  className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
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
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                Gagnez du temps
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Notre solution simplifie et accélère le processus de
                maintenance, réduisant ainsi les temps d'arrêt de production.
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                <svg
                  className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                Réduisez les coûts
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Une maintenance préventive basée sur des données précises aide à
                prévenir les pannes coûteuses et prolonge la durée de vie de vos
                machines.
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                <svg
                  className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
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
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                Suivi centralisé
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Tous les rapports de maintenance sont automatiquement
                enregistrés dans notre système, vous permettant de suivre
                l'historique de chaque machine et de planifier les interventions
                futures.
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                <svg
                  className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
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
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                Facilité d'utilisation
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                une installation simple des codes QR et une interface
                conviviale, facilitant ainsi leur utilisation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-800">
        <div className="px-4 py-6 mx-auto max-w-screen-xl lg:px-6">
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              mb: 2,
              fontSize: { sm: "2em", md: "2em", lg: "2em", xl: "3em" },
            }}
          >
            Questions fréquemment posées
          </Typography>
          <div className="flex justify-center">
            <Tabs
              aria-label="Vertical tabs"
              orientation="vertical"
              sx={{
                width: "100%",
                borderRadius: 0,
                backgroundColor: "#fff",
              }}
            >
              <TabList
                sx={{
                  backgroundColor: "#eee",
                  padding: "0.1rem",
                  color: "#000",
                  borderRadius: 0,
                }}
              >
                <Tab
                  sx={{
                    color: "#000",
                    width: "100%",
                    borderRadius: 0,
                    boxShadow: "none",
                  }}
                >
                  Qestion 1 :
                </Tab>
                <Tab
                  sx={{
                    color: "#000",
                    width: "100%",
                    borderRadius: 0,
                    boxShadow: "none",
                  }}
                >
                  Qestion 2 :
                </Tab>
              </TabList>
              <TabPanel
                value={1}
                sx={{
                  p: 2,
                  minHeight: "100%",
                  backgroundColor: "#fff",
                  color: "#000",
                  width: "50%",
                }}
              >
                <b>seconde tab : </b> <br />
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Ducimus quisquam soluta quo ullam eligendi cumque nemo repellat
                nisi sit pariatur. Corporis nostrum reiciendis magni mollitia
                sed ea eveniet, voluptatibus unde!{" "}
              </TabPanel>
              <TabPanel
                value={0}
                sx={{
                  p: 2,
                  minHeight: "100%",
                  backgroundColor: "#fff",
                  color: "#000",
                  width: "50%",
                }}
              >
                <b>First tab : </b> <br />
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Ducimus quisquam soluta quo ullam eligendi cumque nemo repellat
                nisi sit pariatur. Corporis nostrum reiciendis magni mollitia
                sed ea eveniet, voluptatibus unde!{" "}
              </TabPanel>
              {/* ... (Other tab panels) */}
            </Tabs>
          </div>
        </div>
      </section>

      <section className="dark:bg-gray-900 w-full">
        <div className="py-8 mx-auto">
          <div className="text-center">
            <h2 className="mb-4 text-xl font-extrabold leading-tight text-gray-900 dark:text-white">
              Boostez l'efficacité de votre maintenance dès à présent !
            </h2>
            <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
              Prêt à transformer votre gestion de maintenance ?
            </p>
            <a
              href="#"
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              s'inscrire
            </a>
          </div>
        </div>
      </section>

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
