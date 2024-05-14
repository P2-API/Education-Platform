import MaterialReactDataTable from "../components/TableSection/DataTable";
import React from "react";
import { useContext } from "react";
import FilterBoxComponent from "../components/TableSection/FilterBoxComponent";

import { TableSectionDataContext } from "./Homepage";



const DataTableSection: React.FC = ({ }) => {
    // Obtain state from global context
    const data = useContext(TableSectionDataContext);

    const [isCalculating, setisCalculating] = React.useState<boolean>(true);



    return (
        <div style={{ display: "flex", height: "80vh", width: "100%", maxWidth: "100vw" }}>
            <div style={{ width: "30%", height: "100%", minWidth: "417px", marginRight: "1em" }}>

                <FilterBoxComponent isCalculating={isCalculating} />
            </div>

            <div style={{ width: "69%" }}>
                <MaterialReactDataTable data={data?.educations ?? []} />
            </div>
        </div>
    );
};
export default DataTableSection;
