import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const CustomLoader = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <InfinitySpin width="200" color="#00df9a" />
      <p className="text-[#00df9a] text-lg">Loading...</p>
    </div>
  );
};

export default CustomLoader;
