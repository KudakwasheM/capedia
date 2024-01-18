import React, { useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axiosClient";
import { toast } from "react-toastify";
import CustomLoader from "./components/CustomLoader";

const Verified = () => {
  const { id, token } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const verifyAccount = async () => {
    setLoading(true);
    await axiosClient
      .get(`/${id}/verify/${token}`)
      .then((res) => {
        setLoading(false);
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message || err.error);
      });
  };

  useEffect(() => {
    verifyAccount();
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      {loading ? (
        <CustomLoader />
      ) : (
        <div className="flex flex-col border md:w-[400px] p-5">
          <h1 className="text-center text-[rgb(0,223,154)] text-4xl font-bold mb-3">
            Capidea.
          </h1>
          <AiOutlineCheckCircle
            size={80}
            className="text-green-500 mx-auto my-5"
          />
          <div className="text-center">
            <p>Congratulations! You have successfully verified your account.</p>
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="text-white bg-[rgb(0,223,154)] mt-3 py-2 px-4 hover:bg-black"
            >
              Login to your account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Verified;
