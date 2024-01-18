import React, { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import ReactPaginate from "react-paginate";
import { Link, useOutletContext } from "react-router-dom";
import CustomLoader from "../components/CustomLoader";

const Sponsors = () => {
  const { investors } = useOutletContext();
  // const [investors, setInvestors] = useState([]);
  // const [loading, setLoading] = useState(false);

  // const getInvestors = async () => {
  //   setLoading(true);
  //   await axiosClient.get("/users/investors").then((res) => {
  //     setLoading(false);
  //     setInvestors(res?.data?.users);
  //   });
  // };

  const itemsPerPage = 9;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = investors.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(investors.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % investors.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    // getInvestors();
  }, []);
  return (
    <div className="">
      <div className="sub-hero w-full">
        <div className="h-full bg-[rgba(0,0,0,0.4)]">
          <div className="flex flex-col items-center justify-around h-full lg:w-[800px] mx-auto text-white text-center py-14 px-5">
            <h1 className="text-5xl text-[rgb(0,223,154)] font-bold">
              Investors
            </h1>
            <p className="">
              Where great businesses and great people meet. We bring together
              businesses looking for investment and investors with the capital,
              contacts and knowledge to help them succeed.
            </p>
          </div>
        </div>
      </div>
      <div className="lg:w-[1200px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto px-3 sm:px-5 lg:px-24 py-10 text-center">
        {/* {loading ? (
          <CustomLoader />
        ) : ( */}
        <>
          {currentItems.length > 0 ? (
            <>
              {currentItems.map((i) => {
                return (
                  <div className="flex flex-col border rounded-lg bg-white p-5">
                    <div className="mx-auto">
                      <img
                        src=""
                        alt=""
                        className="h-24 w-24 rounded-full p-1 border-2 border-[rgb(0,223,154)]"
                      />
                    </div>
                    <div className="mt-5">
                      <h2 className="font-semibold mb-2">{i.name}</h2>
                      {i.details ? (
                        <>
                          <div className="bg-[rgba(0,223,154,0.07)] font-semibold rounded-full my-2 p-2">
                            US${i.details.minimum} - US${i.details.maximum}
                          </div>
                          <p className="text-gray-700">
                            {i.details.description
                              .split(" ")
                              .splice(0, 20)
                              .join(" ")}
                            ...
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="bg-[rgba(0,223,154,0.07)] font-semibold rounded-full my-2 p-2">
                            No Data
                          </div>
                          <p className="text-gray-700">No Description</p>
                        </>
                      )}

                      <div className="mt-5">
                        <Link
                          to={`/investors/${i._id}`}
                          className="bg-[rgba(0,223,154,0.75)] hover:bg-[rgba(0,223,154,1)] py-2 px-3 text-white text-sm rounded"
                        >
                          Get in touch
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </>
        {/* )} */}
      </div>
      <div className="my-5">
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
        {/* {projectsList} */}
      </div>
    </div>
  );
};

export default Sponsors;
