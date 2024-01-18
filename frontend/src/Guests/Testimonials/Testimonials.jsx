import React, { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";

const Testimonials = () => {
  const { testimonials } = useOutletContext();
  const [newArray, setNewArray] = useState([]);
  // const [testimonials, setTestimonials] = useState([]);
  // const [hex, setHex] = useState("#ffffff");
  // const [loading, setLoading] = useState(false);

  // const getTestimonials = async () => {
  //   setLoading(true);
  //   await axiosClient
  //     .get("/testimonials")
  //     .then((res) => {
  //       setTestimonials(res?.data?.testimonials);
  //       randomizeColor(res?.data?.testimonials);
  //     })
  //     .catch((err) => {
  //       toast.error(err?.response?.data?.message);
  //     });
  // };

  const randomizeColor = (data) => {
    const d = [];
    for (let i = 0; i < data.length; i++) {
      const randomColor =
        "#" + Math.floor(Math.random() * 16777215).toString(16);
      data[i].color = randomColor;
      d.push(data[i]);
    }
    setNewArray(d);
  };

  useEffect(() => {
    // getTestimonials();
    randomizeColor(testimonials);
  }, []);

  return (
    <div>
      <div className="sub-hero w-full">
        <div className="h-full bg-[rgba(0,0,0,0.4)]">
          <div className="flex flex-col items-center justify-around h-full lg:w-[800px] mx-auto text-white text-center py-14 px-5">
            <h1 className="text-5xl text-[rgb(0,223,154)] font-bold">
              Testimonials
            </h1>
            <p className="">
              With a drive to create relations between enterpreneurs and
              bussiness people. We aim to raise funds for start-ups. Have a read
              on some of our happy connects.
            </p>
          </div>
        </div>
      </div>
      <div className="lg:max-w-[1200px] lg:w-[1200px] columns-1 sm:columns-2 md:columns-3 gap-5 space-y-3 mx-auto px-5 lg:px-24 py-10 text-center">
        {/* <div className="lg:max-w-[1200px] lg:w-[1200px] grid grid-cols-3 gap-5 mx-auto px-5 lg:px-24 py-10 text-center"> */}
        {newArray.length > 0 ? (
          <>
            {newArray.map((testimonial) => {
              let objectColor = testimonial.color;
              return (
                <div className="flex flex-col border rounded-lg bg-white p-5 break-inside-avoid">
                  <div className="mx-auto">
                    <div
                      className="h-24 w-24 rounded-full p-1 border-2 border-[rgb(0,223,154)]"
                      style={{ backgroundColor: `${objectColor}` }}
                    ></div>
                  </div>
                  <div className="mt-5">
                    <h2 className="font-semibold mb-2">{testimonial.name}</h2>

                    <p className="text-gray-700">{testimonial.testimonial}</p>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Testimonials;
