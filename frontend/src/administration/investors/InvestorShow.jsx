import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { AiOutlineEdit } from "react-icons/ai";
import CustomLoader from "../../Guests/components/CustomLoader";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import { useSelector } from "react-redux";

const InvestorShow = () => {
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const [investor, setInvestor] = useState({});
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);

  const getInvestor = async () => {
    setLoading(true);
    await axiosClient
      .get(`/users/${id}`)
      .then((res) => {
        setLoading(false);
        setInvestor(res?.data?.user);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.data?.message);
      });
  };

  const publish = async (e) => {
    e.preventDefault();
    setLoad(true);
    await axiosClient
      .put(`/investors/details/${investor.details._id}/publish`)
      .then((res) => {
        toast.success(res?.data?.message);
        setTimeout(() => {
          window.location.reload(true);
        }, 4000);
      })
      .catch((error) => {
        setLoad(false);
        toast.error("Failed to publish");
      });
  };

  useEffect(() => {
    getInvestor();
  }, []);
  return (
    <>
      {loading ? (
        <CustomLoader />
      ) : (
        <div className="bg-white p-3 w-full">
          <div className="flex justify-between items-center mb-3 w-full">
            <div className="flex items-center">
              <h2 className="font-bold text-2xl mr-3">{investor.name}</h2>(
              <div className="flex">
                {investor.details ? (
                  investor.details.industries.map((d) => {
                    return <span className="text-md italic mr-[6px]">{d}</span>;
                  })
                ) : (
                  <>No industry</>
                )}
              </div>
              )
              <Link to={`/admin/users/edit/${investor._id}`}>
                <AiOutlineEdit
                  size={22}
                  title="Edit"
                  className="text-green-500"
                />
              </Link>
            </div>
            {investor.details ? (
              <>
                {load ? (
                  <Oval
                    height={30}
                    width={30}
                    color="#4fa94d"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#4fa94d"
                    strokeWidth={6}
                    strokeWidthSecondary={6}
                  />
                ) : (
                  <button
                    onClick={publish}
                    className={`${
                      investor.details.published ? "bg-gray-400" : "bg-blue-600"
                    } text-white py-3 px-4 rounded-sm hover:shadow-md`}
                  >
                    {investor.details.published ? "Unpublish" : "Publish"}
                  </button>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
          {investor.details ? (
            <>
              <div className="flex justify-between flex-wrap mb-3 border">
                <div className="p-3">
                  <h3 className="text-[rgb(0,223,154)] font-semibold text-lg mb-1">
                    Country
                  </h3>
                  <p className="">{investor.details.country}</p>
                </div>
                <div className="p-3">
                  <h3 className="text-[rgb(0,223,154)] font-semibold text-lg mb-1">
                    Locations
                  </h3>
                  <div className="flex">
                    {investor.details.locations.map((l) => {
                      return <p className="mr-1">{l}</p>;
                    })}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-[rgb(0,223,154)] font-semibold text-lg mb-1">
                    Mobile
                  </h3>
                  <div className="flex">
                    <p className="">{investor.details.mobile}</p>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-[rgb(0,223,154)] font-semibold text-lg mb-1">
                    Investment Range
                  </h3>
                  <div className="flex">
                    <p className="">
                      US$ {investor.details.minimum} - US${" "}
                      {investor.details.maximum}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-5 mb-3 border">
                <h3 className="text-[rgb(0,223,154)] font-semibold text-lg mb-1">
                  Description
                </h3>
                <div className="flex">{investor.details.description}</div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export default InvestorShow;
