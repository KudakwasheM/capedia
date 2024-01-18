import React, { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlinePlusSquare,
  AiOutlineUserAdd,
} from "react-icons/ai";
import CustomLoader from "../../Guests/components/CustomLoader";
import { GoLocation } from "react-icons/go";

const EnterpreneurProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  const getProjects = async () => {
    setLoading(true);
    await axiosClient
      .get(`/enterpreneur/${userInfo._id}/projects`)
      .then((res) => {
        setLoading(false);

        setProjects(res?.data?.projects);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    getProjects();
  }, []);
  return (
    <>
      {loading ? (
        <CustomLoader />
      ) : (
        <div className="bg-white p-3 w-full">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-3xl font-semibold">My Projects</h2>
            <Link
              to="/enterpreneur/myprojects/create"
              className="flex items-center bg-green-400 font-semibold py-2 px-3 text-white"
            >
              Add Project
              <AiOutlinePlusSquare
                size={20}
                className="ml-2"
                style={{ stroke: "white", strokeWidth: "50" }}
              />
            </Link>
          </div>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 py-3 my-5 p-5 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
              {projects.map((project) => {
                return (
                  <div
                    className="flex flex-col border rounded-lg bg-white hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
                    key={project._id}
                  >
                    <div className="h-32">No Image</div>
                    <div className="w-full bg-slate-500 h-[3px]">
                      <div
                        className="bg-[rgb(0,223,154)] h-full"
                        style={{
                          width:
                            (project.raised_fund / project.expected_fund) *
                              100 +
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
                              .splice(0, 60)
                              .join(" ")}
                            ...
                          </>
                        ) : (
                          <div className="text-center text-red-500">
                            No details
                          </div>
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
                      <div className="flex justify-around  border-t pt-3 mt-3">
                        <Link to={`/enterpreneur/myprojects/${project._id}`}>
                          <AiOutlineEye
                            size={22}
                            title="View"
                            className="text-green-500"
                          />
                        </Link>
                        <Link
                          to={`/enterpreneur/myprojects/edit/${project._id}`}
                        >
                          <AiOutlineEdit
                            size={22}
                            title="Edit"
                            className="text-sky-500"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xl font-bold text-center text-red-500 py-5">
              No projects found
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default EnterpreneurProjects;
