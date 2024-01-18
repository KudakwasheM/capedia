import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosClient from "../../axiosClient";
import CustomLoader from "../../Guests/components/CustomLoader";
import { toast } from "react-toastify";

const MyInvestors = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(false);

  const getInvestors = async () => {
    setLoading(true);
    await axiosClient
      .get(`/enterpreneur/${userInfo._id}/investors`)
      .then((res) => {
        setLoading(false);
        setInvestors(res?.data?.investors);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    getInvestors();
  }, []);
  return (
    <>
      {loading ? (
        <CustomLoader />
      ) : (
        <div className="bg-white p-3 w-full">
          <div className="flex mb-3">
            <h2 className="text-3xl font-semibold text-[rgb(0,223,154)]">
              My Investors
            </h2>
          </div>
          <div className="my-5 p-5 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
            <table className="w-full p-5">
              <thead className="px-5">
                <th className="text-start py-2 ">Name</th>
                <th className="text-start py-2 ">Project</th>
                <th className="text-start py-2 ">Percentage</th>
                <th className="text-start py-2 ">Investor</th>
                <th className="text-start py-2 ">Created On</th>
              </thead>
              <tbody>
                {investors.length > 0 ? (
                  <>
                    {investors.map((investor) => {
                      return (
                        <tr className="border-t">
                          <td className="py-3">{investor.amount}</td>
                          <td className="py-3">{investor.role}</td>
                          {/* <td className="py-3">
                            {investor.project_percentage.toFixed(2)}%
                          </td> */}
                          <td className="py-3">{investor.name}</td>
                          {/* <td className="py-3">
                            {moment(investor.createdAt).format("LL")}
                          </td> */}
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <tr cols={5} className="text-red-500">
                    No investors found
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default MyInvestors;
