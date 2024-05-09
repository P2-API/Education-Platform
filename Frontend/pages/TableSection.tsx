import React from 'react';
import BasicTabs from '../components/Tabs.tsx';





type TableSectionProps = {
    tableRef: React.RefObject<HTMLDivElement>;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};



const TableSection: React.FC<TableSectionProps> = ({ tableRef, setIsModalOpen }) => {

    return (
        <div style={{ height: "100vh", width: "100%", backgroundColor: "#f8fbff" }}>
            <div ref={tableRef} id="table" style={{ backgroundColor: "white", paddingTop: "3.5em" }} />
            <BasicTabs setIsModalOpen={setIsModalOpen} />
        </div >
    );
};

export default TableSection;


