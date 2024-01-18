import React, { useEffect, useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useGetAllUsersQuery } from "../../slices/usersApiSlice";
import ReactPaginate from "react-paginate";
import SearchBar from "../components/SearchBar";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUsers } from "../../slices/usersSlice";
import axios from "axios";
import axiosClient from "../../axiosClient";
import CustomLoader from "../../Guests/components/CustomLoader";

const Users = () => {
  // const { data, isLoading, isSuccess, isError, error } = useGetAllUsersQuery();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const filteredUsers = users.filter((user) => {
    // Specify your filter conditions here
    return search.toLowerCase() === ""
      ? user
      : user.name.toLowerCase().includes(search.toLowerCase())
      ? user
      : user.email.toLowerCase().includes(search.toLowerCase())
      ? user
      : user.username.toLowerCase().includes(search.toLowerCase())
      ? user
      : user.role.toLowerCase().includes(search.toLowerCase());
  });

  const itemsPerPage = 12;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredUsers.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

  const getUsers = async () => {
    setLoading(true);
    await axiosClient
      .get("/users")
      .then((res) => {
        setLoading(false);
        setUsers(res.data.users);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message || err.message);
      });
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % users.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="bg-white p-3 w-full">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-3xl font-semibold">Users</h2>
        <Link
          to="/admin/users/create"
          className="flex items-center bg-green-400 font-semibold py-2 px-3 text-white"
        >
          Add User
          <AiOutlineUserAdd
            size={20}
            className="ml-2"
            style={{ stroke: "white", strokeWidth: "50" }}
          />
        </Link>
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
                  {currentItems
                    // .filter((user) => {
                    //   return search.toLowerCase() === ""
                    //     ? user
                    //     : user.name.toLowerCase().includes(search)
                    //     ? user
                    //     : user.email.toLowerCase().includes(search)
                    //     ? user
                    //     : user.username.toLowerCase().includes(search);
                    // })
                    .map((user) => {
                      return (
                        <div
                          className="flex flex-col border rounded-lg bg-white p-5 hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
                          key={user._id}
                        >
                          <div className="mx-auto">
                            <img
                              src=""
                              alt=""
                              className="h-24 w-24 rounded-full p-1 border-2 border-[rgb(0,223,154)]"
                            />
                          </div>
                          <div className="mt-5">
                            <h2 className="font-semibold mb-2">{user.name}</h2>
                            <p className="py-[1px]">{user.username}</p>
                            <p className="py-[1px] italic">{user.email}</p>
                            <p className="py-[1px]">{user.role}</p>
                            <div className="flex justify-around py-3">
                              <div className="flex items-center text-sm">
                                {user.active ? (
                                  <span className="rounded-full h-4 w-4 bg-green-500"></span>
                                ) : (
                                  <span className="rounded-full h-4 w-4 bg-red-500"></span>
                                )}{" "}
                                <p className="ml-2">Active</p>
                              </div>
                              <div className="flex items-center text-sm">
                                {user.subscribed ? (
                                  <span className="rounded-full h-4 w-4 bg-green-500"></span>
                                ) : (
                                  <span className="rounded-full h-4 w-4 bg-red-500"></span>
                                )}{" "}
                                <p className="ml-2">Subscribed</p>
                              </div>
                            </div>
                            <div className="flex justify-around border-t pt-3 mt-3">
                              <Link to={`/admin/users/${user._id}`}>
                                <AiOutlineEye
                                  size={22}
                                  title="View"
                                  className="text-green-500"
                                />
                              </Link>
                              <Link to={`/admin/users/edit/${user._id}`}>
                                <AiOutlineEdit
                                  size={22}
                                  title="Edit"
                                  className="text-sky-500"
                                />
                              </Link>
                              <Link>
                                <AiOutlineDelete
                                  size={22}
                                  title="Delete"
                                  className="text-red-500"
                                />
                              </Link>
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
      {/* {usersList} */}
    </div>
  );
};

export default Users;
