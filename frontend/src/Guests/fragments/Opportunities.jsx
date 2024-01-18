import React from "react";
import { Link } from "react-router-dom";

const Opportunities = () => {
  return (
    <div className="py-10 max-w-[1200px] mx-auto">
      <h2 className="text-3xl font-semibold mb-3 text-center">
        Opportunities To Invest In
      </h2>
      <p className="text-center mb-5">
        We connect investors with startups and businesses from all sectors to
        ensure the relationship is valuable to both parties.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 lg:mx-20 my-10">
        <Link
          to={`/proposals?opportunity=agriculture`}
          className="opp farm hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
        >
          Agriculture
        </Link>
        <Link
          to={`/proposals?opportunity=mining`}
          className="opp mine hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
        >
          Mining
        </Link>
        <Link
          to={`/proposals?opportunity=technology`}
          className="opp soft hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
        >
          Technology
        </Link>
        <Link
          to={`/proposals?opportunity=food`}
          className="opp food hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
        >
          Food
        </Link>
        <Link
          to={`/proposals?opportunity=education`}
          className="opp edu hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
        >
          Education
        </Link>
        <Link
          to={`/proposals?opportunity=health`}
          className="opp med hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
        >
          Health
        </Link>
      </div>
    </div>
  );
};

export default Opportunities;
