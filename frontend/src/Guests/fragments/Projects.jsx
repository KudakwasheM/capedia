import React, { useEffect, useState } from "react";
import NoImage from "../../assets/noimage.jpg";
import { Link, useOutletContext } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import axiosClient from "../../axiosClient";
import { toast } from "react-toastify";
import CustomLoader from "../components/CustomLoader";

const Projects = () => {
  const { projects } = useOutletContext();

  useEffect(() => {}, []);
  return (
    <div className="max-w-[1200px] mx-auto py-10">
      <h2 className="text-3xl font-semibold mb-3 text-center">
        Discover Opportunities To Invest In
      </h2>
      <p className="text-center mb-5">
        Browse our latest exciting startup pitches and connect with
        entrepreneurs to discuss further.
      </p>
      {/* {loading ? (
        <CustomLoader />
      ) : ( */}
      <>
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mx-5 lg:mx-20 my-10">
            {projects.map((project) => {
              return (
                <div
                  className="flex flex-col border rounded-lg bg-white hover:shadow-xl"
                  key={project._id}
                >
                  <div className="h-32">No Image</div>
                  <div className="w-full bg-slate-500 h-[3px]">
                    <div
                      className="bg-[rgb(0,223,154)] h-full"
                      style={{
                        width:
                          (project.raised_fund / project.expected_fund) * 100 +
                          "%",
                      }}
                    ></div>
                  </div>
                  <div className="p-3">
                    <h2 className="font-semibold mb-2">{project.name}</h2>
                    <p className="mb-2 flex items-center text-sm">
                      <GoLocation size={18} className="text-blue-500" />
                      <span className="ml-1">{project.location}</span>
                    </p>
                    <p className="text-gray-700">
                      {project.details ? (
                        <>
                          {project.details.short_summary
                            .split(" ")
                            .splice(0, 50)
                            .join(" ")}
                          ...
                        </>
                      ) : (
                        <>No details</>
                      )}
                    </p>
                    <div className="flex mt-5 gap-10">
                      <div className="flex flex-col">
                        <p className="text-sm">Target</p>
                        <h3 className="font-semibold">
                          US$ {project.expected_fund}
                        </h3>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm">Investors' Percentage</p>
                        <h3 className="font-semibold">
                          {project.investor_percentage}%
                        </h3>
                      </div>
                    </div>
                    <div className="mt-5">
                      <Link
                        to={`/proposals/${project._id}`}
                        className="bg-[rgba(0,223,154,0.75)] hover:bg-[rgba(0,223,154,1)] py-2 px-3 text-white text-sm rounded"
                      >
                        Find Out More
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xl text-red-500 font-bold text-center py-5">
            No projects found
          </p>
        )}
      </>
      {/* )} */}

      {/* </> */}
      {/* </div> */}
      <div className="text-center py-10">
        <p className="mb-5">
          Browser enterpreneur ideas, startups from all over Zimbabwe
        </p>
        <Link to="/proposals" className="text-blue-400 hover:underline">
          View more
        </Link>
      </div>
    </div>
  );
};

export default Projects;
