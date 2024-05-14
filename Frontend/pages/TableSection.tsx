import React from 'react';
import BasicTabs from '../components/Tabs.tsx';

type TableSectionProps = {
    tableRef: React.RefObject<HTMLDivElement>;
};


const TableSection: React.FC<TableSectionProps> = ({ tableRef }) => {

    return (
        <div style={{ height: "100vh", width: "100%", backgroundColor: "#f8fbff" }}>
            <div ref={tableRef} id="table" style={{ backgroundColor: "white", paddingTop: "3.5em" }} />
            <BasicTabs />
        </div >
    );
};

export default TableSection;


