import React, { useEffect, useState } from "react";
import {
  AiOutlineCaretDown,
  AiOutlineCaretUp,
  AiOutlineClose,
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlineSwap,
  AiOutlineUser,
} from "react-icons/ai";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../slices/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../../slices/authSlice";

const Navbar = ({ route }) => {
  const [nav, setNav] = useState(true);
  const [open, setOpen] = useState(false);
  const [investor, setInvestor] = useState({});

  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      toast.error(err);
    }
  };

  const handleNav = () => {
    setNav(!nav);
  };

  const checkInvestor = () => {
    if (userInfo.role == "Investor") {
      setInvestor(userInfo);
    }
  };

  useEffect(() => {
    if (userInfo) {
      checkInvestor();
    }
  }, []);
  return (
    <div className="w-full bg-white z-10 sticky top-0 shadow-md">
      <div className="flex justify-between items-center h-20 max-w-[1200px] mx-auto px-4">
        {/* <div className="flex justify-between items-center h-24 max-w-[1500px] mx-auto px-4 shadow-lg z-50 fixed w-full top-0"> */}
        <Link to="/">
          <h1 className="w-full text-3xl font-bold text-[rgb(0,223,154)]">
            Capidea.
          </h1>
        </Link>
        <ul className="hidden md:flex items-center justify-between">
          <li className="hover:text-[rgb(0,223,154)] mr-5">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-[rgb(0,223,154)] pb-2 text-[rgb(0,223,154)]"
                  : ""
              }
            >
              Home
            </NavLink>
          </li>
          {/* <li className="p-4">Resources</li> */}
          <li className="hover:text-[rgb(0,223,154)] mr-5">
            <NavLink
              to="/proposals"
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-[rgb(0,223,154)] pb-2 text-[rgb(0,223,154)]"
                  : ""
              }
            >
              StartUps
            </NavLink>
          </li>
          <li className="hover:text-[rgb(0,223,154)] mr-5">
            <NavLink
              to="/investors"
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-[rgb(0,223,154)] pb-2 text-[rgb(0,223,154)]"
                  : ""
              }
            >
              Investors
            </NavLink>
          </li>
          <li className="hover:text-[rgb(0,223,154)] mr-5">
            <NavLink
              to="/testimonials"
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-[rgb(0,223,154)] pb-2 text-[rgb(0,223,154)]"
                  : ""
              }
            >
              Testimonials
            </NavLink>
          </li>
          {userInfo ? (
            <>
              {userInfo.role == "Investor" ? (
                <div
                  className={`${
                    open
                      ? "shadow-[rgba(0,223,154,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
                      : "shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
                  } hover:shadow-[rgba(0,223,154,0.2)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] rounded-full bg-[rgba(0,223,154,0.08)]`}
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
                    {investor?.name}
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
                    } absolute top-[65px] right-[25px] border bg-white py-5 px-3 rounded-lg w-[250px] before:content-[''] before:absolute before:top-[-50px] before:h-[40px] before:w-[40px]`}
                  >
                    <div className="text-center mb-3">
                      <h3 className="text-lg">{investor?.name}</h3>
                      <h4 className="text-sm">{investor?.role}</h4>
                    </div>
                    <ul>
                      <Link
                        to={`/investor/profile`}
                        className="flex items-center border-t py-2 hover:text-[rgb(0,223,154)]"
                      >
                        <span className="mr-2">
                          <AiOutlineUser size={20} className="ml-2" />
                        </span>
                        <p>My Profile</p>
                      </Link>
                      <Link
                        to={`/investor/changepassword`}
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
                <>
                  <Link to="/login" className="ml-5">
                    <li className="py-2 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] px-3 bg-[rgba(0,223,154,0.08)] hover:text-[rgba(0,223,154,0.59)] rounded-full">
                      Account
                    </li>
                  </Link>
                </>
              )}
            </>
          ) : (
            <Link to="/login" className="ml-5">
              <li className="py-2 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] px-3 bg-[rgba(0,223,154,0.08)] hover:text-[rgba(0,223,154,0.59)] rounded-full">
                Account
              </li>
            </Link>
          )}
        </ul>
        <div onClick={handleNav} className="block md:hidden">
          {!nav ? (
            <AiOutlineClose size={20} className="text-[rgb(0,223,154)]" />
          ) : (
            <AiOutlineMenu size={20} className="text-[rgb(0,223,154)]" />
          )}
        </div>
        <div
          className={
            !nav
              ? "fixed left-0 top-0 h-[100vh] w-[60%] border-r border-r-[rgba(0,223,154,0.1)] bg-white ease-in-out duration-500"
              : "fixed left-[-100%]"
          }
        >
          <div className="flex items-center h-24">
            <h1 className="w-full text-3xl font-bold text-[rgb(0,223,154)] m-4">
              Capidea.
            </h1>
          </div>
          <div className="flex flex-col justify-between">
            <ul className="uppercase p-4">
              <li className="p-4 border-b border-[rgba(0,223,154,0.1)] hover:text-[rgb(0,223,154)]">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "border-b-2 border-[rgb(0,223,154)] pb-2 text-[rgb(0,223,154)]"
                      : ""
                  }
                  onClick={handleNav}
                >
                  Home
                </NavLink>
              </li>
              <li className="p-4 border-b border-[rgba(0,223,154,0.1)] hover:text-[rgb(0,223,154)]">
                <NavLink
                  to="/proposals"
                  className={({ isActive }) =>
                    isActive
                      ? "border-b-2 border-[rgb(0,223,154)] pb-2 text-[rgb(0,223,154)]"
                      : ""
                  }
                  onClick={handleNav}
                >
                  StartUps
                </NavLink>
              </li>
              <li className="p-4 border-b border-[rgba(0,223,154,0.1)] hover:text-[rgb(0,223,154)]">
                <NavLink
                  to="/investors"
                  className={({ isActive }) =>
                    isActive
                      ? "border-b-2 border-[rgb(0,223,154)] pb-2 text-[rgb(0,223,154)]"
                      : ""
                  }
                  onClick={handleNav}
                >
                  Investors
                </NavLink>
              </li>
              <li className="p-4 border-b border-[rgba(0,223,154,0.1)] hover:text-[rgb(0,223,154)]">
                <NavLink
                  to="/testimonials"
                  className={({ isActive }) =>
                    isActive
                      ? "border-b-2 border-[rgb(0,223,154)] pb-2 text-[rgb(0,223,154)]"
                      : ""
                  }
                  onClick={handleNav}
                >
                  Testimonials
                </NavLink>
              </li>
            </ul>
            {userInfo ? (
              <div
                className={`${
                  open
                    ? "shadow-[rgba(0,223,154,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
                    : "shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
                } hover:shadow-[rgba(0,223,154,0.2)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] rounded-full bg-[rgba(0,223,154,0.08)] mx-5`}
              >
                <p
                  className="flex items-center p-2 "
                  onClick={() => setOpen(!open)}
                >
                  {investor?.name}
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
                  } absolute border bg-white py-5 px-3 rounded-lg w-[200px]`}
                >
                  <div className="text-center mb-3">
                    <h3 className="text-lg">{investor?.name}</h3>
                    <h4 className="text-sm">{investor?.role}</h4>
                  </div>
                  <ul>
                    <Link
                      to={`/investor/profile`}
                      className="flex items-center border-t py-2 hover:text-[rgb(0,223,154)]"
                    >
                      <span className="mr-2">
                        <AiOutlineUser size={20} className="ml-2" />
                      </span>
                      <p>My Profile</p>
                    </Link>
                    <Link
                      to={`/investor/changepassword`}
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
              <Link to="/login" className="ml-5 flex ">
                <p className="py-2 px-3 bg-[rgba(0,223,154,0.08)] flex-start hover:text-[rgba(0,223,154,0.59)] rounded-full">
                  Account
                </p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
