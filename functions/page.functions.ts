import { useMediaQuery } from "react-responsive";

export function getPageTitle(pageTitle: string) {
    return `${pageTitle} - ${process.env.NEXT_PUBLIC_SITE_TITLE}`;
}

export const IsMobile = () => {
    return useMediaQuery({ query: `(max-width: 760px)` });
}
