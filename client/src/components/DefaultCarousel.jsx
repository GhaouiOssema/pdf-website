import { Carousel } from "flowbite-react";
import React from "react";
import IMG_1 from "../assets/img_1.png";
import IMG_2 from "../assets/carousel2.jpg";
import IMG_3 from "../assets/carousel3.jpg";
import IMG_4 from "../assets/carrousel4.jpg";

const DefaultCarousel = () => {
  return (
    <Carousel>
      <div className="relative flex flex-col bg-blue-400 w-full h-full pb-10">
        <div className="w-full">
          <img alt="..." src={IMG_1} className="object-fit h-full" />
        </div>
        <div className="w-full">
          <h1 className="text-white font-bold opacity-100 text-center text-sm mt-2">
            Importez facilement les plans détaillés de vos machines et gérez
            leur maintenance de manière efficace et structurée.
          </h1>
        </div>
      </div>
      <div className="relative flex flex-col bg-red-400 w-full h-full pb-10">
        <div className="w-full">
          <img alt="..." src={IMG_1} className="object-fit h-full" />
        </div>
        <div className="w-full">
          <h1 className="text-white font-bold opacity-100 text-center text-sm mt-2">
            Importez facilement les plans détaillés de vos machines et gérez
            leur maintenance de manière efficace et structurée.
          </h1>
        </div>
      </div>
      <div className="relative flex flex-col bg-green-400 w-full h-full pb-10">
        <div className="w-full">
          <img alt="..." src={IMG_1} className="object-fit h-full" />
        </div>
        <div className="w-full">
          <h1 className="text-white font-bold opacity-100 text-center text-sm mt-2">
            Importez facilement les plans détaillés de vos machines et gérez
            leur maintenance de manière efficace et structurée.
          </h1>
        </div>
      </div>
    </Carousel>
  );
};

export default DefaultCarousel;
