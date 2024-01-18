import React, { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axiosClient from "../../axiosClient";
import { useNavigate } from "react-router-dom";

const InvestorUpdate = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    await axiosClient
      .put(`/users/${userInfo._id}`, {
        name,
        username,
        email,
      })
      .then((res) => {
        setLoading(false);
        toast.success(res?.data?.message);
        navigate("/investor/profile");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message || err.error);
      });
  };

  return (
    <div className="w-[55%] mx-auto my-10 p-4 border">
      <form>
        <div className="flex flex-col mb-2">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">Update Account</h2>
            <button
              onClick={() => navigate("/investor/profile")}
              className="self-end"
            >
              <GrFormClose size={25} />
            </button>
          </div>
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="" className="mb-1">
            Name
          </label>
          <input
            type="text"
            defaultValue={userInfo.name}
            className="border p-2"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="">Username</label>
          <input
            type="text"
            defaultValue={userInfo.username}
            className="border p-2"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="">Email</label>
          <input
            type="email"
            defaultValue={userInfo.email}
            className="border p-2"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="">
          <button
            type="submit"
            className="bg-[rgb(0,223,154)] py-2 w-full text-white"
            onClick={submitHandler}
          >
            {loading ? "...Loading" : "Update Account"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InvestorUpdate;
