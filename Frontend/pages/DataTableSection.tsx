import MaterialReactDataTable from "../components/TableSection/DataTable";
import React, { useEffect, useState, useContext } from "react";
import FilterBoxComponent from "../components/TableSection/FilterBoxComponent";
import { TableFilters, } from "../../src/types";
import { EducationDataFromServerContext } from "./Homepage";
import RankedMaterialReactDataTable from "../components/TableSection/RankedDataTable";
import { filtersContext, rankedDataInfo } from "../components/Tabs";



type DataTableSectionProps = {
    rankedDataInfo: rankedDataInfo
};


const DataTableSection: React.FC<DataTableSectionProps> = ({ rankedDataInfo }) => {


    const [isCalculating, setisCalculating] = useState<boolean>(true);

    let data = useContext(EducationDataFromServerContext);
    let filterInfo = useContext(filtersContext);


    useEffect(() => {
        if (data) {
            setisCalculating(false);
        }
    }, [data]);

    return (
        <div style={{ display: "flex", height: "80vh", width: "100%", maxWidth: "100vw" }}>
            <div style={{ width: "30%", height: "100%", minWidth: "417px", marginRight: "1em" }}>

                <FilterBoxComponent isCalculating={isCalculating} setIsCalculating={setisCalculating} setRankedData={rankedDataInfo.setRankedData} filterInfo={filterInfo} />
            </div>

            <div style={{ width: "69%", height: "100%" }}>
                {!rankedDataInfo.rankedData && (
                    <MaterialReactDataTable data={data?.educations ?? []} />
                )}
                {rankedDataInfo.rankedData && (
                    <RankedMaterialReactDataTable rankedData={rankedDataInfo.rankedData} />
                )}
            </div>
        </div>
    );
};
export default DataTableSection;
