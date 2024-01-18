import React, { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { useSelector } from "react-redux";
import axiosClient from "../../axiosClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [email, setEmail] = useState(userInfo.email);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    if (newPassword === confirmNewPassword) {
      await axiosClient
        .put(`/profile`, {
          email,
          password: oldPassword,
          newPassword,
        })
        .then((res) => {
          setLoading(false);
          navigate("/enterpreneur/profile");
          toast.success(res?.data?.message);
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err?.response?.data?.message || err.error);
        });
    } else {
      toast.error("Passwords do not match");
      setLoading(false);
    }
  };

  return (
    <div className="w-[55%] mx-auto m-5 p-4 border">
      <form>
        <div className="flex flex-col mb-2">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">Change Password</h2>
            <button
              onClick={() => navigate("/admin/users")}
              className="self-end"
            >
              <GrFormClose size={25} />
            </button>
          </div>
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="" className="mb-1">
            Old Password
          </label>
          <input
            type="password"
            className="border p-2"
            placeholder="Enter old password"
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="" className="mb-1">
            New Password
          </label>
          <input
            type="password"
            className="border p-2"
            placeholder="Enter new password"
            onChange={(e) => setNewPassword(e.target.value)}
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
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>
        <div className="">
          <button
            onClick={handleSubmit}
            type="submit"
            className="bg-[rgb(0,223,154)] py-2 w-full text-white"
          >
            {loading ? "...Loading" : "Change Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
