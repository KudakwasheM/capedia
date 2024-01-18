import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { toast } from "react-toastify";

const InvestorProfile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const getDetails = async () => {
    setLoading();

    await axiosClient
      .get(`/users/${userInfo._id}`)
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
    <div className="my-10">
      <div className="max-w-[1200px] mx-auto px-3">
        {/* <div className="grid grid-cols-3 gap-4"> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-5 space-y-3">
          <div className="p-3 sm:p-5 border hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] flex flex-col">
            <div className="flex mb-3 sm:mb-10 justify-between">
              <h2 className="font-semibold text-xl sm:text-3xl">Profile</h2>
              <h3 className="font-semibold text-sm">Joined in 2023</h3>
            </div>
            <img
              src=""
              className="ml-5 h-28 w-28 border p-1 border-[rgb(0,223,154)] rounded-full mb-4"
              alt=""
            />
            <div className="flex justify-between">
              <div className="ml-3 ">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <h2 className="font-bold text-lg sm:text-3xl mb-2">
                    {userInfo?.name}
                  </h2>
                  <p className="text-sm sm:text-xl sm:ml-2">
                    ({userInfo?.username})
                  </p>
                </div>
                <h3 className="text-sm sm:text-md text-[rgb(0,223,154)]">
                  {userInfo?.role}
                </h3>
              </div>
              <button className="bg-none text-sm text-[rgb(0,223,154)]">
                Change Name
              </button>
            </div>
          </div>
          <div className="p-3 sm:p-5 border hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
            <h2 className="font-semibold text-xl sm:text-3xl mb-3 sm:mb-10">
              Contacts
            </h2>
            <div>
              <h3 className="text-lg sm:text-2xl font-semibold mb-2">Email</h3>
              <div className="flex items-center justify-between mb-5">
                <p className="text-lg sm:text-xl ml-2">{userInfo?.email}</p>
                <button className="bg-none text-sm text-[rgb(0,223,154)]">
                  Change Email
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-lg sm:text-2xl font-semibold mb-2">Phone</h3>
              <div className="flex items-center justify-between mb-5">
                {user.details ? (
                  <>
                    <p className="text-lg sm:text-xl ml-2">
                      {user.details.mobile}
                    </p>
                    <button className="bg-none text-sm text-[rgb(0,223,154)]">
                      Change Phone
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-lg sm:text-xl ml-2">No phone</p>
                    <button className="bg-none text-sm text-[rgb(0,223,154)]">
                      Add Phone
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="border hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] p-3 sm:p-5">
            <h2 className="font-semibold text-xl sm:text-3xl mb-5">Country</h2>
            <div className="flex items-center justify-between mb-5">
              {user?.details ? (
                <>
                  <p className="text-lg sm:text-xl ml-2">
                    {user?.details?.country}
                  </p>
                  <button className="bg-none text-sm text-[rgb(0,223,154)]">
                    Change Country
                  </button>
                </>
              ) : (
                <>
                  <p className="text-lg sm:text-xl ml-2">No Country</p>
                  <button className="bg-none text-sm text-[rgb(0,223,154)]">
                    Add Country
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="border hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] p-3 sm:p-5">
            <h2 className="font-semibold text-xl sm:text-3xl mb-5">Budget</h2>
            <div className="flex items-center justify-between mb-5">
              {user?.details ? (
                <>
                  <p className="text-lg sm:text-xl ml-2">
                    US${user?.details?.minimum} - US${user?.details?.maximum}
                  </p>
                  <button className="bg-none text-sm text-[rgb(0,223,154)]">
                    Change Budget
                  </button>
                </>
              ) : (
                <>
                  <p className="text-lg sm:text-xl ml-2">No budget</p>
                  <button className="bg-none text-sm text-[rgb(0,223,154)]">
                    Add Budget
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="border hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] p-3 sm:p-5">
            <h2 className="font-semibold text-xl sm:text-3xl mb-5">
              Industries
            </h2>
            {user?.details ? (
              <div className="flex items-center justify-between mb-5">
                <div>
                  {user?.details?.industries.map((i) => {
                    return <p className="text-lg sm:text-xl ml-2">{i}</p>;
                  })}
                </div>
                <button className="bg-none text-sm text-[rgb(0,223,154)]">
                  Change Industries
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-lg sm:text-xl ml-2">No Industries</p>
                <button className="bg-none text-sm text-[rgb(0,223,154)]">
                  Add Industries
                </button>
              </div>
            )}
          </div>
          <div className="border hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] p-3 sm:p-5">
            <h2 className="font-semibold text-xl sm:text-3xl mb-5">
              Locations
            </h2>
            {user?.details ? (
              <div className="flex items-center justify-between mb-5">
                <div>
                  {user?.details?.locations.map((i) => {
                    return <p className="text-lg sm:text-xl ml-2">{i}</p>;
                  })}
                </div>
                <button className="bg-none text-sm text-[rgb(0,223,154)]">
                  Change locations
                </button>
              </div>
            ) : (
              <>
                <p className="text-lg sm:text-xl ml-2">No locations</p>
                <button className="bg-none text-sm text-[rgb(0,223,154)]">
                  Add locations
                </button>
              </>
            )}
          </div>
          <div className="border hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] p-3 sm:p-5 sm:col-span-2">
            <h2 className="font-semibold text-xl sm:text-3xl mb-5">
              Description
            </h2>
            {user?.details ? (
              <div className="">
                <p className="text-lg sm:text-xl mb-3">
                  {user?.details?.description}
                </p>
                <button className="bg-none text-sm text-[rgb(0,223,154)]">
                  Update description
                </button>
              </div>
            ) : (
              <div className="flex justify-between">
                <p className="text-lg sm:text-xl ml-2">No description</p>
                <button className="bg-none text-sm text-[rgb(0,223,154)]">
                  Add description
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorProfile;
