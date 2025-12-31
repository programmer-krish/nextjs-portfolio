"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("default"); // "default" or "black"

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleToBlack = () => {
    setTheme("black");
  };

  const toggleToDefault = () => {
    setTheme("default");
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleToBlack, toggleToDefault }}>
      {children}
    </ThemeContext.Provider>
  );
};

