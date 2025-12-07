"use client";
import { motion, useInView, useScroll } from "framer-motion";
import { useRef } from "react";
import AcademicCanvas from "@/components/AcademicScene";

const AcademicPage = () => {
  const containerRef = useRef();
  const { scrollYProgress } = useScroll({ container: containerRef });

  const educationRef = useRef();
  const isEducationRefInView = useInView(educationRef, { margin: "-100px" });

  // Education data from CV
  const education = [
    {
      id: 1,
      degree: "Master of Science in Project Management",
      institution: "University of Bedfordshire",
      year: "2023",
      description:
        "Advanced studies in project management methodologies, strategic planning, and organizational leadership.",
    },
    {
      id: 2,
      degree: "Bachelor of Science in Computing",
      institution: "London Metropolitan University",
      year: "2022",
      description:
        "Comprehensive computing degree covering software development, system design, and modern programming paradigms.",
    },
    {
      id: 3,
      degree: "Higher National Diploma in Computing and Systems Development",
      institution: "Pearson | Colombo",
      year: "2018",
      description:
        "Diploma focusing on practical computing skills, system development, and foundational programming concepts.",
    },
    {
      id: 4,
      degree: "G.C.E O/L & G.C.E A/L",
      institution: "Bambalapitiya Hindu College | Colombo",
      year: "2015",
      description:
        "Secondary education foundation with emphasis on science and mathematics.",
    },
  ];

  return (
    <motion.div
      className="h-full relative overflow-hidden"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 200%", zIndex: 0 }}
      />
      {/* CONTAINER */}
      <motion.div
        className="h-full overflow-scroll lg:flex relative z-10 text-slate-100"
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}>
        {/* TEXT CONTAINER */}
        <div className="p-4 sm:p-8 md:p-12 lg:p-20 xl:p-48 flex flex-col gap-24 md:gap-32 lg:gap-48 xl:gap-64 lg:w-2/3 lg:pr-0 xl:w-1/2">
          {/* TITLE CONTAINER */}
          <div className="flex flex-col gap-12 justify-center">
            {/* TITLE */}
            <motion.h1
              className="font-bold text-4xl md:text-5xl text-sky-300"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}>
              ACADEMIC QUALIFICATIONS
            </motion.h1>
            {/* SUBTITLE */}
            <motion.p
              className="text-lg text-justify text-slate-300"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}>
              A journey of continuous learning and academic excellence, building
              a strong foundation in computing and project management.
            </motion.p>
            {/* SCROLL SVG */}
            <motion.svg
              initial={{ opacity: 0.2, y: 0 }}
              animate={{ opacity: 1, y: "10px" }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width={50}
              height={50}>
              <path
                d="M5 15C5 16.8565 5.73754 18.6371 7.05029 19.9498C8.36305 21.2626 10.1435 21.9999 12 21.9999C13.8565 21.9999 15.637 21.2626 16.9498 19.9498C18.2625 18.6371 19 16.8565 19 15V9C19 7.14348 18.2625 5.36305 16.9498 4.05029C15.637 2.73754 13.8565 2 12 2C10.1435 2 8.36305 2.73754 7.05029 4.05029C5.73754 5.36305 5 7.14348 5 9V15Z"
                stroke="#e5e7eb"
                strokeWidth="1"></path>
              <path d="M12 6V14" stroke="#e5e7eb" strokeWidth="1"></path>
              <path
                d="M15 11L12 14L9 11"
                stroke="#e5e7eb"
                strokeWidth="1"></path>
            </motion.svg>
          </div>

          {/* EDUCATION CONTAINER */}
          <div
            className="flex flex-col gap-12 justify-center pb-48"
            ref={educationRef}>
            {/* EDUCATION TITLE */}
            <motion.h1
              initial={{ x: "-300px" }}
              animate={isEducationRefInView ? { x: "0" } : {}}
              transition={{ delay: 0.2 }}
              className="font-bold text-2xl text-sky-300">
              EDUCATION
            </motion.h1>
            {/* EDUCATION LIST */}
            <motion.div
              initial={{ x: "-300px" }}
              animate={isEducationRefInView ? { x: "0" } : {}}
              className="">
              {/* EDUCATION ITEMS */}
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  className={`flex justify-between h-auto min-h-[200px] mb-8 ${
                    index % 2 === 0 ? "" : "flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}>
                  {/* LEFT/RIGHT CONTENT */}
                  <div className="w-1/3">
                    {/* DEGREE */}
                    <div className="bg-white/10 border border-white/10 backdrop-blur-sm p-4 font-semibold rounded-b-lg rounded-s-lg">
                      {edu.degree}
                    </div>
                    {/* INSTITUTION */}
                    <div className="p-3 text-sm italic text-slate-300">
                      {edu.institution}
                    </div>
                    {/* YEAR */}
                    <div className="p-3 text-sky-400 text-sm font-semibold">
                      {edu.year}
                    </div>
                    {/* DESCRIPTION */}
                    <div className="p-3 text-xs text-slate-400">
                      {edu.description}
                    </div>
                  </div>
                  {/* CENTER */}
                  <div className="w-1/6 flex justify-center">
                    {/* LINE */}
                    <div className="w-1 h-full bg-slate-600 rounded relative">
                      {/* LINE CIRCLE */}
                      <div className="absolute w-5 h-5 rounded-full ring-4 ring-sky-400 bg-white -left-2"></div>
                    </div>
                  </div>
                  {/* RIGHT/LEFT EMPTY */}
                  <div className="w-1/3"></div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        {/* 3D SCENE CONTAINER */}
        <div className="hidden lg:block w-1/3 sticky top-0 z-30 xl:w-1/2">
          <motion.div
            className="relative w-full h-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}>
            <AcademicCanvas />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AcademicPage;

