import React, { useEffect, useState } from "react";
import {
  AiOutlineDollar,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlinePercentage,
  AiOutlineProject,
  AiOutlineTeam,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import { GoLocation } from "react-icons/go";
import axiosClient from "../axiosClient";
import moment from "moment";
import { Link } from "react-router-dom";
import CustomLoader from "../Guests/components/CustomLoader";

const EnterpreneurDash = () => {
  const [projects, setProjects] = useState([]);
  const [investors, setInvestors] = useState([]);
  const [funds, setFunds] = useState([]);
  const [projectsCount, setProjectsCount] = useState(0);
  const [investorsCount, setInvestorsCount] = useState(0);
  const [fundsSum, setFundsSum] = useState(0);
  const [loading, setLoading] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  const getData = async () => {
    try {
      setLoading(true);

      const projectsResponse = await axiosClient.get(
        `/enterpreneur/${userInfo._id}/projects`
      );
      setProjects(projectsResponse?.data?.projects.splice(-3));
      setProjectsCount(projectsResponse?.data?.projects.length);

      const investorsResponse = await axiosClient.get(
        `/enterpreneur/${userInfo._id}/investors`
      );
      setInvestors(investorsResponse?.data?.investors.splice(-4));
      setInvestorsCount(investorsResponse?.data?.investors.length);

      const fundsResponse = await axiosClient.get(
        `/enterpreneur/${userInfo._id}/funds`
      );

      setFunds(fundsResponse?.data?.funds.splice(-4));
      const theFunds = fundsResponse?.data?.funds;
      setFundsSum(theFunds.reduce((total, fund) => total + fund.amount, 0));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {loading ? (
        <CustomLoader />
      ) : (
        <div className="p-5">
          <div className="flex gap-5 lg:gap-20 justify-around">
            <a
              href="/enterpreneur/projects"
              className="flex flex-1 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] p-3"
            >
              <div className="flex-1">
                <h2 className="font-bold">{projectsCount}</h2>
                <p className="text-sm">My Projects</p>
              </div>
              <div className="p-3 bg-[rgb(0,223,154)] text-white">
                <AiOutlineProject size={20} />
              </div>
            </a>
            <a
              href="/enterpreneur/investors"
              className="flex flex-1 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] p-3"
            >
              <div className="flex-1">
                <h2 className="font-bold">{investorsCount}</h2>
                <p className="text-sm">My Investors</p>
              </div>
              <div className="p-3 bg-[rgb(0,223,154)] text-white">
                <AiOutlinePercentage size={20} />
              </div>
            </a>
            <a
              href="/enterpreneur/funds"
              className="flex flex-1 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] p-3"
            >
              <div className="flex-1">
                <h2 className="font-bold">{fundsSum}</h2>
                <p className="text-sm">Funds Raised</p>
              </div>
              <div className="p-3 bg-[rgb(0,223,154)] text-white">
                <AiOutlineDollar size={20} />
              </div>
            </a>
          </div>
          <div className="my-5 p-5 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
            <h2 className="text-xl text-[rgb(0,223,154)] font-semibold">
              Project Funds
            </h2>
            <table className="w-full p-5">
              <thead className="px-5">
                <th className="text-start py-2 ">Amount</th>
                <th className="text-start py-2 ">Project</th>
                <th className="text-start py-2 ">Percentage</th>
                <th className="text-start py-2 ">Investor</th>
                <th className="text-start py-2 ">Created On</th>
              </thead>
              <tbody>
                {funds.length > 0 ? (
                  <>
                    {funds.map((fund) => {
                      return (
                        <tr className="border-t">
                          <td className="py-3">{fund.amount}</td>
                          <td className="py-3">{fund.project.name}</td>
                          <td className="py-3">
                            {fund.project_percentage.toFixed(2)}%
                          </td>
                          <td className="py-3">{fund.investor.name}</td>
                          <td className="py-3">
                            {moment(fund.createdAt).format("LL")}
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <tr cols={5} className="text-center text-red-500">
                    No Funds Found
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="my-5 p-5 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
            <h2 className="text-xl text-[rgb(0,223,154)] font-semibold">
              My Projects
            </h2>
            <div className="grid grid-cols-3 mt-3">
              {projects.length > 0 ? (
                <>
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
                          <div className="flex justify-around  border-t pt-3 mt-3">
                            <Link
                              to={`/enterpreneur/myprojects/${project._id}`}
                            >
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
                </>
              ) : (
                <div className="text-center w-full text-red-500">
                  No projects yet
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EnterpreneurDash;
