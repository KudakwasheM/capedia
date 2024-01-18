import React, { useEffect, useState } from "react";
import "../Guests/css/Guest.css";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Guests/components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Guests/components/Footer";
import GuestLoader from "../Guests/components/GuestLoader";
import axiosClient from "../axiosClient";
import { useSelector } from "react-redux";

const Guests = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const getData = async () => {
    try {
      setLoading(true);

      const projectResponse = await axiosClient.get("/projects/all/published");
      const testimonialResponse = await axiosClient.get("/testimonials");
      const investorResponse = await axiosClient.get(
        "/users/investors/published"
      );

      setProjects(projectResponse?.data?.projects.splice(-3));
      setTestimonials(testimonialResponse?.data?.testimonials);
      setInvestors(investorResponse?.data?.users.splice(-3));
    } catch (error) {
      navigate("/error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    if (!userInfo) {
      return;
    } else {
      const role = userInfo.role;
      switch (role) {
        case "Enterpreneur":
          navigate("/enterpreneur/dashboard");
          break;
        case "Investor":
          navigate("/");
          break;
        default:
          navigate("/");
          break;
      }
    }
  }, []);
  return (
    <>
      {loading ? (
        <GuestLoader />
      ) : (
        <>
          <Navbar />
          <ToastContainer />
          <Outlet
            context={{
              load: [loading, setLoading],
              projects: projects,
              testimonials: testimonials,
              investors: investors,
            }}
          />
          <Footer />
        </>
      )}
    </>
  );
};

export default Guests;
