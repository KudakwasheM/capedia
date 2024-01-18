import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/authApiSlice";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AiOutlineAccountBook } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import { logout } from "../slices/authSlice";
import Navbar from "../Guests/components/Navbar";
import Footer from "../Guests/components/Footer";

const Investor = () => {
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
        default:
          break;
      }
    }
  }, [userInfo]);
  return (
    <>
      <Navbar />
      <ToastContainer />
      <Outlet />
      <Footer />
    </>
  );
};

export default Investor;
