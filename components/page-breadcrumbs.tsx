import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Divider, Typography, useTheme } from "@mui/material";

export interface PageBreadcrumbsProps {
  previousPages: { title: string; path: string; icon: any } [];
  currentPage: { title: string; path: string; icon: any };
}

export default function PageBreadcrumbs(props: PageBreadcrumbsProps) {
  const theme = useTheme();

  const previousPages = props.previousPages.map((page, index) => {
    const modifiedIcon = React.cloneElement(page.icon, {
      sx: {
        marginRight: "4px",
        fontSize: "16px",
        verticalAlign: "middle",
        ...(page.icon.props.sx || {}), // Preserve existing sx properties
      },
    });
    return (
      <Link
        key={index}
        style={{
          display: "flex",
          alignItems: "center",
          color: theme.palette.mode === "dark" ? "#fff" : "#000",
          textDecoration: "none"
        }}
        href={page.path}
      >
        {modifiedIcon}
        {page.title}
      </Link>
    );
  });

  props.currentPage.icon = React.cloneElement(props.currentPage.icon, {
    sx: {
      marginRight: "4px",
      fontSize: "16px",
      verticalAlign: "middle",
      ...(props.currentPage.icon.props.sx || {}), // Preserve existing sx properties
    },
  });
  
  const currentPage = (
    <Typography
      sx={{
        display: "flex",
        alignItems: "center",
        color: theme.palette.mode === "dark" ? "#fff" : "#000",
      }}
    >
      {props.currentPage.icon}
      {props.currentPage.title}
    </Typography>
  );

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{
        display: "flex",
        justifyContent: "flex-start",
        marginLeft: "1rem",
        marginTop: "1rem",
      }}>
        {previousPages}
        {currentPage}
      </Breadcrumbs>
      <Divider
        sx={{
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
      />
    </>
  );
}
