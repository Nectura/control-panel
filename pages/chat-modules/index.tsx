import PageBreadcrumbs from "@/components/page-breadcrumbs";
import ThemeSwitch from "@/components/theme-switch";
import { getPageTitle } from "@/functions/page.functions";
import { Box } from "@mui/material";
import Head from "next/head";
import HomeIcon from "@mui/icons-material/Home";
import PuzzleIcon from "@mui/icons-material/Extension";

export default function Index() {
  return (
    <>
      <Head>
        <title>{getPageTitle("Chat Modules")}</title>
      </Head>
      <PageBreadcrumbs
        previousPages={[
          {
            title: "Home",
            path: "/",
            icon: <HomeIcon />,
          },
        ]}
        currentPage={{
          title: "Chat Modules",
          path: "/chat-modules",
          icon: <PuzzleIcon />,
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: process.env.NEXT_PUBLIC_SITE_PAGE_CONTAINER_MARGIN_TOP,
        }}
      >
        <ThemeSwitch />
      </Box>
    </>
  );
}
