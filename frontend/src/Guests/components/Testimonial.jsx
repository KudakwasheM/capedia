import React, { useEffect, useState } from "react";

const Testimonial = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideTestimonial = () => {
    setTimeout(() => {
      const isLast = currentIndex === slides.length - 1;
      const index = isLast ? 0 : currentIndex + 1;
      setCurrentIndex(index);
    }, 5000);
  };

  useEffect(() => {
    slideTestimonial();
  }, [currentIndex]);

  return (
    <div className="text-center max-w-[500px] mx-auto">
      <div className="p-5">
        <img
          src=""
          alt=""
          className="h-24 w-24 rounded-full p-1 border-2 border-[rgb(0,223,154)] mx-auto mb-5"
        />
        <h2 className="text-xl mb-5">{slides[currentIndex].name}</h2>
        <p className="">
          {slides[currentIndex].testimonial.split(" ").splice(0, 50).join(" ")}
          ...
        </p>
      </div>
    </div>
  );
};

export default Testimonial;
