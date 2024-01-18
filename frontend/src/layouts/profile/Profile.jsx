import React, { useEffect, useRef, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { useSelector } from "react-redux";
import axiosClient from "../../axiosClient";
import moment from "moment";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [full, setFull] = useState(false);
  const [loading, setLoading] = useState(false);

  const imageRef = useRef(null);

  const handlePickImage = () => {
    imageRef.current.click();
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const profileURL = URL.createObjectURL(file);
      setFull(true);
      setProfile(file);
      setFileUrl(profileURL);
    }
  };

  const getDetails = async () => {
    setLoading(true);

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

  const upload = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("profile", profile);
    formData.append("profileUrl", fileUrl);

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    await axiosClient.post("/users/image", formData, config).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div className="h-full p-5">
      {/* <div className="w-[55%] border p-5">
        <img
          src=""
          className="h-28 w-28 mx-auto border-2 p-1 border-[rgb(0,223,154)] rounded-full mb-4"
          alt=""
        />

        <div className="flex flex-col text-center mx-auto">
          <h2 className="text-2xl mb-2">{userInfo.name}</h2>
          <h3 className="text-md text-[rgb(0,223,154)]">{userInfo.role}</h3>
          <p className="text-md">{userInfo.email}</p>
          <h3 className="text-md">{userInfo.username}</h3>
        </div>
      </div> */}
      {/* <div className="grid grid-cols-3 gap-4"> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-5 space-y-3">
        <div className="p-3 sm:p-5 border hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] flex flex-col">
          <div className="flex sm:mb-10 justify-between">
            <h2 className="font-semibold text-xl sm:text-3xl">Profile</h2>
            <h3 className="font-semibold text-sm">
              Joined in {moment(userInfo.createdAt).format("ll")}
            </h3>
          </div>
          <div className="flex">
            {profile ? (
              <img
                src={URL.createObjectURL(profile)}
                className="ml-5 h-28 w-28 border p-1 border-[rgb(0,223,154)] rounded-full mb-4 align-middle"
                alt=""
              />
            ) : (
              <img
                src=""
                className="ml-5 h-28 w-28 border p-1 border-[rgb(0,223,154)] rounded-full mb-4"
                alt=""
              />
            )}
            <BsPencil
              className="flex-end"
              title="Edit Profile"
              onClick={handlePickImage}
            />
            <input
              type="file"
              ref={imageRef}
              onChange={handleImageChange}
              className="hidden"
            />

            <button
              className={full ? "ml-2 py-2 px-3 bg-sky-500 h-10" : "hidden"}
              onClick={upload}
            >
              Upload
            </button>
          </div>
          <div className="flex justify-between">
            <div className="ml-3">
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
        {/* <div className="border hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] p-3 sm:p-5">
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
          <h2 className="font-semibold text-xl sm:text-3xl mb-5">Industries</h2>
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
          <h2 className="font-semibold text-xl sm:text-3xl mb-5">Locations</h2>
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
        </div> */}
      </div>
    </div>
  );
};

export default Profile;
