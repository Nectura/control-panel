import PageBreadcrumbs from "@/components/page-breadcrumbs";
import ThemeSwitch from "@/components/theme-switch";
import { getPageTitle } from "@/functions/page.functions";
import Head from "next/head";
import HomeIcon from "@mui/icons-material/Home";
import { Box } from "@mui/material";

export default function Index() {
  return (
    <>
      <Head>
        <title>{getPageTitle("Dashboard")}</title>
      </Head>
      <PageBreadcrumbs previousPages={[]} currentPage={{
          title: "Home",
          path: "/",
          icon: <HomeIcon/>,
      }} />
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: process.env.NEXT_PUBLIC_SITE_PAGE_CONTAINER_MARGIN_TOP }}>
        <ThemeSwitch />
      </Box>
    </>
  );
}
