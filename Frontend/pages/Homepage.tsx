import TableSection from "./TableSection";
import HeroSection from "./HeroSection";
import { createContext, useState, useRef, useEffect } from "react";
import { useServer } from "@backend/server/useServer";
import { TableSectionDataFromServer } from "types";

// Context providing global access to states to prevent prop drilling
const TableSectionDataContext = createContext<TableSectionDataFromServer | undefined>(undefined);
const TableSectionReferenceContext = createContext<React.RefObject<HTMLDivElement> | undefined>(undefined);
export { TableSectionDataContext, TableSectionReferenceContext };



const Homepage: React.FC = () => {

  // Complete list of educations 
  const [data, setData] = useState<TableSectionDataFromServer>();

  // Reference for scrolling to table
  const tableRef = useRef<HTMLDivElement>(null);





  // Fetch data from server
  const { getTableSectionData } = useServer();
  useEffect(() => {
    getTableSectionData().then((data) => {
      setData(data);
    });
  }, []); // Empty dependency array ensures the effect runs only once




  if (data === undefined) {
    return <HeroSection />;
  }

  return (
    <TableSectionDataContext.Provider value={data} >
      <TableSectionReferenceContext.Provider value={tableRef}>
        <HeroSection />
        <TableSection tableRef={tableRef} />
      </TableSectionReferenceContext.Provider>
    </TableSectionDataContext.Provider>
  );
};

export default Homepage;
