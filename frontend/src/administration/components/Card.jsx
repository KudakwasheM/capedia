import React from "react";
import { AiOutlinePercentage } from "react-icons/ai";

const Card = ({ title, value }) => {
  return (
    <div className="flex shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] p-3">
      <div className="flex-1">
        <h2 className="font-bold">{value}</h2>
        <p className="text-sm">{title}</p>
      </div>
      <div className="p-3 bg-[rgb(0,223,154)] text-white">
        <AiOutlinePercentage size={20} />
      </div>
    </div>
  );
};

export default Card;
