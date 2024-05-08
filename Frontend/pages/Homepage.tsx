import TableSection from "./TableSection";
import HeroSection from "./HeroSection";
import QuizModal from "./QuizModal";
import * as React from "react";
import { useRef } from "react";

const Homepage = () => {
  const tableRef = useRef<HTMLDivElement>(null);

  // Quiz States
  const [isModalOpen, setIsModalOpen] = React.useState(false);



  return (
    <>

      <HeroSection tableRef={tableRef} />
      <QuizModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <TableSection tableRef={tableRef} setIsModalOpen={setIsModalOpen} possibleEducations={[]} />
    </>
  );
};

export default Homepage;
