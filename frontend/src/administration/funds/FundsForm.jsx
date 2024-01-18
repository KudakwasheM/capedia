import React, { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import CustomLoader from "../../Guests/components/CustomLoader";
import { BiArrowBack } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";

const FundsForm = () => {
  const [fund, setFund] = useState({
    amount: null,
    investor: "",
    project: "",
  });
  const { id } = useParams();
  const [projects, setProjects] = useState([]);
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);

  const navigate = useNavigate();

  const invs = [];
  const projs = [];
  const getData = async () => {
    setLoading(true);
    await axiosClient
      .get("/users/investors")
      .then((res) => {
        const investorData = res?.data?.users;

        for (let i = 0; i < investorData.length; i++) {
          const nigga = {
            value: investorData[i]._id,
            label: investorData[i].name,
          };
          invs.push(nigga);
        }

        setInvestors(invs);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message);
      });
    await axiosClient
      .get("/projects")
      .then((res) => {
        const projectsData = res?.data?.projects;

        for (let i = 0; i < projectsData.length; i++) {
          const pro = {
            value: projectsData[i]._id,
            label: projectsData[i].name,
          };
          projs.push(pro);
        }

        setProjects(projs);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message);
      });
    setLoading(false);
  };

  const getFund = async () => {
    setLoading(true);
    await axiosClient
      .get(`/funds/${id}`)
      .then((res) => {
        setLoading(false);
        setFund(res?.data?.fund);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message);
      });
  };

  const changeInvestor = async (e) => {
    const investor = e.value;
    setFund({ ...fund, investor: investor });
  };

  const changeProject = async (e) => {
    const project = e.value;
    setFund({ ...fund, project: project });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (id) {
      setSaveLoad(true);
      await axiosClient
        .put(`/funds/${id}`, fund)
        .then((res) => {
          setSaveLoad(false);
          toast.success(res?.data?.message);
          navigate("/admin/funds");
        })
        .catch((err) => {
          setSaveLoad(false);
          toast.error(err?.response?.data?.message);
        });
    } else {
      setSaveLoad(true);
      await axiosClient
        .post("/funds", fund)
        .then((res) => {
          setSaveLoad(false);
          toast.success(res?.data?.message);
          navigate("/admin/funds");
        })
        .catch((err) => {
          console.log(err);
          setSaveLoad(false);
          toast.error(err?.response?.data?.message);
        });
    }
  };

  if (id) {
    useEffect(() => {
      getData();
      getFund();
    }, []);
  } else {
    useEffect(() => {
      getData();
    }, []);
  }
  return (
    <div className="p-3 w-full">
      {/* <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold mb-3 text-[rgba(0,223,154,0.65)]">
          Add Fund
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="text-red-500 p-1 border-2 rounded-full border-red-500"
        >
          <BiArrowBack size={20} className="" />
        </button>
      </div> */}
      {loading ? (
        <CustomLoader />
      ) : (
        <div className="m-5 p-4 w-[500px] mx-auto border">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">
              {fund._id ? "Edit Fund" : "Add Fund"}
            </h2>
            <button
              onClick={() => navigate("/admin/funds")}
              className="self-end"
            >
              <GrFormClose size={25} />
            </button>
          </div>
          <form>
            <div className="flex flex-col mb-2">
              <label htmlFor="" className="mb-1">
                Amount
              </label>
              <input
                type="text"
                value={fund.amount}
                className="border p-2"
                placeholder="Enter amount"
                onChange={(e) => setFund({ ...fund, amount: e.target.value })}
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="">Investor</label>
              <Select
                options={investors}
                isClearable={true}
                isDisabled={id ? true : false}
                isSearchable={true}
                onChange={changeInvestor}
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="">Project</label>
              <Select
                options={projects}
                isClearable={true}
                isSearchable={true}
                isDisabled={id ? true : false}
                onChange={changeProject}
              />
            </div>
            <button
              type="submit"
              className="bg-[rgb(0,223,154)] py-2 w-full text-white"
              onClick={submitHandler}
            >
              {saveLoad ? "...Loading" : fund._id ? "Edit Fund" : "Add Fund"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FundsForm;
