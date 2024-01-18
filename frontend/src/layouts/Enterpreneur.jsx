import React, { useEffect, useState } from "react";
import {
  AiOutlineAccountBook,
  AiOutlineCaretDown,
  AiOutlineCaretLeft,
  AiOutlineCaretUp,
  AiOutlineDashboard,
  AiOutlineDollar,
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlinePercentage,
  AiOutlineProject,
  AiOutlineSwap,
  AiOutlineTeam,
  AiOutlineUser,
} from "react-icons/ai";
import { Link, NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/authApiSlice";
import { logout } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Enterpreneur = () => {
  const [open, setOpen] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      const role = userInfo.role;
      switch (role) {
        case "Enterpreneur":
          navigate("/enterpreneur/dashboard");
          break;
        case "Admin":
          navigate("/admin/dashboard");
          break;
        case "Investor":
          navigate("/");
          break;
        default:
          navigate("/");
          break;
      }
    }
  }, [userInfo]);

  return (
    <div className="h-screen max-w-screen grid grid-cols-6 bg-[rgb(240,240,240)]">
      <aside className="flex flex-col bg-white p-5 col-span-1 h-screen max-h-full">
        <h1 className="text-3xl font-bold text-[rgb(0,223,154)]">Capidea.</h1>
        <div className="flex flex-col flex-1 text-black pt-10">
          <NavLink
            to="/enterpreneur/dashboard"
            className={({ isActive }) =>
              isActive
                ? "p-3 mb-1 w-full flex items-center bg-white shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] text-black"
                : "p-3 mb-1 w-full flex items-center hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] hover:text-black"
            }
          >
            <span className="mr-2">
              <AiOutlineDashboard size={25} />
            </span>
            Dashboard
          </NavLink>
          <NavLink
            to="/enterpreneur/myprojects"
            className={({ isActive }) =>
              isActive
                ? "p-3 mb-1 w-full flex items-center bg-white shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] text-black"
                : "p-3 mb-1 w-full flex items-center hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] hover:text-black"
            }
          >
            <span className="mr-2">
              <AiOutlineProject size={25} />
            </span>
            My Projects
          </NavLink>
          <NavLink
            to="/enterpreneur/myinvestors"
            className={({ isActive }) =>
              isActive
                ? "p-3 mb-1 w-full flex items-center bg-white shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] text-black"
                : "p-3 mb-1 w-full flex items-center hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] hover:text-black"
            }
          >
            <span className="mr-2">
              <AiOutlinePercentage size={25} />
            </span>
            My Investors
          </NavLink>
          <NavLink
            to="/enterpreneur/myfunds"
            className={({ isActive }) =>
              isActive
                ? "p-3 mb-1 w-full flex items-center bg-white shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] text-black"
                : "p-3 mb-1 w-full flex items-center hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] hover:text-black"
            }
          >
            <span className="mr-2">
              <AiOutlineDollar size={25} />
            </span>
            Funds
          </NavLink>
        </div>
        <div className="mt-2">
          <NavLink
            to="/"
            onClick={logoutHandler}
            className="text-red-500 p-3 mb-1 w-full flex items-center border border-red-500 hover:bg-red-500 hover:text-white shadow-[rgba(239,68,68,0.25)_0px_6px_12px_-2px,_rgba(239,68,68,0.5)_0px_3px_7px_-3px]"
          >
            <span className="mr-2">
              <AiOutlineLogout size={25} />
            </span>
            Logout
          </NavLink>
        </div>
      </aside>
      <div className="flex flex-col h-screen max-h-screen col-span-5">
        <nav className="flex border-b h-14 items-center justify-end p-5 bg-white">
          {userInfo ? (
            <div
              className={`absolute ${
                open
                  ? "shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
                  : ""
              } hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] rounded-full`}
            >
              <p
                className="flex items-center p-2 "
                onClick={() => {
                  setOpen(!open);
                  setTimeout(() => {
                    setOpen(false);
                  }, 5000);
                }}
              >
                {userInfo?.name}
                <AiOutlineUser size={20} className="ml-2" />
                {open ? (
                  <AiOutlineCaretUp size={10} />
                ) : (
                  <AiOutlineCaretDown size={10} className="" />
                )}
              </p>
              <div
                className={`${
                  open
                    ? "block shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] rounded-full"
                    : "hidden"
                } absolute top-[50px] right-1 border bg-white py-5 px-3 rounded-lg w-[250px] before:content-[''] before:absolute before:top-[-50px] before:h-[40px] before:w-[40px]`}
              >
                <div className="text-center mb-3">
                  <h3 className="text-lg">{userInfo?.name}</h3>
                  <h4 className="text-sm">{userInfo.role}</h4>
                </div>
                <ul>
                  <Link
                    to={`/enterpreneur/profile`}
                    className="flex items-center border-t py-2 hover:text-[rgb(0,223,154)]"
                  >
                    <span className="mr-2">
                      <AiOutlineUser size={20} className="ml-2" />
                    </span>
                    <p>My Profile</p>
                  </Link>
                  <Link
                    to={`/enterpreneur/changepassword`}
                    className="flex items-center border-t py-2 hover:text-[rgb(0,223,154)]"
                  >
                    <span className="mr-2">
                      <AiOutlineSwap size={20} className="ml-2" />
                    </span>
                    <p>Change Password</p>
                  </Link>
                  <Link
                    to="/"
                    onClick={logoutHandler}
                    className="flex items-center border-t py-2 hover:text-red-500"
                  >
                    <span className="mr-2">
                      <AiOutlineLogout size={20} className="ml-2" />
                    </span>
                    <p>Log Out</p>
                  </Link>
                </ul>
              </div>
            </div>
          ) : (
            ""
          )}
        </nav>
        <div className="flex-1 bg-white m-5 h-full max-h-full overflow-y-auto">
          <ToastContainer />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Enterpreneur;
