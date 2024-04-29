import MaterialReactDataTable from "../components/DataTable";


type TableSectionProps = {
    tableRef: React.RefObject<HTMLDivElement>;
};

const TableSection: React.FC<TableSectionProps> = ({ tableRef }) => {
    return (
        <div style={{ height: "100%", width: "80%" }}>
            <div ref={tableRef} id="table" />
            <h1 style={{ textAlign: "center" }} className="text-color-blue">
                Uddannelser
            </h1>
            <MaterialReactDataTable />
        </div>
    );
};

export default TableSection;
