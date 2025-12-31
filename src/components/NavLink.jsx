"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

const NavLink = ({ link }) => {
  const pathName = usePathname();
  const { theme } = useTheme();
  const isActive = pathName === link.url;
  
  // Theme-aware styling
  const baseClasses = "rounded p-1 transition-colors";
  const activeClasses = theme === "black" 
    ? "bg-white text-black" 
    : "bg-black text-white";
  const inactiveClasses = theme === "black"
    ? "text-white hover:text-gray-300"
    : "text-black hover:text-gray-600";

  return (
    <Link
      className={`${baseClasses} ${
        isActive ? activeClasses : inactiveClasses
      }`}
      href={link.url}>
      {link.title}
    </Link>
  );
};

export default NavLink;
