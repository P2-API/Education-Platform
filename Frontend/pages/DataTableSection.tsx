import MaterialReactDataTable from "../components/TableSection/DataTable";
import React from "react";
import FilterBoxComponent from "../components/TableSection/FilterBoxComponent";

const DataTableSection: React.FC = () => {

    return (
        <div style={{ display: "flex", height: "80vh", width: "100%", maxWidth: "100vw" }}>
            <div style={{ width: "30%", height: "100%", minWidth: "417px", marginRight: "1em" }}>
                <FilterBoxComponent />
            </div>

            <div style={{ width: "69%" }}>
                <MaterialReactDataTable />
            </div>
        </div>
    );
};
export default DataTableSection;
