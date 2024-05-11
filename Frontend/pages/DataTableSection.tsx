import MaterialReactDataTable from "../components/DataTable";
import React from "react";
import FilterBoxComponent from "../components/FilterBoxComponent";

const DataTableSection: React.FC = () => {

    return (
        <div style={{ display: "flex", height: "80vh", width: "100%", maxWidth: "100vw" }}>
            <div style={{ width: "30%", height: "100%", minWidth: "402px", marginRight: "1em" }}>
                <FilterBoxComponent />
            </div>

            <div style={{ width: "70%" }}>
                <MaterialReactDataTable />
            </div>
        </div>
    );
};
export default DataTableSection;
