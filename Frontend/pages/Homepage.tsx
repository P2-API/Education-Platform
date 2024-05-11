import TableSection from "./TableSection";
import HeroSection from "./HeroSection";
import QuizModal from "./QuizModal";
import { createContext, useState, useRef, useEffect } from "react";
import { useServer } from "@backend/server/useServer";
import { TableSectionDataFromServer } from "types";

// Context providing global access to states to prevent prop drilling
const ModalContext = createContext<{ showModal: boolean, setShowModal: React.Dispatch<React.SetStateAction<boolean>> } | undefined>(undefined);
const TableSectionDataContext = createContext<TableSectionDataFromServer | undefined>(undefined);
const TableSectionReferenceContext = createContext<React.RefObject<HTMLDivElement> | undefined>(undefined);
export { TableSectionDataContext, ModalContext, TableSectionReferenceContext };



const Homepage: React.FC = () => {

  // Complete list of educations 
  const [data, setData] = useState<TableSectionDataFromServer>();

  // Reference for scrolling to table
  const tableRef = useRef<HTMLDivElement>(null);

  // Quiz State
  const [isModalOpen, setIsModalOpen] = useState(false);




  // Fetch data from server
  const { getTableSectionData } = useServer();
  useEffect(() => {
    getTableSectionData().then((data) => {
      setData(data);
    });
  }, []); // Empty dependency array ensures the effect runs only once




  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <TableSectionDataContext.Provider value={data} >
      <ModalContext.Provider value={{ showModal: isModalOpen, setShowModal: setIsModalOpen }}>
        <TableSectionReferenceContext.Provider value={tableRef}>
          <HeroSection />
          <QuizModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
          <TableSection tableRef={tableRef} setIsModalOpen={setIsModalOpen} />
        </TableSectionReferenceContext.Provider>
      </ModalContext.Provider>
    </TableSectionDataContext.Provider>
  );
};

export default Homepage;
