import React from 'react';
import BasicTabs from '../components/Tabs.tsx';
import DataTableSection from './DataTableSection.tsx';
import { Education } from '../../src/types.ts';




type TableSectionProps = {
    tableRef: React.RefObject<HTMLDivElement>;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    possibleEducations: Education[];
};



const TableSection: React.FC<TableSectionProps> = ({ tableRef, setIsModalOpen, possibleEducations }) => {

    return (
        <div style={{ height: "100vh", width: "100%", backgroundColor: "#f8fbff" }}>
            <div ref={tableRef} id="table" style={{ marginTop: "0", backgroundColor: "white", paddingTop: "58px" }} />
            <BasicTabs setIsModalOpen={setIsModalOpen} possibleEducations={possibleEducations} />
        </div >
    );
};

export default TableSection;


