import React, { useEffect, useState } from "react";
import { GoLocation } from "react-icons/go";
import { Link, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "../../axiosClient";

const Investors = () => {
  const { investors } = useOutletContext();

  useEffect(() => {}, []);
  return (
    <div className="bg-[rgba(0,223,154,0.05)]">
      <div className=" py-10 max-w-[1200px] mx-auto">
        <h2 className="text-3xl font-semibold mb-3 text-center">
          Get In-touch With Our Investors
        </h2>
        <p className="text-center mb-5">
          Meet individuals and businesses willing to invest in your ideas and
          innovations
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mx-5 lg:mx-20 my-10 text-center">
          {investors.length > 0 ? (
            <>
              {investors.map((investor) => {
                return (
                  <div className="flex flex-col border rounded-lg bg-white p-5">
                    <div className="mx-auto">
                      <img
                        src=""
                        alt=""
                        className="h-24 w-24 rounded-full p-1 border-2 border-[rgb(0,223,154)]"
                      />
                    </div>
                    <div className="mt-5">
                      <h2 className="font-semibold mb-2">{investor.name}</h2>

                      {investor.details ? (
                        <>
                          <div className="bg-[rgba(0,223,154,0.07)] font-semibold rounded-full my-2 p-2">
                            US${investor.details.minimum} - US$
                            {investor.details.maximum}
                          </div>
                          <p className="text-gray-700">
                            {investor.details.description
                              .split(" ")
                              .splice(0, 20)
                              .join(" ")}
                            ...
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="bg-[rgba(0,223,154,0.07)] font-semibold rounded-full my-2 p-2">
                            No Data
                          </div>
                          <p className="text-gray-700">No description</p>
                        </>
                      )}
                      <div className="mt-5">
                        <Link
                          to={`/investors/${investor._id}`}
                          className="bg-[rgba(0,223,154,0.75)] hover:bg-[rgba(0,223,154,1)] py-2 px-3 text-white text-sm rounded"
                        >
                          Get in touch
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="text-red-500">No investors found</div>
          )}
        </div>
        <div className="text-center">
          <Link to="/investors" className="text-blue-400 p-10 hover:underline">
            View more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Investors;
