import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero w-full">
      <div className="h-full bg-[rgba(0,0,0,0.7)]">
        <div className="flex flex-col items-center justify-around h-full md:w-[800px] mx-auto text-white text-center sm:py-14 px-5">
          <h2 className="xl:text-4xl md:text-3xl sm:text-2xl text-xl">
            Connecting Great Minds and Awesome Investors
          </h2>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl text-[rgb(0,223,154)] font-bold">
            Capidea.
          </h1>
          <p className="text-base sm:text-xl md:text-2xl">
            Where great businesses and great people meet. We bring together
            businesses looking for investment and investors with the capital,
            contacts and knowledge to help them succeed.
          </p>
          <Link
            to="/login"
            className="bg-[rgb(0,223,154)] px-5 py-2 text-black hover:scale-105 hover:bg-black hover:text-[rgb(0,223,154)]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
