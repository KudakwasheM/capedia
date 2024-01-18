import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";

const SuccessRegister = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col border md:w-[400px] p-5">
        <h1 className="text-center text-[rgb(0,223,154)] text-4xl font-bold mb-3">
          Capidea.
        </h1>
        <AiOutlineCheckCircle
          size={80}
          className="text-green-500 mx-auto my-5"
        />
        <div className="text-center">
          <p>Congratulations! You have successfully registered an account.</p>
          <p>Check your email to verify your email.</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessRegister;
