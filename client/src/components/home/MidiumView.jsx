import React, { useContext, useEffect, useRef, useState } from "react";
import "./home.css";
import IMG from "../../assets/ligne.png";
import IMG_2 from "../../assets/img_4.jpg";
import { motion, useAnimation } from "framer-motion";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import DefaultCarousel from "../DefaultCarousel";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IMG_3 from "../../assets/carousel3.jpg";
import IMG_4 from "../../assets/carrousel4.jpg";
import IMG_1 from "../../assets/img_1.png";

import { Carousel } from "flowbite-react";
const MidiumView = () => {
  const decouvrirSectionRef = useRef(null);

  const scrollToDecouvrir = () => {
    decouvrirSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="bg-gray-100">
      <section className=" flex flex-col items-center justify-center w-full h-screen ">
        <div className=" relative place-self-center rounded-xl">
          <div
            className=" w-[450px] h-[350px] ml-[450px] md:absolute md:mt-[-250px]"
            style={{
              background:
                "linear-gradient(to bottom, #3291F0 40%, #3291F0 50%)",
              opacity: 0.3,
              filter: "blur(120px)",
              display: "flex",
              justifyContent: "flex-end",
            }}
          />
          <motion.h1
            className=" gradient-text text-4xl text-black text-center font-extrabold md:text-5xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="md:pb-[5px]">
              maintenance simplifiée
              {/* <img
                  alt="scribble"
                  src={IMG}
                  className="mx-auto md:absolute md:ml-[35rem] md:h-[3rem] md:mt-[-23px] md:w-[300px]"
                /> */}
            </h3>
            <span>dès aujourd'hui.</span>
          </motion.h1>
          <br />
          <motion.div
            className=" mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="flex flex-col text-center w-full text-lg">
              Maximisez l'efficacité de votre gestion et entretien d'équipements
              grâce à notre solution QR . Bénéficiez d'une maintenance
              simplifiée qui assure une performance optimale de vos
              installations.
            </p>
          </motion.div>
          <motion.div
            className="flex items-center justify-center cursor-pointer "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <a
              onClick={scrollToDecouvrir}
              className="inline-flex justify-center items-center py-3 px-5 mr-3 text-base font-medium text-center text-white rounded-lg custome__border__blue bg-[#F0854A] hover:bg-[#F0854A]"
            >
              Découvrir plus
              <svg
                className="ml-2 mr-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
            <motion.button
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-[#125ba3] hover:text-white rounded-lg custome__border border-[#125ba3] hover:bg-[#125ba3]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Nous contacter
            </motion.button>
          </motion.div>
        </div>
      </section>
      <div className=" bg-gray-100">
        {/* <section className="w-full mb-[5rem]" ref={decouvrirSectionRef}>
          <Carousel>
            <div className="relative flex justify-around bg-blue-400 w-full h-full">
              <div className="w-1/2 h-full">
                <img alt="..." src={IMG_1} className="object-cover h-full" />
              </div>
              <div className=" w-1/2">
                <h1 className="w-full h-full flex flex-col justify-center text-white font-bold opacity-100 text-center text-xl">
                  Importez facilement les plans détaillés de vos machines et
                  gérez leur maintenance de manière efficace et structurée.
                </h1>
              </div>
            </div>
            <div className="relative flex justify-around bg-red-400 w-full h-full">
              <div className="w-1/2 h-full">
                <img alt="..." src={IMG_1} className="object-cover h-full" />
              </div>
              <div className=" w-1/2">
                <h1 className="w-full h-full flex flex-col justify-center text-white font-bold opacity-100 text-center text-xl">
                  Importez facilement les plans détaillés de vos machines et
                  gérez leur maintenance de manière efficace et structurée.
                </h1>
              </div>
            </div>
            <div className="relative flex justify-around bg-green-400 w-full h-full">
              <div className="w-1/2 h-full">
                <img alt="..." src={IMG_1} className="object-cover h-full" />
              </div>
              <div className=" w-1/2">
                <h1 className="w-full h-full flex flex-col justify-center text-white font-bold opacity-100 text-center text-xl">
                  Importez facilement les plans détaillés de vos machines et
                  gérez leur maintenance de manière efficace et structurée.
                </h1>
              </div>
            </div>
          </Carousel>
        </section> */}

        <section className="w-full mb-[5rem]">
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
        </section>

        <section className="flex flex-col items-center justify-center mb-[5rem]">
          <div className="p-6 bg-gray-800 text-gray-100 rounded-xl">
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
        </section>

        <section
          className="md:w-lg h-full w-full flex justify-center mb-10 "
          id="decouvrir"
        >
          <div className="h-full bg-[#f3f3ff] bg-opacity-60 shadow-lg py-10 px-4 mx-auto w-5/6 lg:px-6 rounded-xl">
            <div className="mb-8 max-w-screen-xl lg:mb-16">
              <h2 className="text-center mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">
                Avantages clés
              </h2>
              <p className="text-gray-500 text-center sm:text-xl dark:text-gray-400">
                Boostez l'efficacité de votre maintenance:
              </p>
            </div>
            <motion.div
              className="grid grid-cols-4 gap-8 h-full "
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-full">
                <div className="rounded-xl flex justify-center items-center mb-4 w-10 h-10  bg-primary-100 dark:bg-primary-900">
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
                <p className="text-gray-500 text-sm">
                  Notre solution simplifie et accélère le processus de
                  maintenance, réduisant ainsi les temps d'arrêt de production.
                </p>
              </div>
              <div className="h-full">
                <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
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
                <p className="text-gray-500 text-sm">
                  Une maintenance préventive basée sur des données précises aide
                  à prévenir les pannes coûteuses et prolonge la durée de vie de
                  vos machines.
                </p>
              </div>
              <div className="">
                <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
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
                <p className="text-gray-500 text-sm">
                  Tous les rapports de maintenance sont automatiquement
                  enregistrés dans notre système, vous permettant de suivre
                  l'historique de chaque machine et de planifier les
                  interventions futures.
                </p>
              </div>
              <div className="h-full">
                <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
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
                <p className="text-gray-500 text-sm ">
                  une installation simple des codes QR et une interface
                  conviviale, facilitant ainsi leur utilisation.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="flex flex-col items-center justify-center">
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
          >
            Questions fréquemment posées
          </Typography>
          <div className="flex justify-center">
            <Tabs
              aria-label="Vertical tabs"
              orientation="vertical"
              sx={{
                width: "75%",
                height: "100%",
                borderRadius: 0,
                backgroundColor: "#fff",
              }}
            >
              <TabList
                sx={{
                  backgroundColor: "#eee",
                  padding: "0.5rem",
                  color: "#000",
                  padding: 0, // Remove padding
                  margin: 0,
                  borderRadius: 0,
                }}
              >
                <Tab
                  sx={{
                    color: "#000",
                    width: 300,
                    borderRadius: 0,
                    boxShadow: "none",
                  }}
                >
                  Qestion 1 :
                </Tab>
                <Tab
                  sx={{
                    color: "#000",
                    width: 300,
                    borderRadius: 0,
                    boxShadow: "none",
                  }}
                >
                  Qestion 2 :
                </Tab>
                <Tab
                  sx={{
                    color: "#000",
                    width: 300,
                    borderRadius: 0,
                    boxShadow: "none",
                  }}
                >
                  Qestion 3
                </Tab>
                <Tab
                  sx={{
                    color: "#000",
                    width: 300,
                    borderRadius: 0,
                    boxShadow: "none",
                  }}
                >
                  Qestion 3:
                </Tab>
              </TabList>
              <TabPanel
                value={0}
                sx={{
                  p: 2,
                  minHeight: "100%",
                  backgroundColor: "#fff",
                  color: "#000",
                }}
              >
                <b>First tab : </b> <br />
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Ducimus quisquam soluta quo ullam eligendi cumque nemo repellat
                nisi sit pariatur. Corporis nostrum reiciendis magni mollitia
                sed ea eveniet, voluptatibus unde!
              </TabPanel>
              <TabPanel
                value={1}
                sx={{
                  p: 2,
                  minHeight: "100%",
                  backgroundColor: "#fff",
                  color: "#000",
                }}
              >
                <b>Second tab : </b> <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                dolore cumque fugit. Nulla non, provident et tempore sequi
                recusandae, iusto dignissimos, enim quas delectus fuga? Quia
                cumque laudantium ad dolor?
              </TabPanel>
              <TabPanel
                value={2}
                sx={{
                  p: 2,
                  minHeight: "100%",
                  backgroundColor: "#fff",
                  color: "#000",
                }}
              >
                <b>Third tab : </b>
                <br />
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Maiores, voluptatum odit, ullam natus consequuntur possimus est
                placeat delectus repellat deserunt hic vel error, assumenda
                laudantium illum. Reiciendis cumque repellendus cupiditate?
              </TabPanel>
              <TabPanel
                value={3}
                sx={{
                  p: 2,
                  minHeight: "100%",
                  backgroundColor: "#fff",
                  color: "#000",
                }}
              >
                <b>Third tab : </b>
                <br />
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Maiores, voluptatum odit, ullam natus consequuntur possimus est
                placeat delectus repellat deserunt hic vel error, assumenda
                laudantium illum. Reiciendis cumque repellendus cupiditate?
              </TabPanel>
            </Tabs>
          </div>
        </section>

        <section className="dark:bg-gray-900">
          <div className="py-8">
            <div className="text-center">
              <h2 className="mb-4 text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">
                Boostez l'efficacité de votre maintenance dès à présent !
              </h2>
              <p className="mb-6 text-gray-500 dark:text-gray-400 md:text-lg">
                Prêt à transformer votre gestion de maintenance ?
              </p>
              <a
                href="#"
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 inline-block transition-colors duration-300 ease-in-out dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                S'inscrire
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MidiumView;
