import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

interface LoadingProps {
  flexPosition?: string;
  height?: string;
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "inherit";
}

export default function Loading({
  flexPosition = "center",
  height = "100px",
  color = "primary",
}: LoadingProps) {
  const flexStyles = {
    display: "flex",
    justifyContent: flexPosition,
    alignItems: "center",
    height: height,
  };
  return (
    <Box sx={flexStyles}>
      <CircularProgress color={color} />
    </Box>
  );
}
