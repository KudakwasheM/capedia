import React, { useEffect, useState } from "react";
import {
  AiOutlineBackward,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineStepBackward,
} from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSetProjectMutation } from "../../slices/projectsApiSlice";
import { addProject } from "../../slices/projectsSlice";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { industries } from "../../layouts/constants/Industries";
import { toast } from "react-toastify";
import { useGetEnterpreneursQuery } from "../../slices/usersApiSlice";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import axiosClient from "../../axiosClient";
import CustomLoader from "../../Guests/components/CustomLoader";
import { useSelector } from "react-redux";

const ProjectForm = () => {
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const [detailsId, setDetailsId] = useState("");
  const [error, setError] = useState("");
  const [memberIds, setMemberIds] = useState();
  const [loading, setLoading] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [proj, setProj] = useState({
    name: "",
    website: "",
    location: "",
    mobile: "",
    industry: [],
    expected_fund: null,
    raised_fund: null,
    investor_percentage: null,
    stage: "",
    enterpreneur: "",
  });

  const [details, setDetails] = useState({
    short_summary: "",
    description: "",
    progress: "",
    advantages: [],
    deal: "",
    project_id: "",
  });

  const [teamMember, setTeamMember] = useState({
    name: "",
    position: "",
    description: "",
    project_id: "",
  });

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  const [document, setDocument] = useState({
    filename: "",
    project_id: "",
  });

  const [loadProject, setLoadProject] = useState(false);
  const [loadDetails, setLoadDetails] = useState(false);
  const [loadMember, setLoadMember] = useState(false);
  const [loadDoc, setLoadDoc] = useState(false);
  const [enterpreneurs, setEnterpreneurs] = useState([]);
  const [data, setData] = useState([]);
  const [hidden, setHidden] = useState(false);

  const navigate = useNavigate();

  // const [project, setProject] = useState([]);
  const getData = async () => {
    setLoading(true);
    await axiosClient
      .get(`/projects/${id}`)
      .then((res) => {
        setProj(res?.data?.project);
        const retrievedProject = res?.data?.project;
        const details = retrievedProject.details;
        setDetails(details);
        setDetails({ project_id: retrievedProject._id });
        // setTeamMember({ ...teamMember, project_id: retrievedProject._id });
        setDetailsId(details._id);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
    await axiosClient
      .get(`/details/project/${id}`)
      .then((res) => {
        setDetails(res?.data?.detail);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
    await axiosClient
      .get(`/members/project/${id}`)
      .then((res) => {
        setTeamMembers(res?.data?.members);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
    setLoading(false);
  };

  const dataz = [];
  const getEnterpreneurs = async () => {
    setLoading(true);
    await axiosClient
      .get("/users/enterpreneur")
      .then((res) => {
        setLoading(false);
        setEnterpreneurs(res?.data?.users);
        const users = res?.data?.users;
        for (let i = 0; i < users.length; i++) {
          const nigga = { value: users[i]._id, label: users[i].name };
          dataz.push(nigga);
        }

        setData(dataz);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message);
      });
  };

  const saveProject = async (e) => {
    e.preventDefault();
    if (id) {
      if (userInfo.role == "Enterpreneur") {
        proj.enterpreneur = userInfo._id;
      }
      setLoadProject(true);
      await axiosClient
        .put(`/projects/${id}`, proj)
        .then((res) => {
          setLoadProject(false);
          toast.success(res?.data?.message);
        })
        .catch((err) => {
          setLoadProject(false);
          toast.error(err?.response?.data?.message);
        });
    } else {
      setLoadProject(true);
      if (userInfo.role == "Enterpreneur") {
        proj.enterpreneur = userInfo._id;
      }
      await axiosClient
        .post("/projects", proj)
        .then((res) => {
          setLoadProject(false);
          setDetails({ project_id: res?.data?.project?._id });
          toast.success(res?.data?.message);
        })
        .catch((err) => {
          setLoadProject(false);
          toast.error(err?.response?.data?.message);
        });
    }
  };

  const saveDetails = async (e) => {
    e.preventDefault();
    if (detailsId) {
      setLoadDetails(true);
      await axiosClient
        .put(`/details/${detailsId}`, details)
        .then((res) => {
          setLoadDetails(false);
          toast.success(res?.data?.message);
        })
        .catch((err) => {
          setLoadDetails(false);
          toast.error(err?.response?.data?.message);
        });
    } else {
      setLoadDetails(true);
      await axiosClient
        .post(`/details`, details)
        .then((res) => {
          setLoadDetails(false);
          toast.success(res?.data?.message);
        })
        .catch((err) => {
          setLoadDetails(false);
          toast.error(err?.response?.data?.message);
        });
    }
  };

  const team = [];
  const saveMember = async (e) => {
    e.preventDefault();
    setLoadMember(true);
    if (proj._id != "") {
      teamMember.project_id = proj._id;
    }
    await axiosClient
      .post("/members", teamMember)
      .then((res) => {
        setLoadMember(false);
        team.push(res?.data?.member);
        setTeamMembers(team);
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        setLoadMember(false);
        toast.error(err?.response?.data?.message);
      });
  };

  const handleFileChange = async (e) => {
    const pickedFile = e.target.files[0];
    console.log("first");
    if (pickedFile.type != "application/pdf") {
      setError("Please select pdf files only");
    }
    setFile(pickedFile);
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const saveDocument = async (e) => {
    e.preventDefault();
    setLoadDoc(true);

    const formData = new FormData();
    formData.append("document", file);
    formData.append("filename", document.filename);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    await axiosClient
      .post(`/documents/${proj._id}/project`, formData, config)
      .then((res) => {
        setLoadDoc(false);
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        setLoadDoc(false);
        toast.error(err?.data?.message);
      });
  };

  const changeEnter = (e) => {
    const enter = e.value;
    setProj({ ...proj, enterpreneur: enter });
  };

  const changeIndustry = (e) => {
    const inds = e.map(({ value }) => value);
    setProj({ ...proj, industry: inds });
  };

  if (id) {
    useEffect(() => {
      getData();
      getEnterpreneurs();
    }, []);
  }

  const deleteMember = () => {};

  useEffect(() => {
    getEnterpreneurs();
  }, []);

  return (
    <div className="p-3 w-full">
      {loading ? (
        <CustomLoader />
      ) : (
        <div className="m-5 p-4 w-[600px] mx-auto border">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold mb-3 text-[rgba(0,223,154,0.65)]">
              {proj.name != "" ? "Update Project" : "Add Project"}
            </h2>
            <button
              onClick={() => navigate(-1)}
              className="text-red-500 p-1 border-2 rounded-full border-red-500"
            >
              <BiArrowBack size={20} className="" />
            </button>
          </div>
          <Tabs>
            <TabList>
              <Tab>Project</Tab>
              <Tab>Details</Tab>
              <Tab>The Team</Tab>
              <Tab>Documents</Tab>
            </TabList>

            <TabPanel>
              <h2 className="font-semibold mb-3">Project</h2>
              <div className="">
                <form>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="">Project Name</label>
                    <input
                      type="text"
                      className="border p-2"
                      value={proj.name}
                      placeholder="Enter your project name"
                      onChange={(e) =>
                        setProj({ ...proj, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="">Website (optional)</label>
                    <input
                      type="text"
                      value={proj.website}
                      className="border p-2"
                      placeholder="Enter your text"
                      onChange={(e) =>
                        setProj({ ...proj, website: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="">Location</label>
                    <input
                      type="text"
                      value={proj.location}
                      className="border p-2"
                      placeholder="Enter your text"
                      onChange={(e) =>
                        setProj({ ...proj, location: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="">Mobile</label>
                    <input
                      type="text"
                      value={proj.mobile}
                      className="border p-2"
                      placeholder="Enter your text"
                      onChange={(e) =>
                        setProj({ ...proj, mobile: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="">Industry</label>
                    <Select
                      // defaultValue={[colourOptions[2], colourOptions[3]]
                      // value={proj.industry.map(i=>{})}
                      isMulti
                      options={industries}
                      onChange={changeIndustry}
                    />
                  </div>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="">Expected Fund</label>
                    <input
                      type="number"
                      value={proj.expected_fund}
                      className="border p-2"
                      placeholder="Enter your text"
                      onChange={(e) =>
                        setProj({ ...proj, expected_fund: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="">Stage</label>
                    <input
                      type="text"
                      value={proj.stage}
                      className="border p-2"
                      placeholder="Enter your text"
                      onChange={(e) =>
                        setProj({ ...proj, stage: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="">Raised Fund</label>
                    <input
                      type="number"
                      value={proj.raised_fund}
                      className="border p-2"
                      placeholder="Enter your text"
                      onChange={(e) =>
                        setProj({ ...proj, raised_fund: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="">Investors Percentage</label>
                    <input
                      type="number"
                      value={proj.investor_percentage}
                      className="border p-2"
                      placeholder="Enter your text"
                      onChange={(e) =>
                        setProj({
                          ...proj,
                          investor_percentage: e.target.value,
                        })
                      }
                    />
                  </div>

                  {userInfo.role != "Enterpreneur" ? (
                    <div className="flex flex-col mb-2">
                      <label htmlFor="">Enterpreneur</label>
                      <Select
                        options={data}
                        isClearable={true}
                        isSearchable={true}
                        onChange={changeEnter}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  {/* {usersSelect} */}
                  <div className="">
                    <button
                      type="submit"
                      className="bg-[rgb(0,223,154)] py-2 w-full text-white"
                      onClick={saveProject}
                    >
                      {loadProject ? "...Loading" : "Save Project"}
                    </button>
                  </div>
                </form>
              </div>
            </TabPanel>
            <TabPanel>
              <h2 className="font-semibold mb-3">Details</h2>
              <div className="">
                <form>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="">Short Description</label>
                    <textarea
                      className="border p-2"
                      value={details.short_summary}
                      placeholder="Enter your project name"
                      onChange={(e) =>
                        setDetails({
                          ...details,
                          short_summary: e.target.value,
                        })
                      }
                      id=""
                      // cols="30"
                      rows="4"
                    ></textarea>
                  </div>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="">Full Description</label>
                    <textarea
                      className="border p-2"
                      value={details ? details.description : ""}
                      placeholder="Enter your project name"
                      onChange={(e) =>
                        setDetails({ ...details, description: e.target.value })
                      }
                      id=""
                      // cols="30"
                      rows="5"
                    ></textarea>
                  </div>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="">Progress</label>
                    <textarea
                      className="border p-2"
                      value={details ? details.progress : ""}
                      placeholder="Enter your project name"
                      onChange={(e) =>
                        setDetails({ ...details, progress: e.target.value })
                      }
                      id=""
                      // cols="30"
                      rows="5"
                    ></textarea>
                  </div>

                  <div className="flex flex-col mb-2">
                    <label htmlFor="">Deal</label>
                    <textarea
                      className="border p-2"
                      value={details ? details.deal : ""}
                      placeholder="Enter your deal"
                      onChange={(e) =>
                        setDetails({ ...details, deal: e.target.value })
                      }
                      id=""
                      // cols="30"
                      rows="5"
                    ></textarea>
                  </div>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="">Advantage</label>
                    <input
                      className="border p-2"
                      placeholder="Enter your deal"
                      onChange={(e) =>
                        setDetails({ ...details, advantages: e.target.value })
                      }
                    />
                  </div>

                  <div className="">
                    <button
                      type="submit"
                      className="bg-[rgb(0,223,154)] py-2 w-full text-white"
                      onClick={saveDetails}
                    >
                      {loadDetails ? (
                        "...Loading"
                      ) : (
                        <>{details._id ? "Update Details" : "Save Details"}</>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </TabPanel>
            <TabPanel>
              <h2 className="font-semibold mb-3">Team Member</h2>
              <div className="">
                {teamMembers.length > 0 ? (
                  <div className="mt-3">
                    {teamMembers.map((member) => {
                      return (
                        <div className="w-full grid grid-cols-4 mb-2 border-b">
                          <div className="col-span-3 ">
                            <div className="flex gap-2">
                              <p className="w-[25%]">Name</p>
                              <p className="font-semibold">{member.name}</p>
                            </div>
                            <div className="flex gap-2">
                              <p className="w-[25%]">Position</p>
                              <p className="font-semibold">{member.position}</p>
                            </div>
                            <div className="flex gap-2">
                              <p className="w-[25%]">Description</p>
                              <p className="font-semibold">
                                {member.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-around">
                            <button>
                              <AiOutlineEdit
                                size={22}
                                title="Edit"
                                className="text-sky-500"
                              />
                            </button>
                            <button onClick={deleteMember}>
                              <AiOutlineDelete
                                size={22}
                                title="Delete"
                                className="text-red-500"
                              />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                    <div className={`${hidden ? "hidden" : "mt-3"}`}>
                      <button
                        type="submit"
                        className="bg-[rgb(0,223,154)] py-2 w-full text-white"
                        onClick={() => {
                          setHidden(true);
                        }}
                      >
                        Add Another Member
                      </button>
                    </div>

                    <div className={`${hidden ? "mt-5" : "hidden"}`}>
                      <h2 className="text-xl font-semibold mb-3 text-[rgba(0,223,154,0.65)]">
                        Add Member
                      </h2>
                      <div className="flex flex-col mb-2">
                        <label htmlFor="">Name</label>
                        <input
                          type="text"
                          className="border p-2"
                          placeholder="Enter member's name"
                          onChange={(e) =>
                            setTeamMember({
                              ...teamMember,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      {}
                      <div className="flex flex-col mb-2">
                        <label htmlFor="">Position</label>
                        <input
                          type="text"
                          className="border p-2"
                          placeholder="Enter member's position"
                          onChange={(e) =>
                            setTeamMember({
                              ...teamMember,
                              position: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="flex flex-col mb-2">
                        <label htmlFor="">Description</label>
                        <textarea
                          className="border p-2"
                          placeholder="Enter member's description"
                          onChange={(e) =>
                            setTeamMember({
                              ...teamMember,
                              description: e.target.value,
                            })
                          }
                          id=""
                          // cols="30"
                          rows="5"
                        ></textarea>
                      </div>
                      <div className="flex-col mb-2 hidden">
                        <label htmlFor="">Project</label>
                        <input type="text" disabled value={proj._id} />
                      </div>
                      {/* {usersSelect} */}
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="submit"
                          className="bg-[rgb(0,223,154)] py-2 w-full text-white"
                          onClick={saveMember}
                        >
                          {loadMember ? "...Loading" : "Save Member"}
                        </button>
                        <button
                          className="bg-[rgb(255,0,0)] py-2 w-full text-white"
                          onClick={() => setHidden(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <form>
                      <div className="flex flex-col mb-2">
                        <label htmlFor="">Name</label>
                        <input
                          type="text"
                          className="border p-2"
                          placeholder="Enter member's name"
                          onChange={(e) =>
                            setTeamMember({
                              ...teamMember,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="flex flex-col mb-2">
                        <label htmlFor="">Position</label>
                        <input
                          type="text"
                          className="border p-2"
                          placeholder="Enter member's position"
                          onChange={(e) =>
                            setTeamMember({
                              ...teamMember,
                              position: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="flex flex-col mb-2">
                        <label htmlFor="">Description</label>
                        <textarea
                          className="border p-2"
                          placeholder="Enter member's description"
                          onChange={(e) =>
                            setTeamMember({
                              ...teamMember,
                              description: e.target.value,
                            })
                          }
                          id=""
                          // cols="30"
                          rows="5"
                        ></textarea>
                      </div>
                      <div className="flex-col mb-2 hidden">
                        <label htmlFor="">Project</label>
                        <input type="text" value={proj._id} />
                      </div>
                      {/* {usersSelect} */}
                      <div className="">
                        <button
                          type="submit"
                          className="bg-[rgb(0,223,154)] py-2 w-full text-white"
                          onClick={saveMember}
                        >
                          {loadMember ? "...Loading" : "Save Member"}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </TabPanel>
            <TabPanel>
              <h2 className="font-semibold mb-3">Documents</h2>
              <div className="">
                <form enctype="multipart/form-data">
                  <div className="flex flex-col mb-2">
                    <label htmlFor="">Document Name</label>
                    <input
                      type="text"
                      className="border p-2"
                      placeholder="Enter your document title"
                      onChange={(e) =>
                        setDocument({ ...document, filename: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="">
                      Choose Document
                      <span className="ml-2 text-xs text-[rgb(0,223,154)]">
                        (PDF files only)
                      </span>
                    </label>
                    <p
                      className={`${
                        error == "" ? "hidden" : "text-red-500 text-xs"
                      }`}
                    >
                      {error}
                    </p>
                    <input
                      type="file"
                      className="border p-2"
                      placeholder="Enter your project name"
                      onChange={(e) => {
                        handleFileChange(e);
                      }}
                    />
                  </div>
                  <div className="">
                    <button
                      type="submit"
                      className="bg-[rgb(0,223,154)] py-2 w-full text-white"
                      onClick={saveDocument}
                    >
                      {loadDoc ? "...Loading" : <>Save Document</>}
                    </button>
                  </div>
                </form>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default ProjectForm;
