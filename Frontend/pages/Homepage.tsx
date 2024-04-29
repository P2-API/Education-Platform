
import TableSection from "./TableSection";
import HeroSection from "./HeroSection";
import BasicModal from "./QuizSection";

import * as React from 'react';
import { useRef } from "react";
import { useMediaQuery } from "@mui/material";

const Homepage = () => {
  const tableRef = useRef<HTMLDivElement>(null);
  const useMargin = useMediaQuery("(min-width: 1179px)");
  
  // Quiz States
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>

      <HeroSection tableRef={tableRef} />
      <BasicModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
      <TableSection tableRef={tableRef} setIsModalOpen={setIsModalOpen}/>

    </>
  );
};

export default Homepage;
