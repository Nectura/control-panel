import { Typography, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";

export default function Footer() {
  const theme = useTheme();

  const separator = () => {
    return (
      <span style={{
        marginLeft: "8px",
        marginRight: "8px",
        color: theme.palette.mode === "light" ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)"
      }}>|</span>
    );
  }

  const footerContent = () => {
    return (
      <Typography variant="subtitle1">
        <Link
          href="#"
          target="_blank"
          className="redirection-link"
        >
          Twitter
        </Link>

        {separator()}

        <Link
          href="#"
          target="_blank"
          className="redirection-link"
        >
          Donation
        </Link>

        {separator()}

        <Link href="#" className="redirection-link">
          Privacy Policy
        </Link>

        {separator()}

        <Link href="#" className="redirection-link">
          Terms of Service
        </Link>
      </Typography>
    );
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        top: "auto",
        bottom: 0,
        backgroundColor:
          theme.palette.mode === "light"
            ? "rgba(255, 255, 255)"
            : "rgb(0, 0, 0)",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "flex-end",
        }}
      >
        {footerContent()}
      </Toolbar>
    </AppBar>
  );
}
