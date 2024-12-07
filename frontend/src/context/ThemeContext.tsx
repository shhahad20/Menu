import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(
    localStorage.getItem("theme") === "dark" ? "dark" : "light"
  );

  // Effect hook to apply the theme on initial load
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    console.log(document.documentElement.getAttribute("data-theme"));
  }, [theme]); // Runs every time theme changes

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Persist the theme in localStorage
    document.documentElement.setAttribute("data-theme", newTheme); // Apply theme to the <html> element
    // localStorage.setItem("theme", newTheme); // Persist the theme in localStorage
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
