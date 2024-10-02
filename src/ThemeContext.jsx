import { createContext, useState, useContext, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Create a context for theme toggling
const ThemeToggleContext = createContext();

// Custom hook to use the ThemeToggleContext
export const useThemeToggle = () => {
  return useContext(ThemeToggleContext);
};

// Theme toggle provider component
export const ThemeToggleProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  // Create a theme based on the mode
  const theme = createTheme({
    palette: {
      mode: mode,
      ...(mode === "light"
        ? {
            // Light theme settings
            background: {
              default: "#fff",
              paper: "#f5f5f5",
            },
          }
        : {
            // Dark theme settings
            background: {
              default: "#121212",
              paper: "#1e1e1e",
            },
          }),
    },
  });

  // Toggle the theme between light and dark
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    // Set the initial theme based on user's preference
    const userPreferredTheme = localStorage.getItem("theme") || "light";
    setMode(userPreferredTheme);
  }, []);

  useEffect(() => {
    // Save the user's theme preference to local storage
    localStorage.setItem("theme", mode);
    
    // Update the document body background color based on the current theme
    document.body.style.backgroundColor = mode === "light" ? "#fff" : "#121212";
  }, [mode]);

  return (
    <ThemeToggleContext.Provider value={{ toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};
