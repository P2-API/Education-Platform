import MaterialReactDataTable from "../components/TableSection/DataTable";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import FilterBoxComponent from "../components/TableSection/FilterBoxComponent";
import { FinalRankingType, TableFilters, } from "../../src/types";
import { EducationDataFromServerContext } from "./Homepage";
import RankedMaterialReactDataTable from "../components/TableSection/RankedDataTable";


export type FilterInfoType = {
    filters: TableFilters;
    setFilters: React.Dispatch<React.SetStateAction<TableFilters>>;
};


const DataTableSection: React.FC = ({ }) => {


    const [isCalculating, setisCalculating] = useState<boolean>(true);
    const [rankedData, setRankedData] = useState<FinalRankingType | null>(null);

    let data = useContext(EducationDataFromServerContext);


    console.log("rankedData", rankedData);

    useEffect(() => {
        if (data) {
            setisCalculating(false);
        }
    }, [data]);

    const [filters, setFilters] = useState<TableFilters>({
        wantedDegreeTypes: [],
        hasSubjects: [],
        canStudyAtInstitution: [],
        canStudyInGeographies: [],
        hasFormsOfEducation: [],
        educationDuration: { minimum: 0, maximum: 0 },
        wantedSalary: {
            newGraduate: { minimum: 0, maximum: 0 },
            experienced: { minimum: 0, maximum: 0 },
        },
        wantedWorkingHours: { minimum: 0, maximum: 0 },
        unemployment: {
            newGraduate: { minimum: 0, maximum: 0 },
            experienced: { minimum: 0, maximum: 0 },
        },
        hasFlexibleJobSchedule: false,
        canWorkInternationally: false,
    });

    const FilterInfo: FilterInfoType = {
        filters: filters,
        setFilters: setFilters
    };
    console.log("filters", filters)


    return (
        <div style={{ display: "flex", height: "80vh", width: "100%", maxWidth: "100vw" }}>
            <div style={{ width: "30%", height: "100%", minWidth: "417px", marginRight: "1em" }}>

                <FilterBoxComponent isCalculating={isCalculating} setIsCalculating={setisCalculating} setRankedData={setRankedData} filterInfo={FilterInfo} />
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
