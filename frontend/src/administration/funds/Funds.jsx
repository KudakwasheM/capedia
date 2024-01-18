import React, { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineFileAdd,
} from "react-icons/ai";
import CustomLoader from "../../Guests/components/CustomLoader";
import ReactPaginate from "react-paginate";
import moment from "moment";

const Funds = () => {
  const [funds, setFunds] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const filteredFunds = funds.filter((fund) => {
    // Specify your filter conditions here
    return search.toLowerCase() === ""
      ? fund
      : fund.investor.name.toLowerCase().includes(search.toLowerCase())
      ? fund
      : fund.project.name.toLowerCase().includes(search.toLowerCase());
  });

  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredFunds.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredFunds.length / itemsPerPage);

  const getFunds = async () => {
    setLoading(true);
    await axiosClient
      .get("/funds")
      .then((res) => {
        setLoading(false);
        setFunds(res?.data?.funds);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message);
      });
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredFunds.length;
    setItemOffset(newOffset);
  };

  const deleteFund = async (fundId) => {
    if (!window.confirm("Are you sure you want to delete this fund?")) {
      return;
    }

    await axiosClient
      .delete(`/funds/${fundId}`)
      .then((res) => {
        getFunds();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  useEffect(() => {
    getFunds();
  }, []);
  return (
    <div className="bg-white p-3 w-full">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-3xl font-semibold">Funds</h2>
        <Link
          to="/admin/funds/create"
          className="flex items-center bg-green-400 font-semibold py-2 px-3 text-white"
        >
          Add Fund
          <AiOutlineFileAdd size={20} className="ml-2" style={{}} />
        </Link>
      </div>
      <input
        type="text"
        placeholder="Search"
        className="w-full p-2 text-lg border rounded-lg"
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <CustomLoader />
      ) : (
        <>
          <table class="table-auto w-full my-5">
            <thead>
              <tr>
                <th className="text-start py-2 ">Amount</th>
                <th className="text-start py-2 ">Investor</th>
                <th className="text-start py-2 ">Project</th>
                <th className="text-start py-2 ">Percentage</th>
                <th className="text-start py-2 ">Created On</th>
                <th className="text-start py-2 ">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                <>
                  {currentItems.map((fund) => {
                    return (
                      <tr className="border-t">
                        <td className="py-3">{fund.amount}</td>
                        <td className="py-3">{fund.investor.name}</td>
                        <td className="py-3">{fund.project.name}</td>
                        <td className="py-3">
                          {fund.project_percentage.toFixed(2)}%
                        </td>
                        <td className="py-3">
                          {moment(fund.createdAt).format("LL")}
                        </td>
                        <td className="py-3 flex justify-between items-center">
                          {/* <Link to={`/admin/funds/${fund._id}`}>
                          <AiOutlineEye
                            size={22}
                            title="View"
                            className="text-green-500"
                          />
                        </Link> */}
                          <Link to={`/admin/funds/edit/${fund._id}`}>
                            <AiOutlineEdit
                              size={22}
                              title="Edit"
                              className="text-sky-500"
                            />
                          </Link>
                          <button onClick={() => deleteFund(fund._id)}>
                            <AiOutlineDelete
                              size={22}
                              title="Delete"
                              className="text-red-500"
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <tr col={6} className="text-center text-red-500">
                  No Funds found
                </tr>
              )}
            </tbody>
          </table>
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
        </>
      )}
    </div>
  );
};

export default Funds;
