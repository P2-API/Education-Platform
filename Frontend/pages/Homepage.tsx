import TableSection from "./TableSection";
import HeroSection from "./HeroSection";
import BasicModal from "./QuizSection";
import * as React from "react";
import { useRef } from "react";

import { useServer } from "@backend/server/useServer";
import { Education, TableSectionDataFromServer } from "types";



const Homepage = () => {
  const tableRef = useRef<HTMLDivElement>(null);

  // Quiz States
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [tableSectionData, setTableSectionData] = React.useState<TableSectionDataFromServer>()

  const { getTableSectionData } = useServer();
  
  const asyncUpdateTableSectionData = async () =>{
    setTableSectionData(await getTableSectionData());
  }
  asyncUpdateTableSectionData(); 

  return (
    <>

      <HeroSection tableRef={tableRef} />
      <BasicModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <TableSection tableRef={tableRef} setIsModalOpen={setIsModalOpen} data={tableSectionData}/>
    </>
  );
};

export default Homepage;
