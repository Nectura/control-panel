import "../styles/globals.scss";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import SideDrawer from "@/components/side-drawer";
import { ThemeProvider } from "next-themes";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { muiDarkTheme, muiLightTheme } from "@/themes/mui.themes";
import Footer from "@/components/footer";

interface MyAppProps {
  Component: any;
  pageProps: any;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const [muiTheme, setMuiTheme] = useState(muiDarkTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleThemeChange = (event: any) => {
      const newTheme = event.detail;
      setMuiTheme(newTheme === "dark" ? muiDarkTheme : muiLightTheme);
    };

    // Load the theme from local storage if it exists
    const currentTheme = localStorage.getItem("theme") ?? "system";
    if (currentTheme === "system") {
      const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)");
      setMuiTheme(preferredTheme.matches ? muiDarkTheme : muiLightTheme);
    } else {
      setMuiTheme(currentTheme === "dark" ? muiDarkTheme : muiLightTheme);
    }

    // Set the mounted flag to true when the component mounts
    setMounted(true);

    // Add an event listener for the custom theme change event
    document.addEventListener("themeChange", handleThemeChange);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("themeChange", handleThemeChange);
    };
  }, []);

  // Prevents SSR from rendering in light mode
  if (!mounted) {
    return null;
  }

  return (
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider>
        <SideDrawer Component={Component} pageProps={pageProps} />
        <Footer />
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

export default MyApp;
