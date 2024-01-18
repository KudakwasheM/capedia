import React from "react";
import { BiError } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <BiError size={150} className="text-red-500" />
      <h2 className="text-2xl">Oops! Something went wrong.</h2>
      <button
        className="bg-[rgb(0,223,154)] py-2 px-5 text-white text-xl mt-3 rounded-full"
        onClick={() => navigate(-1)}
      >
        Reload Page
      </button>
    </div>
  );
};

export default Error;
