"use client";
import Brain from "@/components/brain";
import { motion, useInView, useScroll, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

// Skills data with icon URLs from DevIcons CDN
const skills = [
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Nest.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg" },
  { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "Fastify", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "SCSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Electron", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "DynamoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg" },
  { name: "SQLite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" },
  { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { name: "Prisma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" },
  { name: "Sequelize", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg" },
  { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "GitLab", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
  { name: ".NET", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg" },
  { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
  { name: "Apollo", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apollographql/apollographql-original.svg" },
  { name: "Redux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
  { name: "Framer Motion", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framer/framer-original.svg" },
  { name: "Three.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg" },
  { name: "Webpack", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg" },
  { name: "Vite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  { name: "Jest", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
];

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
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="group relative flex items-center gap-2 rounded p-2 text-sm cursor-pointer bg-white/10 text-slate-100 hover:bg-white/20 backdrop-blur-sm border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.03 }}>
                  <div className="w-5 h-5 relative flex-shrink-0">
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback if icon fails to load
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium">{skill.name}</span>
                </motion.div>
              ))}
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
                className="flex justify-between min-h-[300px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}>
                {/* LEFT */}
                <div className="w-1/3">
                  {/* JOB TITLE */}
                  <div className="bg-white/10 border border-white/10 backdrop-blur-sm p-3 font-semibold rounded-b-lg rounded-s-lg">
                    Associate Tech Lead
                  </div>
                  {/* PROJECT DETAILS */}
                  <div className="p-3 space-y-3">
                    <div>
                      <div className="text-xs text-sky-400 font-semibold mb-1">
                        Project: Fan Engagement Platform
                      </div>
                      <div className="text-xs text-slate-400 space-y-1">
                        <div>
                          <span className="text-slate-300">Frontend:</span> React
                          Native / Context / TypeScript
                        </div>
                        <div>
                          <span className="text-slate-300">Backend:</span> Node /
                          Serverless / App Store & Play Store Payment
                        </div>
                        <div>
                          <span className="text-slate-300">Database:</span>{" "}
                          DynamoDB
                        </div>
                        <div>
                          <span className="text-slate-300">Cloud:</span> AWS API
                          Gateway, CloudWatch, SQS (FIFO & Standard), Lambda
                          Authorizers, ElastiCache, S3
                        </div>
                        <div>
                          <span className="text-slate-300">Tools:</span> GitLab,
                          VS Code
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* JOB DATE */}
                  <div className="p-3 text-sky-400 text-sm font-semibold">
                    Aug 2024 - Present
                  </div>
                  {/* JOB COMPANY */}
                  <div className="p-1 rounded bg-white/10 border border-white/10 text-sm font-semibold w-fit">
                    Insighture | Singapore
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
                className="flex justify-between min-h-[400px]"
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
                <div className="w-1/3">
                  {/* JOB TITLE */}
                  <div className="bg-white/10 border border-white/10 backdrop-blur-sm p-3 font-semibold rounded-b-lg rounded-s-lg">
                    Senior Software Engineer
                  </div>
                  {/* PROJECT DETAILS */}
                  <div className="p-3 space-y-3">
                    <div>
                      <div className="text-xs text-sky-400 font-semibold mb-1">
                        Project: Regtech (CoreApp)
                      </div>
                      <div className="text-xs text-slate-400 space-y-1">
                        <div>
                          <span className="text-slate-300">Frontend:</span> React /
                          Redux / Context
                        </div>
                        <div>
                          <span className="text-slate-300">Backend:</span> Node /
                          Fastify / Sequelize ORM
                        </div>
                        <div>
                          <span className="text-slate-300">Database:</span>{" "}
                          PostgreSQL
                        </div>
                        <div>
                          <span className="text-slate-300">Cloud:</span> AWS &
                          Azure
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-sky-400 font-semibold mb-1">
                        Project: Regtech (RecorderApp)
                      </div>
                      <div className="text-xs text-slate-400 space-y-1">
                        <div>
                          <span className="text-slate-300">Frontend:</span> React /
                          Electron
                        </div>
                        <div>
                          <span className="text-slate-300">Backend:</span> Node /
                          Fastify / Sequelize ORM / Redis
                        </div>
                        <div>
                          <span className="text-slate-300">Database:</span> SQLite
                        </div>
                        <div>
                          <span className="text-slate-300">Cloud:</span> AWS
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-sky-400 font-semibold mb-1">
                        Project: Regtech (ASR Application)
                      </div>
                      <div className="text-xs text-slate-400 space-y-1">
                        <div>
                          <span className="text-slate-300">Backend:</span> C# / .NET
                          2.1
                        </div>
                        <div>
                          <span className="text-slate-300">Cloud:</span> Azure
                          Cognitive Services
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-slate-400">
                      <span className="text-slate-300">Tools:</span> GitHub, VS Code
                    </div>
                  </div>
                  {/* JOB DATE */}
                  <div className="p-3 text-sky-400 text-sm font-semibold">
                    Oct 2023 - Jul 2024
                  </div>
                  {/* JOB COMPANY */}
                  <div className="p-1 rounded bg-white/10 border border-white/10 text-sm font-semibold w-fit">
                    Insighture | Singapore
                  </div>
                </div>
              </motion.div>
              {/* EXPERIENCE LIST ITEM */}
              <motion.div
                className="flex justify-between min-h-[300px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}>
                {/* LEFT */}
                <div className="w-1/3">
                  {/* JOB TITLE */}
                  <div className="bg-white/10 border border-white/10 backdrop-blur-sm p-3 font-semibold rounded-b-lg rounded-s-lg">
                    Senior Software Engineer
                  </div>
                  {/* PROJECT DETAILS */}
                  <div className="p-3 space-y-3">
                    <div>
                      <div className="text-xs text-sky-400 font-semibold mb-1">
                        Project: LegTech Domain
                      </div>
                      <div className="text-xs text-slate-400 space-y-1">
                        <div>
                          <span className="text-slate-300">Frontend:</span> React JS
                          / Redux
                        </div>
                        <div>
                          <span className="text-slate-300">Backend:</span> Node /
                          TypeScript / Prisma ORM / MySQL
                        </div>
                        <div>
                          <span className="text-slate-300">Cloud:</span> AWS S3, SES,
                          CloudWatch
                        </div>
                        <div>
                          <span className="text-slate-300">Tools:</span> Bitbucket,
                          Docker, Redis
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* JOB DATE */}
                  <div className="p-3 text-sky-400 text-sm font-semibold">
                    Jul 2023 - Oct 2023
                  </div>
                  <div className="p-1 rounded bg-white/10 border border-white/10 text-sm font-semibold w-fit">
                    ItelaSoft | Colombo
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
              <motion.div
                className="flex justify-between min-h-[400px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.15 }}>
                {/* LEFT */}
                <div className="w-1/3"></div>
                {/* CENTER */}
                <div className="w-1/6 flex justify-center">
                  {/* LINE */}
                  <div className="w-1 h-full bg-slate-600 rounded relative">
                    {/* LINE CIRCLE */}
                    <div className="absolute w-5 h-5 rounded-full ring-4 ring-sky-400 bg-white -left-2"></div>
                  </div>
                </div>
                {/* RIGHT */}
                <div className="w-1/3">
                  {/* JOB TITLE */}
                  <div className="bg-white/10 border border-white/10 backdrop-blur-sm p-3 font-semibold rounded-b-lg rounded-s-lg">
                    Software Engineer
                  </div>
                  {/* PROJECT DETAILS */}
                  <div className="p-3 space-y-3">
                    <div>
                      <div className="text-xs text-sky-400 font-semibold mb-1">
                        Project: Fupay
                      </div>
                      <div className="text-xs text-slate-400 space-y-1">
                        <div>
                          <span className="text-slate-300">Frontend:</span> React JS
                          / Context API
                        </div>
                        <div>
                          <span className="text-slate-300">Backend:</span> Node /
                          TypeScript / Serverless
                        </div>
                        <div>
                          <span className="text-slate-300">Database:</span> DynamoDB
                        </div>
                        <div>
                          <span className="text-slate-300">Cloud:</span> AWS Lambda,
                          API Gateway, CloudWatch
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-sky-400 font-semibold mb-1">
                        Project: Your Voice
                      </div>
                      <div className="text-xs text-slate-400 space-y-1">
                        <div>
                          <span className="text-slate-300">Frontend:</span> React JS
                          / Context API
                        </div>
                        <div>
                          <span className="text-slate-300">Backend:</span> Node /
                          TypeScript / Serverless
                        </div>
                        <div>
                          <span className="text-slate-300">Database:</span> DynamoDB
                        </div>
                        <div>
                          <span className="text-slate-300">Cloud:</span> AWS Lambda,
                          API Gateway, CloudWatch
                        </div>
                        <div>
                          <span className="text-slate-300">Tools:</span> GitHub
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* JOB DATE */}
                  <div className="p-3 text-sky-400 text-sm font-semibold">
                    Jun 2022 - Jul 2023
                  </div>
                  {/* JOB COMPANY */}
                  <div className="p-1 rounded bg-white/10 border border-white/10 text-sm font-semibold w-fit">
                    Swivel Tech | Melbourne
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="flex justify-between min-h-[350px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}>
                {/* LEFT */}
                <div className="w-1/3">
                  {/* JOB TITLE */}
                  <div className="bg-white/10 border border-white/10 backdrop-blur-sm p-3 font-semibold rounded-b-lg rounded-s-lg">
                    Full Stack Engineer
                  </div>
                  {/* PROJECT DETAILS */}
                  <div className="p-3 space-y-3">
                    <div>
                      <div className="text-xs text-sky-400 font-semibold mb-1">
                        Projects: Eat Me Admin Panel (BE) / Restaurant Manager
                        (Full Stack)
                      </div>
                      <div className="text-xs text-slate-400 space-y-1">
                        <div>
                          <span className="text-slate-300">Frontend:</span> React /
                          Redux / Redux Thunk
                        </div>
                        <div>
                          <span className="text-slate-300">Backend:</span> Node /
                          Express
                        </div>
                        <div>
                          <span className="text-slate-300">Database:</span> MySQL
                        </div>
                        <div>
                          <span className="text-slate-300">Testing:</span> Mocha/Chai
                          (BE), Jest (FE)
                        </div>
                        <div>
                          <span className="text-slate-300">Tools:</span> Bitbucket,
                          ClickUp
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* JOB DATE */}
                  <div className="p-3 text-sky-400 text-sm font-semibold">
                    Jun 2021 - May 2022
                  </div>
                  {/* JOB COMPANY */}
                  <div className="p-1 rounded bg-white/10 border border-white/10 text-sm font-semibold w-fit">
                    Eat Me Singapore
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
                <div className="w-1/3"></div>
              </motion.div>
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
