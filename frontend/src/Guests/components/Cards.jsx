import React from "react";
// import Single from "../assets/single.png";
// import Double from "../assets/double.png";
// import Triple from "../assets/triple.png";

const Cards = () => {
  return (
    <div className="bg-white w-full py-[10rem] px-4 text-black">
      <div className="max-w-[1100px] mx-auto grid md:grid-cols-3 gap-8">
        <div className="w-full shadow-xl flex flex-col p-4 my-4 roundedz-lg hover:scale-105">
          <img
            className="w-20 mx-auto mt-[-3rem] bg-white"
            // src={Single}
            alt=""
          />
          <h2 className="text-2xl font-bold text-center py-8">Single User</h2>
          <p className="text-center text-4xl font-bold">$149</p>
          <div className="text-center font-medium">
            <p className="py-2 border-b mx-auto mt-8">500 GB Storage</p>
            <p className="py-2 border-b mx-auto">1 Granted User</p>
            <p className="py-2 border-b mx-auto">Send up to 2 GB</p>
          </div>
          <button className="bg-[rgb(0,223,154)] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black">
            Start Trial
          </button>
        </div>
        <div className="w-full shadow-xl flex flex-col p-4 rounded-lg hover:scale-105 md:my-0 my-8 bg-gray-100">
          <img
            className="w-20 mx-auto mt-[-3rem] bg-transparent"
            // src={Double}
            alt=""
          />
          <h2 className="text-2xl font-bold text-center py-8">Single User</h2>
          <p className="text-center text-4xl font-bold">$149</p>
          <div className="text-center font-medium">
            <p className="py-2 border-b mx-auto mt-8">500 GB Storage</p>
            <p className="py-2 border-b mx-auto">1 Granted User</p>
            <p className="py-2 border-b mx-auto">Send up to 2 GB</p>
          </div>
          <button className="bg-black w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-[rgb(0,223,154)]">
            Start Trial
          </button>
        </div>
        <div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105">
          <img
            className="w-20 mx-auto mt-[-3rem] bg-white"
            // src={Triple}
            alt=""
          />
          <h2 className="text-2xl font-bold text-center py-8">Single User</h2>
          <p className="text-center text-4xl font-bold">$149</p>
          <div className="text-center font-medium">
            <p className="py-2 border-b mx-auto mt-8">500 GB Storage</p>
            <p className="py-2 border-b mx-auto">1 Granted User</p>
            <p className="py-2 border-b mx-auto">Send up to 2 GB</p>
          </div>
          <button className="bg-[rgb(0,223,154)] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black">
            Start Trial
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
