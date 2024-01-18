import React, { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axiosClient from "../axiosClient";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (email !== "") {
      await axiosClient
        .post(`/reset-password`, { email })
        .then((res) => {
          setLoading(false);
          toast.success("Reset email sent");
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          toast.error(err?.message);
        });
    } else {
      toast.error("Please add email");
    }
  };
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col border md:w-[400px] p-5">
        <button onClick={() => navigate("/login")} className="self-end">
          <GrFormClose size={25} />
        </button>
        <h1 className="text-center text-[rgb(0,223,154)] text-4xl font-bold mb-5">
          Capidea.
        </h1>
        <ToastContainer />
        <p className="text-2xl text-center mb-3">Forgot Password?</p>
        <form className="flex flex-col">
          <div className="flex flex-col mb-2">
            <label htmlFor="" className="mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              className="border p-2"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="">
            <button
              className={
                loading
                  ? "disabled bg-[rgba(0,223,154,0.5)] py-2 w-full text-white"
                  : "bg-[rgb(0,223,154)] py-2 w-full text-white"
              }
              type="submit"
              onClick={submitHandler}
            >
              {loading ? "...Loading" : "Send Reset Link"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
