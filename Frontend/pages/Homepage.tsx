
import TableSection from "./TableSection";
import HeroSection from "./HeroSection";
import { useRef } from "react";
import { useMediaQuery } from "@mui/material";

const Homepage = () => {
  const tableRef = useRef<HTMLDivElement>(null);
  const useMargin = useMediaQuery("(min-width: 1179px)");

  return (
    <>

      <HeroSection tableRef={tableRef}  />

      <TableSection tableRef={tableRef} />

      </>
  );
};

export default Homepage;
