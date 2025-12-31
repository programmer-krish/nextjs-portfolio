"use client";

import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import RubiksCube3D from "@/components/RubiksCube3D";
import Snowfall from "react-snowfall"; // Import the Snowfall component
import { useTheme } from "@/context/ThemeContext";

// A container variant for staggering child animations
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Adds a small delay between each child animating in
    },
  },
};

// A variant for individual text/element fade-in-from-bottom animation
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const handleEmailClick = () => {
  const email = "rkrishnamohan96@gmail.com";
  const subject = encodeURIComponent("Inquiry from your Portfolio");
  const emailBody = encodeURIComponent(
    "Hello Krishnamohan,\n\nI saw your portfolio and would like to connect.\n\nBest regards,"
  );
  window.open(`mailto:${email}?subject=${subject}&body=${emailBody}`);
};

const Homepage = () => {
  const [textColor, setTextColor] = useState("#d96c23");
  const { theme } = useTheme();

  const backgroundClass =
    theme === "black"
      ? "absolute inset-0 bg-black"
      : "absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]";

  return (
    <motion.div
      className="h-full relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}>
      <motion.div
        className={backgroundClass}
        animate={
          theme !== "black"
            ? {
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }
            : {}
        }
        transition={{
          duration: 15,
          repeat: theme !== "black" ? Infinity : 0,
          ease: "linear",
        }}
        style={{
          backgroundSize: theme !== "black" ? "200% 200%" : "100% 100%",
          zIndex: 0,
        }}
      />

      {/* Add the Snowfall component here - only show in default theme */}
      {theme !== "black" && (
        <Snowfall
          // The color of the snowflake.
          color="#dee4eb"
          style={{ position: "fixed", width: "100vw", height: "100vh" }}
          snowflakeCount={250}
        />
      )}
      <div className="relative z-10 h-full flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48">
        {/* {Image container} */}
        <motion.div
          className="h-1/2 lg:h-full lg:w-1/2 relative"
          initial={{ x: "-100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}>
          <RubiksCube3D />
        </motion.div>
        {/* {Text container} */}
        <motion.div
          className="h-1/2 lg:h-full lg:w-1/2 flex flex-col gap-8 items-center justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="show">
          {/* {Title} */}
          <motion.div variants={itemVariants}>
            {textColor ? (
              <h1 // Changed to h1 for semantic SEO benefits
                className="text-4xl md:text-6xl font-bold text-center lg:text-left"
                style={{ color: textColor }}>
                <TypeAnimation
                  sequence={[
                    "Krishnamohan Ramachandran.",
                    1000,
                    () => setTextColor("#9e8f67"),
                    "கிருஷ்ணமோகன் ராமச்சந்திரன்.",
                    1000,
                    () => setTextColor("#695c0d"),
                    "ක්‍රිෂ්ණමෝහන් රාම්චන්ද්‍රන්.",
                    1000,
                    () => setTextColor("#1b4a1f"),
                    "Software Engineer.",
                    1000,
                    () => setTextColor("#a70ec9"),
                    "Full Stack Developer.",
                    1000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </h1>
            ) : (
              <h1 className="text-4xl md:text-6xl font-bold text-center lg:text-left">
                Krishnamohan Ramachandran
              </h1>
            )}
          </motion.div>

          {/* {Desc} */}
          <motion.p
            className={`md:text-xl text-justify ${
              theme === "black" ? "text-white" : "text-[#d1d5db]"
            }`}
            variants={itemVariants}>
            As a versatile developer, I craft dynamic and user-focused web and
            mobile applications that deliver seamless performance. I&apos;m
            experienced in building and deploying scalable systems on AWS and
            Azure, ensuring reliability, security, and efficiency. My goal is to
            blend clean code with smart cloud architecture—turning ideas into
            powerful digital experiences that perform flawlessly at scale.
          </motion.p>

          {/* {Buttons} */}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Homepage;
