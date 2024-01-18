import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { toast } from "react-toastify";
import CustomLoader from "../../Guests/components/CustomLoader";
import { useSelector } from "react-redux";
import { AiOutlineEdit } from "react-icons/ai";

const Project = () => {
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const [project, setProject] = useState({});
  const [documents, setDocuments] = useState([]);
  const [filename, setFilename] = useState("");
  const [loading, setLoading] = useState(false);

  const getProject = async () => {
    await axiosClient.get(`/projects/${id}`).then((res) => {
      setProject(res?.data?.project);
    });
  };

  const getDocuments = async () => {
    setLoading(true);
    await axiosClient
      .get(`/documents/project/${id}`)
      .then((res) => {
        setLoading(false);
        setDocuments(res.data.files);
        console.log(res);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  };

  const publish = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axiosClient
      .put(`/projects/${id}/publish`)
      .then((res) => {
        setLoading(false);
        toast.success(res?.data?.message);
        setTimeout(() => {
          window.location.reload(true);
        }, 4000);
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Failed to publish");
      });
  };

  const openfile = async (file) => {
    await axiosClient.get(`/documents/project/${id}/${file}`).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    getProject();
    getDocuments();
  }, []);
  return (
    <>
      {loading ? (
        <CustomLoader />
      ) : (
        <div className="bg-white p-3 w-full">
          <div className="flex justify-between items-center mb-3 w-full">
            <div className="flex items-center">
              <h2 className="font-bold text-2xl mr-3">{project.name}</h2>(
              <div className="flex">
                {project.industry ? (
                  project.industry.map((p) => {
                    return <span className="text-md italic mr-[6px]">{p}</span>;
                  })
                ) : (
                  <>No industry</>
                )}
              </div>
              )
              {userInfo.role === "Admin" ? (
                <Link to={`/admin/projects/edit/${project._id}`}>
                  <AiOutlineEdit
                    size={22}
                    title="Edit"
                    className="text-green-500"
                  />
                </Link>
              ) : (
                <Link to={`/enterpreneur/myprojects/edit/${project._id}`}>
                  <AiOutlineEdit
                    size={22}
                    title="Edit"
                    className="text-green-500"
                  />
                </Link>
              )}
            </div>
            {userInfo.role == "Admin" ? (
              <button
                onClick={publish}
                className={`${
                  project.published ? "bg-gray-400" : "bg-blue-600"
                } text-white py-3 px-4 rounded-sm hover:shadow-md`}
              >
                {project.published ? "Unpublish" : "Publish"}
              </button>
            ) : (
              <p
                className={`${
                  project.published
                    ? "border-blue-600 text-blue-600"
                    : "border-gray-400 text-gray-400"
                }  py-3 border-2 px-4 rounded-sm hover:shadow-md`}
              >
                {project.published ? "Published" : "Not published"}
              </p>
            )}
          </div>
          <div className="flex justify-around flex-wrap mb-3 border">
            <div className="p-3">
              <h3 className="text-[rgb(0,223,154)] font-semibold text-lg mb-1">
                Location
              </h3>
              <p className="">{project.location}</p>
            </div>
            <div className="p-3">
              <h3 className="text-[rgb(0,223,154)] font-semibold text-lg mb-1">
                Expected Fund
              </h3>
              <p className="">US$ {project.expected_fund}</p>
            </div>
            <div className="p-3">
              <h3 className="text-[rgb(0,223,154)] font-semibold text-lg mb-1">
                Progress
              </h3>
              <p className="">
                US$ {project.raised_fund} / US$ {project.expected_fund}
              </p>
            </div>
            <div className="p-3">
              <h3 className="text-[rgb(0,223,154)] font-semibold text-lg mb-1">
                Investor Percentage
              </h3>
              <p className="">{project.investor_percentage} %</p>
            </div>
            <div className="p-3">
              <h3 className="text-[rgb(0,223,154)] font-semibold text-lg mb-1">
                Contact
              </h3>
              <p className="">{project.mobile}</p>
            </div>
          </div>
          {project.details ? (
            <>
              <div className="grid gap-5 md:grid-cols-3 mb-5">
                <div className="p-3 col-span-2 border">
                  <h3 className="font-semibold text-xl mb-2 ">Short Summary</h3>
                  <p className="italic">{project.details.short_summary}</p>
                </div>
                <div className="p-3 border">
                  <h3 className="font-semibold text-xl mb-2">The Deal</h3>
                  <p className="italic">{project.details.deal}</p>
                </div>
              </div>
              <div className="p-3 border mb-5">
                <h3 className="font-semibold text-xl mb-2">Description</h3>
                <p className="italic">{project.details.description}</p>
              </div>
              <div className="p-3 border mb-5">
                <h3 className="font-semibold text-xl mb-2">Documents</h3>
                {documents.length > 0 ? (
                  <div className="flex flex-wrap ml-2 gap-5">
                    {documents.map((d) => {
                      return (
                        <button
                          onClick={() => openfile(d.filename)}
                          className="p-1 rounded-full border"
                        >
                          <p className="text-sm">{d.filename}</p>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-red-500">No Documents Found</div>
                )}
              </div>
              <div className="p-3 border mb-5">
                <h3 className="font-semibold text-xl mb-2">The Team</h3>
                {project.members.length > 0 ? (
                  <div className="flex ml-2 gap-5">
                    {project.members.map((m) => {
                      return (
                        <div className="p-3 border">
                          <p className="text-lg font-semibold">{m.name}</p>
                          <p className="text-sm">{m.position}</p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-red-500">No Team Members</div>
                )}
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

export default Project;
