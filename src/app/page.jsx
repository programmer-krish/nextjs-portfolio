"use client";

import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import EarthCanvas from "@/components/Earth";

export const slideIn = (direction, type, delay, duration) => {
  return {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type: type,
        delay: delay,
        duration: duration,
        ease: "easeOut",
      },
    },
  };
};

const handleEmailClick = () => {
  const email = "rkrishnamohan96@gmail.com";
  const subject = encodeURIComponent("Subject Line Here"); // Optional: Predefine a subject
  const emailBody = encodeURIComponent("Hello Krishnamohan,"); // Optional: Predefine an email body
  window.open(`mailto:${email}?subject=${subject}&body=${emailBody}`);
};

const Homepage = () => {
  const [textColor, setTextColor] = useState("#d96c23");

  return (
    <motion.div
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}>
      <div className="h-full flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48">
        {/* {Image contianer} */}
        <div className="h-1/2 lg:h-full lg:w-1/2 relative">
          <EarthCanvas />
        </div>
        {/* {Text contianer} */}
        <div className="h-1/2 lg:h-full lg:w-1/2 flex flex-col gap-8 items-center justify-center">
          {/* {Title} */}
          {textColor ? (
            <p
              className="mt-6 text-4xl md:text-6xl md:mt-0 font-bold text-justify"
              style={{ color: textColor }}>
              <TypeAnimation
                sequence={[
                  "Krishnamohan Ramachandran.",
                  1000,
                  () => setTextColor("#9e8f67"),
                  "கிருஷ்ணமோகன் ராமச்சந்திரன்.",
                  1000,
                  () => setTextColor("#695c0d"),
                  "ක්‍රිෂ්ණමෝහන් රාම්චන්ද්‍රන්.",
                  1000,
                  () => setTextColor("#1b4a1f"),
                  "Software Engineer.",
                  1000,
                  () => setTextColor("#a70ec9"),
                  "Full Stack Developer.",
                ]}
                repeat={Infinity}
              />
            </p>
          ) : (
            <p className="mt-6 text-4xl md:text-6xl md:mt-0 font-bold text-justify">
              Krishnamohan Ramachandran
            </p>
          )}

          {/* {Desc} */}
          <p className="md:text-xl text-justify">
            As a versatile developer, I specialize in creating seamless web and
            mobile applications.My expertise extends to cloud environments,
            particularly AWS and Azure, where I design and deploy scalable,
            secure infrastructure. This blend of skills ensures efficient,
            robust solutions that leverage the best of modern technology for
            optimal performance and user experience.
          </p>
          <div className="w-full flex gap-4">
            <a
              href="/Krishnamohan Ramachandran CV 2023- Updated.pdf"
              download="Krishnamohan_Ramachandran_CV_2023_Updated.pdf"
              className="p-4 rounded-lg ring-1 ring-black bg-black text-white inline-flex items-center justify-center">
              View My Resume
            </a>
            <button
              className="p-4 rounded-lg ring-1 ring-black"
              onClick={handleEmailClick}>
              Ping Me
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Homepage;
