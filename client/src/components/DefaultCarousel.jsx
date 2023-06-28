import { Carousel } from "flowbite-react";
import React from "react";
import IMG_1 from "../assets/carrousel1.jpg";
import IMG_2 from "../assets/carousel2.jpg";
import IMG_3 from "../assets/carousel3.jpg";
import IMG_4 from "../assets/carrousel4.jpg";

const DefaultCarousel = () => {
  return (
    <Carousel>
      <div className="relative">
        <img alt="..." src={IMG_1} className="object-cover w-full" />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between">
          <div className="absolute bg-white w-[45%] h-[31rem] rounded-e-[40rem] z-10">
            <h1 className="text-black text-4xl font-bold">
              <p className="p-4 mt-[120px] text-start">
                Importez facilement les plans détaillès de vos machines et gérez
                leur maintenance de manière efficace et structurée
              </p>
            </h1>
          </div>
          <div className="relative w-full h-full bg-white bg-transparent opacity-40"></div>
        </div>
      </div>
      <div className="relative">
        <img alt="..." src={IMG_1} className="object-cover w-full" />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between">
          <div className="absolute bg-white w-[45%] h-[31rem] rounded-e-[40rem] z-10">
            <h1 className="text-black text-4xl font-bold">
              <p className="p-4 mt-[120px] text-start">
                Importez facilement les plans détaillès de vos machines et gérez
                leur maintenance de manière efficace et structurée
              </p>
            </h1>
          </div>
          <div className="relative w-full h-full bg-white bg-transparent opacity-40"></div>
        </div>
      </div>
      <div className="relative">
        <img alt="..." src={IMG_1} className="object-cover w-full" />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between">
          <div className="absolute bg-white w-[45%] h-[31rem] rounded-e-[40rem] z-10">
            <h1 className="text-black text-4xl font-bold">
              <p className="p-4 mt-[120px] text-start">
                Importez facilement les plans détaillès de vos machines et gérez
                leur maintenance de manière efficace et structurée
              </p>
            </h1>
          </div>
          <div className="relative w-full h-full bg-white bg-transparent opacity-40"></div>
        </div>
      </div>
    </Carousel>
  );
};

export default DefaultCarousel;
