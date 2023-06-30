import { Carousel } from "flowbite-react";
import React from "react";
import IMG_1 from "../assets/img_1.png";
import IMG_2 from "../assets/carousel2.jpg";
import IMG_3 from "../assets/carousel3.jpg";
import IMG_4 from "../assets/carrousel4.jpg";

const DefaultCarousel = () => {
  return (
    <Carousel>
      <div className="relative flex bg-blue-400">
        <div className="w-1/2">
          <img alt="..." src={IMG_1} className="object-top w-full" />
        </div>
        <div className="w-1/2  flex flex-col justify-center">
          <h1 className="text-black font-bold p-4 opacity-100 text-center">
            Importez facilement les plans détaillés de vos machines et gérez
            leur maintenance de manière efficace et structurée.
          </h1>
        </div>
      </div>
      <div className="relative flex bg-red-400">
        <div className="w-1/2">
          <img alt="..." src={IMG_1} className="object-top w-full" />
        </div>
        <div className="w-1/2  flex flex-col justify-center">
          <h1 className="text-black font-bold p-4 opacity-100 text-center">
            Importez facilement les plans détaillés de vos machines et gérez
            leur maintenance de manière efficace et structurée.
          </h1>
        </div>
      </div>
      <div className="relative flex bg-green-400">
        <div className="w-1/2">
          <img alt="..." src={IMG_1} className="object-top w-full" />
        </div>
        <div className="w-1/2  flex flex-col justify-center">
          <h1 className="text-black font-bold p-4 opacity-100 text-center">
            Importez facilement les plans détaillés de vos machines et gérez
            leur maintenance de manière efficace et structurée.
          </h1>
        </div>
      </div>
    </Carousel>
  );
};

export default DefaultCarousel;
