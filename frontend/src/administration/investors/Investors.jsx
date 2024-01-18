import React, { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomLoader from "../../Guests/components/CustomLoader";
import Switch from "react-switch";
import { Oval } from "react-loader-spinner";

const Investors = () => {
  const [investors, setInvestors] = useState([]);
  const [user, setUser] = useState({});
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [actLoad, setActLoad] = useState(false);
  const [subLoad, setSubLoad] = useState(false);

  const filterInvestors = investors.filter((investor) => {
    // Specify your filter conditions here
    return search.toLowerCase() === ""
      ? investor
      : investor.name.toLowerCase().includes(search.toLowerCase())
      ? investor
      : investor.email.toLowerCase().includes(search.toLowerCase())
      ? investor
      : investor.username.toLowerCase().includes(search.toLowerCase())
      ? investor
      : investor.role.toLowerCase().includes(search.toLowerCase());
  });

  const itemsPerPage = 12;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filterInvestors.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filterInvestors.length / itemsPerPage);

  const getInvestors = async () => {
    setLoading(true);
    await axiosClient
      .get("/users/investors")
      .then((res) => {
        setLoading(false);
        setInvestors(res?.data?.users);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message);
      });
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % users.length;
    setItemOffset(newOffset);
  };

  const toggleActivate = async (id) => {
    setActLoad(true);
    await axiosClient.put(`/users/activate/${id}`).then((res) => {
      setActLoad(false);
      getInvestors();
    });
  };

  const toggleSubscribe = async (id) => {
    setSubLoad(true);
    await axiosClient.put(`/users/subscribe/${id}`).then((res) => {
      setSubLoad(false);
      getInvestors();
    });
  };

  const deleteInvestor = async (id) => {
    if (!window.confirm("Are you sure you want to delete this investor?")) {
      return;
    }
    await axiosClient
      .delete(`/users/${id}`)
      .then((res) => {
        getInvestors();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  useEffect(() => {
    getInvestors();
  }, []);

  return (
    <div className="bg-white p-3 w-full">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-3xl font-semibold">Investors</h2>
      </div>
      <input
        type="text"
        placeholder="Search for a user (name, email, username, role)"
        className="w-full p-2 text-lg border rounded-lgFdis"
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <CustomLoader />
      ) : (
        <>
          {currentItems ? (
            <>
              {currentItems.length > 0 ? (
                <div className="grid grid-cols-4 gap-5 text-center py-3">
                  {currentItems.map((investorr) => {
                    return (
                      <div
                        className="flex flex-col border rounded-lg bg-white p-5 hover:shadow-xl"
                        key={investorr._id}
                      >
                        <div className="mx-auto">
                          <img
                            src=""
                            alt=""
                            className="h-24 w-24 rounded-full p-1 border-2 border-[rgb(0,223,154)]"
                          />
                        </div>
                        <div className="mt-5">
                          <h2 className="font-semibold mb-2">
                            {investorr.name}
                          </h2>
                          <p className="my-[1px]">{investorr.username}</p>
                          <p className="my-[1px] italic">{investorr.email}</p>
                          <div className="my-[1px]">
                            {investorr.details ? (
                              <div className="bg-[rgba(0,223,154,0.07)] font-semibold rounded-full my-2 p-2">
                                US${investorr.details.minimum} - US$
                                {investorr.details.maximum}
                              </div>
                            ) : (
                              <div className="bg-[rgba(0,223,154,0.07)] font-semibold rounded-full my-2 p-2">
                                <p>No Budget</p>
                              </div>
                            )}
                          </div>
                          <div className="flex justify-around py-3">
                            <div className="flex items-center flex-col text-sm gap-1">
                              <Switch
                                checkedIcon={false}
                                uncheckedHandleIcon={false}
                                offColor="#FF0000"
                                onColor="#00DF9A"
                                handleDiameter={20}
                                height={20}
                                width={40}
                                onChange={() => {
                                  toggleActivate(investorr._id);
                                }}
                                checked={investorr.active}
                              />
                              {actLoad ? (
                                <p className="">
                                  <Oval
                                    height={15}
                                    width={15}
                                    color="#00DF9A"
                                  />
                                </p>
                              ) : (
                                <p className="">Active</p>
                              )}
                            </div>
                            <div className="flex items-center flex-col text-sm gap-1">
                              <Switch
                                checkedIcon={false}
                                uncheckedHandleIcon={false}
                                offColor="#FF0000"
                                onColor="#00DF9A"
                                handleDiameter={20}
                                height={20}
                                width={40}
                                onChange={() => {
                                  toggleSubscribe(investorr._id);
                                }}
                                checked={investorr.subscribed}
                              />
                              {subLoad ? (
                                <p className="">
                                  <Oval
                                    height={15}
                                    width={15}
                                    color="#00DF9A"
                                  />
                                </p>
                              ) : (
                                <p className="">Subscribed</p>
                              )}
                            </div>
                          </div>
                          <div className="flex justify-around border-t pt-3 mt-3">
                            <Link to={`/admin/investors/${investorr._id}`}>
                              <AiOutlineEye
                                size={22}
                                title="View"
                                className="text-green-500"
                              />
                            </Link>
                            <button
                              onClick={() => deleteInvestor(investorr._id)}
                            >
                              <AiOutlineDelete
                                size={22}
                                title="Delete"
                                className="text-red-500"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xl text-red-500 font-bold text-center py-5">
                  No users found
                </p>
              )}
            </>
          ) : (
            <p className="text-xl font-bold text-center py-5">No users found</p>
          )}
        </>
      )}
      <ReactPaginate
        previousLabel={"← Prev "}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={
          "flex justify-center items-center mb-1 text-lg gap-1 my-4"
        }
        previousLinkClassName={
          "border px-2 py-2 rounded-lg font-semibold hover:bg-[rgb(0,223,154)] hover:border-[rgb(0,223,154)] hover:text-white"
        }
        nextLinkClassName={
          "border px-2 py-2 rounded-lg font-semibold hover:bg-[rgb(0,223,154)] hover:border-[rgb(0,223,154)] hover:text-white"
        }
        pageLinkClassName="py-2 px-2 border rounded-lg font-semibold hover:bg-[rgb(0,223,154)] hover:border-[rgb(0,223,154)] hover:text-white"
        disabledClassName={"pagination__link--disabled"}
        activeLinkClassName={
          "bg-[rgb(0,223,154)] text-white border-[rgb(0,223,154)]"
        }
      />
    </div>
  );
};

export default Investors;
