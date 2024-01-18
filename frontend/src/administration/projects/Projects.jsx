import React, { useEffect, useState } from "react";
import { GoLocation } from "react-icons/go";
import { Link } from "react-router-dom";
import { useGetAllProjectsQuery } from "../../slices/projectsApiSlice";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import axiosClient from "../../axiosClient";
import CustomLoader from "../../Guests/components/CustomLoader";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const filteredProjects = projects.filter((project) => {
    // Specify your filter conditions here
    return search.toLowerCase() === ""
      ? project
      : project.name.toLowerCase().includes(search.toLowerCase())
      ? project
      : project.location.toLowerCase().includes(search.toLowerCase());
  });

  const itemsPerPage = 9;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredProjects.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProjects.length / itemsPerPage);

  const getProjects = async () => {
    setLoading(true);
    await axiosClient
      .get("/projects")
      .then((res) => {
        setLoading(false);
        setProjects(res?.data?.projects);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message || err.message);
      });
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProjects.length;
    setItemOffset(newOffset);
  };

  const deleteProject = async (proId) => {
    if (!window.confirm("Are you sure you want to delete project")) {
      return;
    }
    await axiosClient
      .delete(`/projects/${proId}`)
      .then((res) => {
        getProjects();
        // setProjects(projects.filter((project) => project._id !== _id));
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message);
      });
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className="bg-white p-3 w-full">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-3xl font-semibold">Proposals</h2>
        <Link
          to="/admin/projects/create"
          className="flex items-center bg-green-400 font-semibold py-2 px-3 text-white"
        >
          Add Project
          <AiOutlineUserAdd
            size={20}
            className="ml-2"
            style={{ stroke: "white", strokeWidth: "50" }}
          />
        </Link>
      </div>
      <input
        type="text"
        placeholder="Search for a project (name, email, username, role)"
        className="w-full p-2 text-lg border rounded-lg"
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <CustomLoader />
      ) : (
        <>
          {currentItems ? (
            <>
              {currentItems.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 py-3">
                  {currentItems.map((project) => {
                    return (
                      <div
                        className="flex flex-col border rounded-lg bg-white hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
                        key={project._id}
                      >
                        <div className="h-32">No Image</div>
                        <div className="w-full bg-slate-500 h-[3px]">
                          <div
                            className="bg-[rgb(0,223,154)] h-full"
                            style={{
                              width:
                                (project.raised_fund / project.expected_fund) *
                                  100 +
                                "%",
                            }}
                          ></div>
                        </div>

                        <div className="p-3">
                          <h2 className="font-semibold mb-2">{project.name}</h2>
                          <p className="mb-2 flex items-center text-sm">
                            <GoLocation size={18} className="text-blue-500" />
                            <span className="ml-1">{project.location}</span>
                          </p>
                          <p className="text-gray-700">
                            {project.details ? (
                              <>
                                {project.details.short_summary
                                  .split(" ")
                                  .splice(0, 60)
                                  .join(" ")}
                                ...
                              </>
                            ) : (
                              <>No details</>
                            )}
                          </p>
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
                          <div className="flex justify-around  border-t pt-3 mt-3">
                            <Link to={`/admin/projects/${project._id}`}>
                              <AiOutlineEye
                                size={22}
                                title="View"
                                className="text-green-500"
                              />
                            </Link>
                            <Link to={`/admin/projects/edit/${project._id}`}>
                              <AiOutlineEdit
                                size={22}
                                title="Edit"
                                className="text-sky-500"
                              />
                            </Link>
                            <button onClick={() => deleteProject(project._id)}>
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
                  No projects found
                </p>
              )}
            </>
          ) : (
            <p className="text-xl font-bold text-center py-5">
              No projects found
            </p>
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

export default Projects;
