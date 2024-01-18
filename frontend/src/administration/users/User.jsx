import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { toast } from "react-toastify";
import CustomLoader from "../../Guests/components/CustomLoader";

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const getDetails = async () => {
    setLoading(true);

    await axiosClient
      .get(`/users/${id}`)
      .then((res) => {
        setLoading(false);
        setUser(res?.data?.user);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  useEffect(() => {
    getDetails();
  }, []);
  return (
    <div className="p-5">
      {loading ? (
        <CustomLoader />
      ) : (
        <>
          <div className="flex justify-center items-center gap-5">
            <div className="p-5">
              <img
                src=""
                className="ml-5 h-32 w-32 border p-1 border-[rgb(0,223,154)] rounded-full mb-4"
                alt=""
              />
            </div>

            <div className="p-5 w-full">
              <div className="grid grid-cols-2 gap-5 m-3 flex-1">
                <div className="p-3 border">
                  <h3 className="text-[rgb(0,223,154)] font-semibold text-lg mb-1">
                    Name
                  </h3>
                  <p className="">{user.name}</p>
                </div>
                <div className="p-3 border">
                  <h3 className="text-[rgb(0,223,154)] font-semibold text-lg mb-1">
                    Username
                  </h3>
                  <p className="">{user.username}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5 m-3">
                <div className="p-3 border">
                  <h3 className="text-[rgb(0,223,154)] font-semibold text-lg mb-1">
                    Email
                  </h3>
                  <p className="">{user.email}</p>
                </div>
                <div className="p-3 border ">
                  <h3 className="text-[rgb(0,223,154)] font-semibold text-lg mb-1">
                    Username
                  </h3>
                  <p className="">{user.role}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 mt-5 md:w-[50%] mx-auto">
            <Link
              to={`/admin/users/edit/${user._id}`}
              className="text-center bg-sky-500 text-white font-semi-bold py-3"
            >
              Edit
            </Link>
            <button
              className="text-center bg-red-500 text-white font-semi-bold py-3"
              onClick={() => navigate(-1)}
            >
              Go back
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default User;
