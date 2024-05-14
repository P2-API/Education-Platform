import MaterialReactDataTable from "../components/TableSection/DataTable";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import FilterBoxComponent from "../components/TableSection/FilterBoxComponent";
import { FinalRankingType } from "../../src/types";
import { TableSectionDataContext } from "./Homepage";



const DataTableSection: React.FC = ({ }) => {
    // Obtain state from global context
    const data = useContext(TableSectionDataContext);
    const [rankedData, setRankedData] = useState<FinalRankingType | null>(null);
    console.log("rankeddata", rankedData)
    const [isCalculating, setisCalculating] = useState<boolean>(true);

    useEffect(() => {
        if (data) {
            setisCalculating(false);
        }
    }, [data]);






    return (
        <div style={{ display: "flex", height: "80vh", width: "100%", maxWidth: "100vw" }}>
            <div style={{ width: "30%", height: "100%", minWidth: "417px", marginRight: "1em" }}>

                <FilterBoxComponent isCalculating={isCalculating} setIsCalculating={setisCalculating} setRankedData={setRankedData} />
            </div>

            <div style={{ width: "69%" }}>
                <MaterialReactDataTable data={data?.educations ?? []} />
            </div>
        </div>
    );
};
export default DataTableSection;
