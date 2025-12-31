"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
const links = [
  { url: "/", title: "Home" },
  { url: "/about", title: "About" },
  { url: "/academic", title: "Academic" },
  { url: "/portfolio", title: "Portfolio" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { theme, toggleToBlack, toggleToDefault } = useTheme();
  const topVariants = {
    closed: {
      rotate: 0,
    },
    opened: {
      rotate: 45,
      backgroundColor: "rgb(255,255,255)",
    },
  };
  const centerVariants = {
    closed: {
      opacity: 1,
    },
    opened: {
      opacity: 0,
    },
  };

  const bottomVariants = {
    closed: {
      rotate: 0,
    },
    opened: {
      rotate: -45,
      backgroundColor: "rgb(255,255,255)",
    },
  };
  const listVariants = {
    closed: {
      x: "100vw",
    },
    opened: {
      x: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const listItemVariants = {
    closed: {
      x: -10,
      opacity: 0,
    },
    opened: {
      x: 0,
      opacity: 1,
    },
  };
  return (
    <div
      className={`h-full flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 text-lg ${
        theme === "black" ? "bg-black" : ""
      }`}>
      {/* LINKS */}
      <div className="hidden md:flex gap-4 w-1/3">
        {links.map((link) => (
          <NavLink link={link} key={link.url} />
        ))}
      </div>

      {/** LOGO - Visible on mobile and large screens */}
      <div className="flex lg:flex xl:w-1/3 xl:justify-center">
        <div className="text-sm bg-black rounded-md p-1 font-semibold flex items-center justify-center">
          <button
            onClick={toggleToBlack}
            className="text-white mr-1 cursor-pointer hover:opacity-80 transition-opacity">
            Krishna
          </button>
          <button
            onClick={toggleToDefault}
            className="w-12 h-8 rounded bg-white text-black flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
            .dev
          </button>
        </div>
      </div>

      {/* SOCIAL */}
      <div className="hidden md:flex gap-4  w-1/3">
        <Link href="https://github.com/programmer-krish" target="_blank">
          <Image src="/github.png" alt="github" width={24} height={24} />
        </Link>
        <Link
          href="https://www.linkedin.com/in/programmer-krish"
          target="_blank">
          <Image src="/linkedin.png" alt="linkedin" width={24} height={24} />
        </Link>
        <Link
          href="https://www.instagram.com/__k_r_i_s_h_n_a__m_o_h_a_n__/"
          target="_blank">
          <Image src="/instagram.png" alt="instagram" width={24} height={24} />
        </Link>
        <Link href="https://www.facebook.com/krishnamohan27" target="_blank">
          <Image src="/facebook.png" alt="facebook" width={24} height={24} />
        </Link>
        <Link
          href="https://www.chess.com/member/dark_mind_krish"
          target="_blank">
          <Image src="/chess.png" alt="chess" width={18} height={18} />
        </Link>
      </div>
      <div className="md:hidden">
        {/* MENU BUTTON */}
        <button
          className="w-10 h-8 flex flex-col justify-between z-50 relative"
          onClick={() => setOpen((prev) => !prev)}>
          <motion.div
            variants={topVariants}
            animate={open ? "opened" : "closed"}
            className={`w-10 h-1 rounded origin-left ${
              theme === "black" ? "bg-white" : "bg-black"
            }`}></motion.div>
          <motion.div
            variants={centerVariants}
            animate={open ? "opened" : "closed"}
            className={`w-10 h-1 rounded ${
              theme === "black" ? "bg-white" : "bg-black"
            }`}></motion.div>
          <motion.div
            variants={bottomVariants}
            animate={open ? "opened" : "closed"}
            className={`w-10 h-1 rounded origin-left ${
              theme === "black" ? "bg-white" : "bg-black"
            }`}></motion.div>
        </button>
        {/* MENU LIST */}
        {open && (
          <motion.div
            variants={listVariants}
            initial="closed"
            animate="opened"
            className={`absolute top-0 left-0 w-screen h-screen ${
              theme === "black" ? "bg-black" : "bg-black"
            } text-white flex flex-col items-center justify-center gap-8 text-4xl z-40`}>
            {/* Theme Toggle in Mobile Menu */}
            <motion.div variants={listItemVariants} className="mb-4">
              <div className="text-sm bg-black rounded-md p-1 font-semibold flex items-center justify-center border-2 border-white">
                <button
                  onClick={() => {
                    toggleToBlack();
                    setOpen(false);
                  }}
                  className="text-white mr-1 cursor-pointer hover:opacity-80 transition-opacity px-2">
                  Krishna
                </button>
                <button
                  onClick={() => {
                    toggleToDefault();
                    setOpen(false);
                  }}
                  className="w-12 h-8 rounded bg-white text-black flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
                  .dev
                </button>
              </div>
            </motion.div>
            {links.map((link) => (
              <motion.div
                variants={listItemVariants}
                className=""
                key={link.title}>
                <Link href={link.url} onClick={() => setOpen(false)}>
                  {link.title}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
