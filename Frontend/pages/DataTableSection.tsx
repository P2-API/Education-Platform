import MaterialReactDataTable from "../components/TableSection/DataTable";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import FilterBoxComponent from "../components/TableSection/FilterBoxComponent";
import { FinalRankingType } from "../../src/types";
import { TableSectionDataContext } from "./Homepage";
import RankedMaterialReactDataTable from "../components/TableSection/RankedDataTable";



const DataTableSection: React.FC = ({ }) => {


    const [isCalculating, setisCalculating] = useState<boolean>(true);
    const [rankedData, setRankedData] = useState<FinalRankingType | null>(null);

    let data = useContext(TableSectionDataContext);




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

            <div style={{ width: "69%", height: "100%" }}>
                {!rankedData && (
                    <MaterialReactDataTable data={data?.educations ?? []} />
                )}
                {rankedData && (
                    <RankedMaterialReactDataTable rankedData={rankedData} />
                )}
            </div>
        </div>
    );
};
export default DataTableSection;
