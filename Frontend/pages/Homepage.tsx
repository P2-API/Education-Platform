import TableSection from "./TableSection";
import HeroSection from "./HeroSection";
import QuizModal from "./QuizModal";
import { createContext, useState, useRef, useEffect } from "react";
import { useServer } from "@backend/server/useServer";
import { TableSectionDataFromServer } from "types";

// Step 2: Create a context

const TableSectionDataContext = createContext<TableSectionDataFromServer | undefined>(undefined);
export { TableSectionDataContext };

const Homepage = () => {
  const tableRef = useRef<HTMLDivElement>(null);

  // Quiz States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<TableSectionDataFromServer>();

  // Fetch data from server
  const { getTableSectionData } = useServer();

  useEffect(() => {
    getTableSectionData().then((data) => {
      setData(data);
    });
  }, []); // Empty dependency array ensures the effect runs only once

  console.log("rendering");

  // Step 3: Wrap the components with Context.Provider
  return (
    <TableSectionDataContext.Provider value={data}>
      <HeroSection tableRef={tableRef} />
      <QuizModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <TableSection tableRef={tableRef} setIsModalOpen={setIsModalOpen} />
    </TableSectionDataContext.Provider>
  );
};

export default Homepage;
