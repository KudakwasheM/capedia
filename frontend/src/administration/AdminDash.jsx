import React, { useEffect, useState } from "react";
import {
  AiOutlineDollar,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineGroup,
  AiOutlinePercentage,
  AiOutlineProject,
  AiOutlineTeam,
} from "react-icons/ai";
import Card from "./components/Card";
import axiosClient from "../axiosClient";
import { Link } from "react-router-dom";
import moment from "moment";
import CustomLoader from "../Guests/components/CustomLoader";

const AdminDash = () => {
  const [projects, setProjects] = useState(0);
  const [users, setUsers] = useState([]);
  const [usersNo, setUsersNo] = useState(0);
  const [funds, setFunds] = useState([]);
  const [fundsAmount, setFundsAmount] = useState(0);
  const [investors, setInvestors] = useState(0);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);

    await axiosClient.get("/projects").then((res) => {
      let projectsCount = res.data.projects.length;
      setProjects(projectsCount);
    });

    await axiosClient.get("/users").then((res) => {
      let usersCount = res.data.users.length;
      setUsers(res.data.users.splice(-4));
      setUsersNo(usersCount);
    });

    await axiosClient.get("/funds").then((res) => {
      let fundsAmounts = 0;
      for (let i = 0; i < res.data.funds.length; i++) {
        fundsAmounts += res.data.funds[i].amount;
      }
      setFundsAmount(fundsAmounts);
      setFunds(res.data.funds.splice(-4));
    });

    await axiosClient.get("/users/investors").then((res) => {
      let usersCount = res.data.users.length;
      setInvestors(usersCount);
    });

    setLoading(false);
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
          <div className="grid grid-cols-4 gap-4">
            <a
              href="/admin/projects"
              className="flex shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] p-3"
            >
              <div className="flex-1">
                <h2 className="font-bold">{projects}</h2>
                <p className="text-sm">Projects</p>
              </div>
              <div className="p-3 bg-[rgb(0,223,154)] text-white">
                <AiOutlineProject size={20} />
              </div>
            </a>
            <a
              href="/admin/investors"
              className="flex shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] p-3"
            >
              <div className="flex-1">
                <h2 className="font-bold">{investors}</h2>
                <p className="text-sm">Investors</p>
              </div>
              <div className="p-3 bg-[rgb(0,223,154)] text-white">
                <AiOutlinePercentage size={20} />
              </div>
            </a>
            <a
              href="/admin/funds"
              className="flex shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] p-3"
            >
              <div className="flex-1">
                <h2 className="font-bold">{fundsAmount}</h2>
                <p className="text-sm">Funds Raised</p>
              </div>
              <div className="p-3 bg-[rgb(0,223,154)] text-white">
                <AiOutlineDollar size={20} />
              </div>
            </a>
            <a
              href="/admin/users"
              className="flex shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] p-3"
            >
              <div className="flex-1">
                <h2 className="font-bold">{usersNo}</h2>
                <p className="text-sm">Users</p>
              </div>
              <div className="p-3 bg-[rgb(0,223,154)] text-white">
                <AiOutlineTeam size={20} />
              </div>
            </a>
          </div>
          <div className="my-5 p-5 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
            <h2 className="text-xl text-[rgb(0,223,154)] font-semibold">
              Funds Offered
            </h2>
            <table className="w-full p-5">
              <thead className="px-5">
                <th className="text-start py-2 ">Amount</th>
                <th className="text-start py-2 ">Project</th>
                <th className="text-start py-2 ">Percentage</th>
                <th className="text-start py-2 ">Investor</th>
                <th className="text-start py-2 ">Created On</th>
                <th className="text-start py-2 ">Actions</th>
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
                          <td className="py-3 flex justify-between items-center">
                            <Link to={`/admin/funds/${fund._id}`}>
                              <AiOutlineEye
                                size={22}
                                title="View"
                                className="text-green-500"
                              />
                            </Link>
                            <Link to={`/admin/funds/edit/${fund._id}`}>
                              <AiOutlineEdit
                                size={22}
                                title="Edit"
                                className="text-sky-500"
                              />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <tr cols={6} className="text-center text-red-500">
                    No Funds Found
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="my-5 p-5 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
            <h2 className="text-xl text-[rgb(0,223,154)] font-semibold">
              Users Registered
            </h2>
            <table className="w-full p-5">
              <thead className="px-5">
                <th className="text-start py-2 ">Name</th>
                <th className="text-start py-2 ">Username</th>
                <th className="text-start py-2 ">Email</th>
                <th className="text-start py-2 ">Role</th>
                <th className="text-start py-2 ">Status</th>
                <th className="text-start py-2 ">Subscribed</th>
                <th className="text-start py-2 ">Actions</th>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  <>
                    {users.map((user) => {
                      return (
                        <tr className="border-t">
                          <td className="py-3">{user.name}</td>
                          <td className="py-3">{user.username}</td>
                          <td className="py-3">{user.email}</td>
                          <td className="py-3">{user.role}</td>
                          <td className="py-3 text-center">
                            {user.active ? (
                              <p className="border inline-flex border-[rgb(0,223,154)] rounded-full p-1 text-xs text-center text-[rgb(0,223,154)]">
                                Active
                              </p>
                            ) : (
                              <p className="inline-flex border border-red-500 rounded-full p-1 text-xs text-center text-red-500">
                                Not Active
                              </p>
                            )}
                          </td>
                          <td className="py-3 text-center">
                            {user.subscribed ? (
                              <p className="inline-flex border border-[rgb(0,223,154)] rounded-full p-1 text-xs text-center text-[rgb(0,223,154)]">
                                Subscribed
                              </p>
                            ) : (
                              <p className="inline-flex border border-red-500 rounded-full p-1 text-xs text-center text-red-500">
                                Not Subscribed
                              </p>
                            )}
                          </td>
                          <td className="py-3 flex justify-between items-center">
                            <Link to={`/admin/users/${user._id}`}>
                              <AiOutlineEye
                                size={22}
                                title="View"
                                className="text-green-500"
                              />
                            </Link>
                            <Link to={`/admin/users/edit/${user._id}`}>
                              <AiOutlineEdit
                                size={22}
                                title="Edit"
                                className="text-sky-500"
                              />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <tr cols={7} className="text-center text-red-500">
                    No Users Found
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDash;
