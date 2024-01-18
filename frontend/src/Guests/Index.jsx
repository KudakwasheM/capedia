import React from "react";
import Hero from "./fragments/Hero";
import Projects from "./fragments/Projects";
import Investors from "./fragments/Investors";
import Opportunities from "./fragments/Opportunities";
import Testimonials from "./fragments/Testimonials";

const Index = () => {
  return (
    <div className="w-full">
      <Hero />
      <Projects />
      <Investors />
      <Opportunities />
      <Testimonials />
    </div>
  );
};

export default Index;
