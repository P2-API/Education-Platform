import HeroSection from "./HeroSection";
import { createContext, useState, useRef, useEffect } from "react";
import { useServer } from "@backend/server/useServer";
import { EducationDataFromServer } from "types";
import InteractiveSection from "./InteractiveSection";

// Context providing global access to states to prevent prop drilling
const EducationDataFromServerContext = createContext<EducationDataFromServer | undefined>(undefined);
const TableSectionReferenceContext = createContext<React.RefObject<HTMLDivElement> | undefined>(undefined);
export { TableSectionReferenceContext, EducationDataFromServerContext };



const Homepage: React.FC = () => {

  // Complete list of educations 
  const [data, setData] = useState<EducationDataFromServer>();

  // Reference for scrolling to table
  const tableRef = useRef<HTMLDivElement>(null);





  // Fetch data from server
  const { getTableSectionData } = useServer();
  useEffect(() => {
    getTableSectionData().then((data) => {
      setData(data);
    });
  }, []); // Empty dependency array ensures the effect runs only once






  return (
    <EducationDataFromServerContext.Provider value={data} >
      <TableSectionReferenceContext.Provider value={tableRef}>
        <HeroSection />
        {data && <InteractiveSection tableRef={tableRef} />}
      </TableSectionReferenceContext.Provider>
    </EducationDataFromServerContext.Provider>
  );
};

export default Homepage;
