"use client";
import Brain from "@/components/brain";
import { motion, useInView, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const AboutPage = () => {
  const containerRef = useRef();

  const { scrollYProgress } = useScroll({ container: containerRef });

  const skillRef = useRef();
  // const isSkillRefInView = useInView(skillRef, {once:true});
  const isSkillRefInView = useInView(skillRef, { margin: "-100px" });

  const experienceRef = useRef();
  const isExperienceRefInView = useInView(experienceRef, { margin: "-100px" });

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
          {/* BIOGRAPHY CONTAINER */}
          <div className="flex flex-col gap-12 justify-center">
            {/* BIOGRAPHY IMAGE */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              <Image
                src="/krishna.jpeg"
                alt=""
                width={112}
                height={112}
                className="w-28 h-28 rounded-full object-cover shadow-lg shadow-sky-900/30"
              />
            </motion.div>
            {/* BIOGRAPHY TITLE */}
            <motion.h1
              className="font-bold text-2xl text-sky-300"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}>
              BIOGRAPHY
            </motion.h1>
            {/* BIOGRAPHY DESC */}
            <p className="text-lg text-justify text-slate-300">
              Skilled in Java, Node JS, Spring Frameworks, Serverless, REACT JS,
              Nest JS, Three.JS, JSP, JavaScript, MySQL, MSSQL, and MongoDB.
              Thorough knowledge of agile methodologies and AWS fundamentals I
              am always looking for new opportunities in my field of interest so
              would be immensely thankful for any emails or messages concerning
              them. Thank you!.
            </p>
            {/* BIOGRAPHY QUOTE */}
            <span className="italic text-slate-300">
              Most powerful motiviation is rejection.
            </span>
            {/* BIOGRAPHY SIGN SVG*/}
            <div className="self-end">
              <p>Krishnamohan Ramachandran</p>
            </div>
            {/* BIOGRAPHY SCROLL SVG */}
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
          {/* SKILLS CONTAINER */}
          <div className="flex flex-col gap-12 justify-center" ref={skillRef}>
            {/* SKILL TITLE */}
            <motion.h1
              initial={{ x: "-300px" }}
              animate={isSkillRefInView ? { x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="font-bold text-2xl text-sky-300">
              SKILLS
            </motion.h1>
            {/* SKILL LIST */}
            <motion.div
              initial={{ x: "-300px" }}
              animate={isSkillRefInView ? { x: 0 } : {}}
              className="flex gap-4 flex-wrap">
              <div className="rounded p-2 text-sm cursor-pointer bg-white/10 text-slate-100 hover:bg-white/20 backdrop-blur-sm border border-white/10">
                JavaScript
              </div>
              <div className="rounded p-2 text-sm cursor-pointer bg-white/10 text-slate-100 hover:bg-white/20 backdrop-blur-sm border border-white/10">
                TypeScript
              </div>
              <div className="rounded p-2 text-sm cursor-pointer bg-white/10 text-slate-100 hover:bg-white/20 backdrop-blur-sm border border-white/10">
                React.js
              </div>
              <div className="rounded p-2 text-sm cursor-pointer bg-white/10 text-slate-100 hover:bg-white/20 backdrop-blur-sm border border-white/10">
                Next.js
              </div>
              <div className="rounded p-2 text-sm cursor-pointer bg-white/10 text-slate-100 hover:bg-white/20 backdrop-blur-sm border border-white/10">
                SCSS
              </div>
              <div className="rounded p-2 text-sm cursor-pointer bg-white/10 text-slate-100 hover:bg-white/20 backdrop-blur-sm border border-white/10">
                Tailwind CSS
              </div>
              <div className="rounded p-2 text-sm cursor-pointer bg-white/10 text-slate-100 hover:bg-white/20 backdrop-blur-sm border border-white/10">
                MongoDB
              </div>
              <div className="rounded p-2 text-sm cursor-pointer bg-white/10 text-slate-100 hover:bg-white/20 backdrop-blur-sm border border-white/10">
                PostgreSQL
              </div>
              <div className="rounded p-2 text-sm cursor-pointer bg-white/10 text-slate-100 hover:bg-white/20 backdrop-blur-sm border border-white/10">
                Node.js
              </div>
              <div className="rounded p-2 text-sm cursor-pointer bg-white/10 text-slate-100 hover:bg-white/20 backdrop-blur-sm border border-white/10">
                Nest.js
              </div>
              <div className="rounded p-2 text-sm cursor-pointer bg-white/10 text-slate-100 hover:bg-white/20 backdrop-blur-sm border border-white/10">
                Express.js
              </div>
              <div className="rounded p-2 text-sm cursor-pointer bg-white/10 text-slate-100 hover:bg-white/20 backdrop-blur-sm border border-white/10">
                GraphQL
              </div>
              <div className="rounded p-2 text-sm cursor-pointer bg-white/10 text-slate-100 hover:bg-white/20 backdrop-blur-sm border border-white/10">
                Apollo
              </div>
              <div className="rounded p-2 text-sm cursor-pointer bg-white/10 text-slate-100 hover:bg-white/20 backdrop-blur-sm border border-white/10">
                Redux
              </div>
              <div className="rounded p-2 text-sm cursor-pointer bg-white/10 text-slate-100 hover:bg-white/20 backdrop-blur-sm border border-white/10">
                Framer Motion
              </div>
              <div className="rounded p-2 text-sm cursor-pointer bg-white/10 text-slate-100 hover:bg-white/20 backdrop-blur-sm border border-white/10">
                Three.js
              </div>
              <div className="rounded p-2 text-sm cursor-pointer bg-white/10 text-slate-100 hover:bg-white/20 backdrop-blur-sm border border-white/10">
                Webpack
              </div>
              <div className="rounded p-2 text-sm cursor-pointer bg-white/10 text-slate-100 hover:bg-white/20 backdrop-blur-sm border border-white/10">
                Vite
              </div>
              <div className="rounded p-2 text-sm cursor-pointer bg-white/10 text-slate-100 hover:bg-white/20 backdrop-blur-sm border border-white/10">
                Docker
              </div>
              <div className="rounded p-2 text-sm cursor-pointer bg-white/10 text-slate-100 hover:bg-white/20 backdrop-blur-sm border border-white/10">
                AWS
              </div>
              <div className="rounded p-2 text-sm cursor-pointer bg-white/10 text-slate-100 hover:bg-white/20 backdrop-blur-sm border border-white/10">
                Firebase
              </div>
              <div className="rounded p-2 text-sm cursor-pointer bg-white/10 text-slate-100 hover:bg-white/20 backdrop-blur-sm border border-white/10">
                Git
              </div>
              <div className="rounded p-2 text-sm cursor-pointer bg-white/10 text-slate-100 hover:bg-white/20 backdrop-blur-sm border border-white/10">
                Figma
              </div>
            </motion.div>
            {/* SKILL SCROLL SVG */}
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
          {/* EXPERIENCE CONTAINER */}
          <div
            className="flex flex-col gap-12 justify-center pb-48"
            ref={experienceRef}>
            {/* EXPERIENCE TITLE */}
            <motion.h1
              initial={{ x: "-300px" }}
              animate={isExperienceRefInView ? { x: "0" } : {}}
              transition={{ delay: 0.2 }}
              className="font-bold text-2xl text-sky-300">
              EXPERIENCE
            </motion.h1>
            {/* EXPERIENCE LIST */}
            <motion.div
              initial={{ x: "-300px" }}
              animate={isExperienceRefInView ? { x: "0" } : {}}
              className="">
              {/* EXPERIENCE LIST ITEM */}
              <motion.div
                className="flex justify-between h-48"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}>
                {/* LEFT */}
                <div className="w-1/3 ">
                  {/* JOB TITLE */}
                  <div className="bg-white/10 border border-white/10 backdrop-blur-sm p-3 font-semibold rounded-b-lg rounded-s-lg">
                    Senior Software Engineer
                  </div>
                  {/* JOB DESC */}
                  <div className="p-3 text-sm italic text-slate-300">
                    Smart Audio Capture: Unlocking Efficiency at Scale for a
                    Regtech Client
                  </div>
                  {/* JOB DATE */}
                  <div className="p-3 text-sky-400 text-sm font-semibold">
                    2024 - Present
                  </div>
                  {/* JOB COMPANY */}
                  <div className="p-1 rounded bg-white/10 border border-white/10 text-sm font-semibold w-fit">
                    Insighture
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
                {/* RIGHT */}
                <div className="w-1/3 "></div>
              </motion.div>
              {/* EXPERIENCE LIST ITEM */}
              <motion.div
                className="flex justify-between h-48"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.05 }}>
                {/* LEFT */}
                <div className="w-1/3 "></div>
                {/* CENTER */}
                <div className="w-1/6 flex justify-center">
                  {/* LINE */}
                  <div className="w-1 h-full bg-slate-600 rounded relative">
                    {/* LINE CIRCLE */}
                    <div className="absolute w-5 h-5 rounded-full ring-4 ring-sky-400 bg-white -left-2"></div>
                  </div>
                </div>
                {/* RIGHT */}
                <div className="w-1/3 ">
                  {/* JOB TITLE */}
                  <div className="bg-white/10 border border-white/10 backdrop-blur-sm p-3 font-semibold rounded-b-lg rounded-s-lg">
                    Senior Software Engineer
                  </div>
                  {/* JOB DESC */}
                  <div className="p-3 text-sm italic text-slate-300">
                    Worked for a Legtech client in Australia.
                  </div>
                  {/* JOB DATE */}
                  <div className="p-3 text-sky-400 text-sm font-semibold">
                    2023 - 2023{" "}
                  </div>
                  {/* JOB COMPANY */}
                  <div className="p-1 rounded bg-white/10 border border-white/10 text-sm font-semibold w-fit">
                    ItelaSoft
                  </div>
                </div>
              </motion.div>
              {/* EXPERIENCE LIST ITEM */}
              <motion.div
                className="flex justify-between h-48"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}>
                {/* LEFT */}
                <div className="w-1/3 ">
                  {/* JOB TITLE */}
                  <div className="bg-white/10 border border-white/10 backdrop-blur-sm p-3 font-semibold rounded-b-lg rounded-s-lg">
                    Software Engineer
                  </div>
                  {/* JOB DESC */}
                  <div className="p-3 text-sm italic text-slate-300">
                    A subsidiary of Swivel Group, Swivel Tech is an
                    Australian-based Technology firm that specializes in
                    Software Development.
                  </div>
                  {/* JOB DATE */}
                  <div className="p-3 text-sky-400 text-sm font-semibold">
                    2022 - 2023{" "}
                  </div>
                  <div className="p-1 rounded bg-white text-sm font-semibold w-fit">
                    Swivel Tech
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
                {/* RIGHT */}
                <div className="w-1/3 "></div>
              </motion.div>
              <div className="flex justify-between h-48">
                {/* LEFT */}
                <div className="w-1/3 "></div>
                {/* CENTER */}
                <div className="w-1/6 flex justify-center">
                  {/* LINE */}
                  <div className="w-1 h-full bg-slate-600 rounded relative">
                    {/* LINE CIRCLE */}
                    <div className="absolute w-5 h-5 rounded-full ring-4 ring-sky-400 bg-white -left-2"></div>
                  </div>
                </div>
                {/* RIGHT */}
                <div className="w-1/3 ">
                  {/* JOB TITLE */}
                  <div className="bg-white/10 border border-white/10 backdrop-blur-sm p-3 font-semibold rounded-b-lg rounded-s-lg">
                    Full Stack Engineer
                  </div>
                  {/* JOB DESC */}
                  <div className="p-3 text-sm italic text-slate-300">
                    Worked for a Food Tech client in Singapore.
                  </div>
                  {/* JOB DATE */}
                  <div className="p-3 text-sky-400 text-sm font-semibold">
                    2021 - 2022{" "}
                  </div>
                  {/* JOB COMPANY */}
                  <div className="p-1 rounded bg-white/10 border border-white/10 text-sm font-semibold w-fit">
                    EatMe Singapore
                  </div>
                </div>
              </div>
              <div className="flex justify-between h-48">
                {/* LEFT */}
                <div className="w-1/3 ">
                  {/* JOB TITLE */}
                  <div className="bg-white/10 border border-white/10 backdrop-blur-sm p-3 font-semibold rounded-b-lg rounded-s-lg">
                    Freelance Software Engineer
                  </div>
                  {/* JOB DESC */}
                  <div className="p-3 text-sm italic text-slate-300">
                    Worked for UAE client for web based projects.
                  </div>
                  {/* JOB DATE */}
                  <div className="p-3 text-sky-400 text-sm font-semibold">
                    2021 - 2021
                  </div>
                  {/* JOB COMPANY */}
                  <div className="p-1 rounded bg-white/10 border border-white/10 text-sm font-semibold w-fit">
                    Freelance
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
                {/* RIGHT */}
                <div className="w-1/3 "></div>
              </div>
              <div className="flex justify-between h-48">
                {/* LEFT */}
                <div className="w-1/3 "></div>
                {/* CENTER */}
                <div className="w-1/6 flex justify-center">
                  {/* LINE */}
                  <div className="w-1 h-full bg-slate-600 rounded relative">
                    {/* LINE CIRCLE */}
                    <div className="absolute w-5 h-5 rounded-full ring-4 ring-sky-400 bg-white -left-2"></div>
                  </div>
                </div>
                {/* RIGHT */}
                <div className="w-1/3 ">
                  {/* JOB TITLE */}
                  <div className="bg-white/10 border border-white/10 backdrop-blur-sm p-3 font-semibold rounded-b-lg rounded-s-lg">
                    Internship
                  </div>
                  {/* JOB DESC */}
                  <div className="p-3 text-sm italic text-slate-300">
                    Worked for a health tech project in Australia.
                  </div>
                  {/* JOB DATE */}
                  <div className="p-3 text-sky-400 text-sm font-semibold">
                    2020 - 2020{" "}
                  </div>
                  {/* JOB COMPANY */}
                  <div className="p-1 rounded bg-white/10 border border-white/10 text-sm font-semibold w-fit">
                    Mitra Innovation
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        {/* SVG CONTAINER */}
        <div className="hidden lg:block w-1/3 sticky top-0 z-30 xl:w-1/2">
          <Brain scrollYProgress={scrollYProgress} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutPage;
