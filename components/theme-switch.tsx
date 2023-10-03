import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FormControl, Button } from "@mui/material";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import { themeChangeEvent } from "@/events/theme.events";

const DEFAULT_THEME = "system";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const emitThemeChangeEvent = (newTheme: string) => {
    if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
      document.dispatchEvent(themeChangeEvent(systemTheme.matches ? "dark" : "light"));
      return;
    }
    document.dispatchEvent(themeChangeEvent(newTheme));
  }

  const handleChange = (newTheme: string) => {
    setTheme(newTheme);
    emitThemeChangeEvent(newTheme);
  };
  
  return (
    <FormControl component="fieldset" sx={{ flexDirection: "row", gap: 1 }}>
      <Button
        variant={theme === "light" ? "contained" : "outlined"}
        onClick={() => handleChange("light")}
      >
        <LightModeIcon fontSize="small" sx={{ mr: 1 }} />
        Light
      </Button>
      <Button
        variant={theme === "system" ? "contained" : "outlined"}
        onClick={() => handleChange("system")}
      >
        <SettingsBrightnessIcon fontSize="small" sx={{ mr: 1 }} />
        System
      </Button>
      <Button
        variant={theme === "dark" ? "contained" : "outlined"}
        onClick={() => handleChange("dark")}
      >
        <DarkModeIcon fontSize="small" sx={{ mr: 1 }} />
        Dark
      </Button>
    </FormControl>
  );
};

export default ThemeSwitch;
