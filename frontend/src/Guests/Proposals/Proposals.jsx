import React, { useEffect, useState } from "react";
import { GoLocation } from "react-icons/go";
import { Link, useOutletContext, useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useGetAllProjectsQuery } from "../../slices/projectsApiSlice";
import axiosClient from "../../axiosClient";
import { toast } from "react-toastify";
import CustomLoader from "../components/CustomLoader";

const Proposals = () => {
  const { projects } = useOutletContext();
  const [queryParams] = useSearchParams();
  // const [projects, setProjects] = useState([]);
  // const [loading, setLoading] = useState(false);

  // const [queryParams] = useSearchParams();

  // const getProjects = async () => {
  //   setLoading(true);
  //   await axiosClient
  //     .get("/projects/all/published")
  //     .then((res) => {
  //       setLoading(false);
  //       setProjects(res?.data?.projects);
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       toast.error(err?.response?.data?.message);
  //     });
  // };

  const filteredProjects = projects.filter((project) => {
    const opportunity = queryParams.get("opportunity");
    if (!opportunity) {
      return true; // No opportunity parameter, return all projects
    }
    return (
      project.industry
        .map((i) => i.toLowerCase())
        .filter((i) => i.includes(opportunity.toLowerCase())).length > 0
    );
  });

  const { data, isLoading, isSuccess, isError } = useGetAllProjectsQuery();
  const itemsPerPage = 4;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredProjects.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProjects.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProjects.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    // getProjects();
  }, []);
  return (
    <div>
      <div className="sub-hero w-full">
        <div className="h-full bg-[rgba(0,0,0,0.4)]">
          <div className="flex flex-col items-center justify-around h-full lg:w-[800px] mx-auto text-white text-center py-14 px-5">
            <h1 className="text-5xl text-[rgb(0,223,154)] font-bold">
              Proposals
            </h1>
            <p className="">
              Where great businesses and great people meet. We bring together
              businesses looking for investment and investors with the capital,
              contacts and knowledge to help them succeed.
            </p>
          </div>
        </div>
      </div>
      {/* {loading ? (
        <CustomLoader />
      ) : ( */}
      <div className="lg:max-w-[1200px] lg:w-[1200px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto px-5 lg:px-24 py-10">
        {currentItems > 0 ? (
          <>
            {currentItems.map((project) => {
              return (
                <div className="flex flex-col border rounded-lg shadow-md hover:shadow-2xl">
                  <div className="h-32">No Image</div>
                  <div className="w-full bg-slate-500 h-[3px]">
                    <div
                      className="bg-[rgb(0,223,154)] h-full"
                      style={{
                        width:
                          (project.raised_fund / project.expected_fund) * 100 +
                          "%",
                      }}
                    ></div>
                  </div>
                  <div className="px-3 py-4">
                    <h2 className="font-semibold mb-2">{project.name}</h2>
                    <p className="mb-2 flex items-center text-sm">
                      <GoLocation size={18} className="text-blue-500" />
                      <span className="ml-1">{project.location}</span>
                    </p>
                    {project.details ? (
                      <p className="text-gray-700">
                        {project.details.short_summary
                          .split(" ")
                          .splice(0, 50)
                          .join(" ")}
                        ...
                      </p>
                    ) : (
                      <p>No details</p>
                    )}

                    <div className="flex mt-5 gap-10">
                      <div className="flex flex-col">
                        <p className="text-sm">Target</p>
                        <h3 className="font-semibold">
                          US$ {project.expected_fund}
                        </h3>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm">Investors' Percentage</p>
                        <h3 className="font-semibold">
                          {project.investor_percentage}%
                        </h3>
                      </div>
                    </div>
                    <div className="mt-5">
                      <Link
                        to={`/proposals/${project._id}`}
                        className="bg-[rgba(0,223,154,0.75)] hover:bg-[rgba(0,223,154,1)] py-2 px-3 text-white text-sm rounded"
                      >
                        Find Out More
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="text-center text-red-500 text-2xl">
            No published projects
          </div>
        )}
      </div>
      {/* )} */}
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
      </div>
    </div>
  );
};

export default Proposals;
