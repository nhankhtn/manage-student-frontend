"use client";

import { useMediaQuery } from "@mui/system";
import ContentDesktop from "./_sections/desktop/content";
import { Theme } from "@mui/material";
import ContentMobile from "./_sections/moible/context";

export default function Page() {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  return isMobile ? <ContentMobile /> : <ContentDesktop />;
}
