import React, { useState } from "react";
import axiosClient from "../axiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { GrFormClose } from "react-icons/gr";
import { ToastContainer, toast } from "react-toastify";

const ResetPassword = () => {
  const { id, token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState("");

  const navigate = useNavigate();

  const resetPassword = async (e) => {
    e.preventDefault();
    if (password !== "" && confirmPassword !== "") {
      if (password === confirmPassword) {
        setLoading(true);
        await axiosClient
          .post(`/${id}/reset/password/${token}`, { password })
          .then((res) => {
            setLoading(false);
            toast.success(res?.data?.message);
            navigate("/login");
          })
          .catch((err) => {
            setLoading(false);
            toast.error(err?.message);
            console.log(err);
          });
      } else {
        toast.error("Passwords do not match");
      }
    } else {
      toast.error("Please fill all fields");
    }
  };
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col border md:w-[400px] p-5">
        <button onClick={() => navigate("/")} className="self-end">
          <GrFormClose size={25} />
        </button>
        <h1 className="text-center text-[rgb(0,223,154)] text-4xl font-bold mb-5">
          Capidea.
        </h1>
        <ToastContainer />
        <p className="text-2xl text-center mb-3">Reset Password</p>
        <form>
          <div className="flex flex-col mb-2">
            <label htmlFor="" className="mb-1">
              New Password
            </label>
            <input
              type="password"
              className="border p-2"
              placeholder="Enter new password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="" className="mb-1">
              Confirm new Password
            </label>
            <input
              type="password"
              className="border p-2"
              placeholder="Confirm new password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="">
            <button
              onClick={resetPassword}
              type="submit"
              className="bg-[rgb(0,223,154)] py-2 w-full text-white"
            >
              {loading ? "...Loading" : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
