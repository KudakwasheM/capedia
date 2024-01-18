import React, { useEffect, useState } from "react";
import CustomLoader from "../../Guests/components/CustomLoader";
import axiosClient from "../../axiosClient";
import { useSelector } from "react-redux";

const MyFunds = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFunds = async () => {
    setLoading(true);
    await axiosClient.get(`/enterpreneur/${userInfo._id}/funds`).then((res) => {
      setFunds(fundsResponse?.data?.funds);
    });
  };

  useEffect(() => {
    getFunds();
  }, []);
  return (
    <div>
      <>
        {loading ? (
          <CustomLoader />
        ) : (
          <div className="bg-white p-3 w-full">
            <div className="flex mb-3">
              <h2 className="text-3xl font-semibold text-[rgb(0,223,154)]">
                My Funds
              </h2>
            </div>
            <div className="my-5 p-5 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
              <table className="w-full p-5">
                <thead className="px-5">
                  <th className="text-start py-2 ">Amount</th>
                  <th className="text-start py-2 ">Project</th>
                  <th className="text-start py-2 ">Percentage</th>
                  <th className="text-start py-2 ">Investor</th>
                  <th className="text-start py-2 ">Created On</th>
                </thead>
                <tbody>
                  {funds.length > 0 ? (
                    <>
                      {funds.map((fund) => {
                        return (
                          <tr className="border-t">
                            <td className="py-3">{fund.amount}</td>
                            <td className="py-3">{fund.project.name}</td>
                            <td className="py-3">
                              {fund.project_percentage.toFixed(2)}%
                            </td>
                            <td className="py-3">{fund.investor.name}</td>
                            <td className="py-3">
                              {moment(fund.createdAt).format("LL")}
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    <tr cols={5} className="text-center text-red-500">
                      No Funds Found
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default MyFunds;
