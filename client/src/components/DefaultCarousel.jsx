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
        <div className="absolute top-0 left-0 w-1/2 h-full flex items-center justify-center bg-white bg-transparent border-xl rounded-xl">
          <h1 className="text-black text-4xl font-bold p-4">Absolute Text 1</h1>
        </div>
      </div>
    </Carousel>
  );
};

export default DefaultCarousel;
