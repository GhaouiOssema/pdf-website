import React, { useContext, useEffect, useRef, useState } from "react";
import "./home.css";
import IMG from "../../assets/ligne.png";
import IMG_1 from "../../assets/img_1.jpg";
import IMG_2 from "../../assets/img_4.jpg";
import { motion, useAnimation } from "framer-motion";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { infoSteps } from "../../utils";

const Home = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <div>
      <motion.section
        className="flex flex-col items-center justify-center md:mt-10 md:h-[80vh] md:w-full"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col items-center justify-center px-9 mx-auto max-w-screen-xl w-full lg:gap-8 xl:gap-0 lg:py-16 lg:flex-row">
          <div className="md:absolute place-self-center py-8 px-10 max-w-screen-xl rounded-xl">
            <div
              className="w-[450px] h-[350px] ml-[450px] md:absolute md:mt-[-250px]"
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
              className="md:h-[23vh] gradient-text text-4xl text-black text-center font-extrabold md:text-5xl xl:text-6xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="md:pb-[5px]">
                Une maintenance simplifiée{" "}
                <img
                  alt="scribble"
                  src={IMG}
                  className="mx-auto md:absolute md:ml-[30rem] md:h-[3rem] md:mt-[-23px] md:w-[300px]"
                />
              </h3>
              <span>dès aujourd'hui.</span>
            </motion.h1>
            <br />
            <motion.div
              className="md:h-[13vh] mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="flex flex-col text-justify md:w-[50rem]">
                Maximisez l'efficacité de votre gestion et entretien
                d'équipements grâce à notre solution QR . Bénéficiez d'une
                maintenance simplifiée qui assure une performance optimale de
                vos <span className="text-center">installations.</span>
              </p>
            </motion.div>
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <a
                href="#decouvrir"
                className="inline-flex justify-center items-center py-3 px-5 mr-3 text-base font-medium text-center text-white rounded-lg custome__border__blue bg-[#F0854A] hover:bg-[#F0854A]"
              >
                Découvrir plus
                <svg
                  className="ml-2 -mr-1 w-5 h-5"
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
          <div className="hidden lg:flex lg:col-span-5"></div>
        </div>
      </motion.section>

      <motion.section
        className="mb-[10rem] md:w-full md:h-full relative "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="gap-16 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2">
          <motion.div
            className="bg-white md:h-full md:w-full font-light text-gray-500 md:pt-20 rounded-l-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="mb-4 text-3xl text-justify font-extrabold text-gray-900 dark:text-white">
              Importez facilement les plans détaillés de vos machines et gérez
              leur maintenance de manière efficace et structurée.
            </h2>
          </motion.div>
          <motion.div
            className=" w-full h-full grid grid-cols-1 gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.img
              className="md:w-full md:h-full rounded-lg"
              src={IMG_2}
              alt="office content 1"
            />
          </motion.div>
        </div>
      </motion.section>

      <section
        className=" md:w-lg md:h-[77vh] mb-[5rem] ml-[8rem]"
        id="decouvrir"
      >
        <div
          className="circle relative"
          style={{
            background: "linear-gradient(to bottom, #125BA3 40%, #3291F0 50%)",
            opacity: 0.5,
            filter: "blur(120px)",
            display: "flex",
            justifyContent: "flex-end",
          }}
        />
        <div className=" md:absolute bg-[#f3f3ff] bg-opacity-60 rounded-3xl shadow-lg md:mt-[-430px] py-8 px-4 md:h-[83vh] mx-auto md:max-w-screen-lg sm:py-16 lg:px-6">
          <div className="mb-8 max-w-screen-xl lg:mb-16 md:mt-[-20px]">
            <h2 className="text-center mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">
              Avantages clés
            </h2>
            <p className="text-gray-500 text-center sm:text-xl dark:text-gray-400">
              Boostez l'efficacité de votre maintenance:
            </p>
          </div>
          <motion.div
            className="grid grid-cols-4 gap-8"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
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
                maintenance, réduisant ainsi les temps d'arrêt de production.{" "}
              </p>
            </div>
            <div>
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
                Une maintenance préventive basée sur des données précises aide à
                prévenir les pannes coûteuses et prolonge la durée de vie de vos
                machines.
              </p>
            </div>
            <div>
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
                l'historique de chaque machine et de planifier les interventions
                futures.
              </p>
            </div>
            <div>
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
              <p className="text-gray-500 text-sm">
                une installation simple des codes QR et une interface
                conviviale, facilitant ainsi leur utilisation.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center md:mt-10 md:h-[80vh] md:w-full">
        <Tabs
          aria-label="Vertical tabs"
          orientation="vertical"
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: 0,
            backgroundColor: "#eee",
          }}
        >
          <TabList
            sx={{
              backgroundColor: "#eee",
              padding: "0.5rem",
              color: "#000",
              borderRadius: 0,
            }}
          >
            <Tab sx={{ color: "#000", width: 300 }}>First tab</Tab>
            <Tab sx={{ color: "#000", width: 300 }}>Second tab</Tab>
            <Tab sx={{ color: "#000", width: 300 }}>Third tab</Tab>
          </TabList>
          <TabPanel
            sx={{
              p: 2,
              minHeight: "100%",
              backgroundColor: "#eee",
              color: "#000",
            }}
          >
            <b>First tab : </b> <br />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
            quisquam soluta quo ullam eligendi cumque nemo repellat nisi sit
            pariatur. Corporis nostrum reiciendis magni mollitia sed ea eveniet,
            voluptatibus unde!
          </TabPanel>
          <TabPanel
            value={1}
            sx={{
              p: 2,
              minHeight: "100%",
              backgroundColor: "#eee",
              color: "#000",
            }}
          >
            <b>Second tab : </b> <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod dolore
            cumque fugit. Nulla non, provident et tempore sequi recusandae,
            iusto dignissimos, enim quas delectus fuga? Quia cumque laudantium
            ad dolor?
          </TabPanel>
          <TabPanel
            value={2}
            sx={{
              p: 2,
              minHeight: "100%",
              backgroundColor: "#eee",
              color: "#000",
            }}
          >
            <b>Third tab : </b>
            <br />
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores,
            voluptatum odit, ullam natus consequuntur possimus est placeat
            delectus repellat deserunt hic vel error, assumenda laudantium
            illum. Reiciendis cumque repellendus cupiditate?
          </TabPanel>
        </Tabs>
      </section>

      <section className="bg-gray-50  dark:bg-gray-800">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
              Powering innovation at{" "}
              <span className="font-extrabold">200,000+</span> companies
              worldwide
            </h2>
            <p className="mb-4 font-light">
              Track work across the enterprise through an open, collaborative
              platform. Link issues across Jira and ingest data from other
              software development tools, so your IT support and operations
              teams have richer contextual information to rapidly respond to
              requests, incidents, and changes.
            </p>
            <p className="mb-4 font-medium">
              Deliver great service experiences fast - without the complexity of
              traditional ITSM solutions.Accelerate critical development work,
              eliminate toil, and deploy changes with ease.
            </p>
            <a
              href="#"
              className="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700"
            >
              Learn more
              <svg
                className="ml-1 w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </section>
      <section className="dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h2 className="mb-4 text-4xl font-extrabold leading-tight text-gray-900 dark:text-white">
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
    </div>
  );
};

export default Home;
