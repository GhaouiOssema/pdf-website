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
import { Accordion } from "flowbite-react";

const Home = () => {
  return (
    <div className="h-full w-full">
      <motion.section
        className="flex flex-col items-center justify-center md:mt-10 md:h-[90.5vh] md:w-full mt-20"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col items-center justify-center mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:flex-row">
          <div className="md:absolute place-self-center py-8 px-10 max-w-screen-xl rounded-xl">
            <div
              className="w-[250px] h-[150px] ml-[10px] absolute"
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
              className="md:h-[23vh] w-75 gradient-text text-2xl text-black text-center font-extrabold md:text-5xl xl:text-6xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="md:pb-1">Une maintenance simplifiée</h3>
              {/* <img
                alt="scribble"
                src={IMG}
                className="mx-auto absolute md:ml-[16rem] md:h-[2rem] md:-mt-10 md:w-[200px]"
              /> */}
              <span className="block mt-2">dès aujourd'hui.</span>
            </motion.h1>
            <br />
            <motion.div
              className="md:h-[13vh] mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="flex flex-col text-start w-full">
                Maximisez l'efficacité de votre gestion et entretien
                d'équipements grâce à notre solution QR . Bénéficiez d'une
                maintenance simplifiée qui assure une performance optimale de
                vos <span className="lg-text-center">installations.</span>
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col md:flex-row lg:flex-row xl-flex-row items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.button
                href="#decouvrir"
                className="w-full inline-flex justify-center items-center py-3 mb-3 text-base font-medium text-center text-white rounded-lg custome__border__blue bg-[#F0854A] hover:bg-[#F0854A]"
              >
                Découvrir plus
              </motion.button>
              <motion.button
                className="w-full inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-[#125ba3] hover:text-white rounded-lg custome__border border-[#125ba3] hover:bg-[#125ba3]"
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
      <motion.section className="  md:h-[300px] mb-[2rem]">
        <DefaultCarousel />
      </motion.section>

      <section className="p-6 bg-gray-100 text-black-100 mb-[5rem]">
        <Accordion collapseAll>
          <Accordion.Panel>
            <Accordion.Title style={{ color: "#000" }}>
              wLorem ipsum dolor sit amet consectetur adipisicing elit.
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-black">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Similique, recusandae molestiae deleniti ut voluptatibus,
                corrupti porro culpa modi nulla distinctio perspiciatis
                blanditiis praesentium repellat eveniet in tenetur, dicta sunt
                minus.
              </p>
              <p className="text-black">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Similique, recusandae molestiae deleniti ut voluptatibus,
                  corrupti porro culpa modi nulla distinctio perspiciatis
                  blanditiis praesentium repellat eveniet in tenetur, dicta sunt
                  minus.
                </p>
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title
              style={{ color: "#000", ":hover": { color: "#000" } }}
            >
              orem ipsum dolor sit amet consectetur adipisicing elit.{" "}
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-black">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Accusantium repellat sed error voluptas voluptates, maxime
                  reiciendis eius, itaque sint voluptatibus, accusamus earum
                  praesentium ipsam. Quidem obcaecati voluptate ipsa aspernatur
                  nisi.
                </p>
              </p>
              <p className="text-black">
                <p>Check out the</p>
                <a className="text-black">
                  <p>Figma design system</p>
                </a>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title
              style={{ color: "#000", ":hover": { color: "#000" } }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-black">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Temporibus maiores sint accusantium nulla a nihil recusandae
                  aliquid, dolor consectetur nostrum ab corrupti esse, dolorem
                  veniam qui? Laboriosam esse voluptates repudiandae!
                </p>
              </p>
              <p className="mb-2 text-black">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                  totam reiciendis est omnis eveniet amet, repudiandae error
                  molestias commodi magnam enim minima tenetur eligendi!
                  Assumenda expedita neque sequi voluptates vero.
                </p>
              </p>
              <p className="mb-2 text-black">
                Learn more about these technologies:
              </p>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      </section>

      <section className=" bg-gray-800 text-gray-100 w-full h-[20%] mb-[5rem]">
        <div className="container mx-auto">
          <span className="block mb-2 text-xs font-medium tracki text-center uppercase text-violet-400">
            How it works
          </span>
          <h2 className="text-lg font-bold text-center text-gray-50">
            Building with Mamba is simple
          </h2>
          <div className="grid gap-6 my-16 lg:grid-cols-3 pb-9">
            <div className="overflow-x-auto flex justify-between bg-gray-900">
              <div className="flex justify-between p-2 sm:p-8 space-x-6 rounded-md">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 text-lg sm:text-xl font-bold rounded-full bg-violet-400 text-gray-900">
                  1
                </div>
                <p className="text-sm">
                  <b>Nulla.</b> Nostrum, corrupti blanditiis. Illum, architecto?
                </p>
              </div>
            </div>
            <div className="overflow-x-auto flex justify-between bg-gray-900">
              <div className="flex justify-between p-2 sm:p-8 space-x-6 rounded-md">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 text-lg sm:text-xl font-bold rounded-full bg-violet-400 text-gray-900">
                  2
                </div>
                <p className="text-sm">
                  <b>Nulla.</b> Nostrum, corrupti blanditiis. Illum, architecto?
                </p>
              </div>
            </div>
            <div className="overflow-x-auto flex justify-between bg-gray-900">
              <div className="flex justify-between p-2 sm:p-8 space-x-6 rounded-md">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 text-lg sm:text-xl font-bold rounded-full bg-violet-400 text-gray-900">
                  3
                </div>
                <p className="text-sm">
                  <b>Nulla.</b> Nostrum, corrupti blanditiis. Illum, architecto?
                </p>
              </div>
            </div>
            <div className="overflow-x-auto flex justify-between bg-gray-900">
              <div className="flex justify-between p-2 sm:p-8 space-x-6 rounded-md">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 text-lg sm:text-xl font-bold rounded-full bg-violet-400 text-gray-900">
                  4
                </div>
                <p className="text-sm">
                  <b>Nulla.</b> Nostrum, corrupti blanditiis. Illum, architecto?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center md:mt-10 md:h-[80vh] md:w-full">
        <Tabs
          aria-label="Vertical tabs"
          orientation="horizental"
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
              padding: 0,
              margin: 0,
            }}
            className="md:w-64"
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
              backgroundColor: "#fff",
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
              backgroundColor: "#fff",
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
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores,
            voluptatum odit, ullam natus consequuntur possimus est placeat
            delectus repellat deserunt hic vel error, assumenda laudantium
            illum. Reiciendis cumque repellendus cupiditate?
          </TabPanel>
        </Tabs>
      </section>

      <section className="dark:bg-gray-900 boor ">
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
