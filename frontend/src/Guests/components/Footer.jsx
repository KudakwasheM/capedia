import React from "react";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Link } from "react-router-dom";

const Footer = () => {
  const date = new Date();
  return (
    <div className="w-full bg-[rgb(0,223,154)]">
      <div className="max-w-[1200px] mx-auto py-10 px-5">
        <div className="flex flex-col sm:grid grid-cols-4 gap-5 border-b">
          <div className="col-span-3  sm:py-10">
            <h1 className="text-white text-5xl font-bold">Capidea.</h1>
          </div>
          <div className="flex justify-around items-center py-2 col-span-1">
            <div className="bg-white p-2 rounded-full">
              <AiOutlineFacebook size={30} className="text-[rgb(0,223,154)]" />
            </div>
            <div className="bg-white p-2 rounded-full">
              <AiOutlineInstagram size={30} className="text-[rgb(0,223,154)]" />
            </div>
            <div className="bg-white p-2 rounded-full">
              <AiOutlineTwitter size={30} className="text-[rgb(0,223,154)]" />
            </div>
            <div className="bg-white p-2 rounded-full">
              <AiOutlineLinkedin size={30} className="text-[rgb(0,223,154)]" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 justify-between md:grid grid-cols-3 text-white py-5">
          <div className="flex flex-col">
            <h2 className="text-lg mb-3">Navigation</h2>
            <Link className="text-sm">About Us</Link>
            <Link className="text-sm">Contact Us</Link>
            <Link className="text-sm">Testimonials</Link>
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg mb-3">Enterpreneurs & Investors</h2>
            <Link className="text-sm">Register</Link>
            <Link className="text-sm">Proposals</Link>
            <Link className="text-sm">Investors</Link>
          </div>
          <div></div>
        </div>
        <div className="flex sm:flex-row flex-col gap-5 justify-between py-5 text-white text-sm">
          <Link to="/terms" className="">
            Terms and conditions
          </Link>
          <p>
            &copy; {date.getFullYear()} Capidea - Connecting Great Minds and
            Awesome Investors
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
