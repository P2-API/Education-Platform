import MaterialReactDataTable from "../components/DataTable";
import { MultiSelectAutoComplete, MinimumDistanceSlider } from "../components/FilterComponents";
import { useContext } from "react";
import { TableSectionDataContext } from "./Homepage";

import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { MinimumMaximum } from "types";

type DataTableSectionProps = {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type FilterProps = {
    degreeTypes: string[];
    institutes: string[];
    geographies: string[];
    educationDuration: MinimumMaximum;
    newGraduateSalary: MinimumMaximum;
    experiencedSalary: MinimumMaximum;
};

const DataTableSection: React.FC<DataTableSectionProps> = ({ setIsModalOpen }) => {
    const getValueTextDuration = (value: number) => { return `${value} måneder`; }
    const getValueTextSalary = (value: number) => { return `${value}k kr.` }
    const data = useContext(TableSectionDataContext);

    // make a react state that keeps track of all filters and their values
    const [filters, setFilters] = useState<FilterProps>({
        degreeTypes: [],
        institutes: [],
        geographies: [],
        educationDuration: { minimum: 0, maximum: 0 },
        newGraduateSalary: { minimum: 0, maximum: 0 },
        experiencedSalary: { minimum: 0, maximum: 0 }
    });


    if (!data) {
        return <div>Loading...</div>;
    }

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        setFilters(prevFilters => ({
            ...prevFilters,
            [target.name]: target.value
        }));
    }

    console.log("filters", filters)

    return (
        <div style={{ display: "flex", height: "80vh", width: "100%", maxWidth: "100vw" }}>
            <div style={{ width: "30%", height: "100%", minWidth: "402px", marginRight: "1em" }}>
                <Paper elevation={2} style={{ marginRight: "1em", height: "100%", zIndex: 1, width: "100%", overflowY: "scroll" }}>
                    <div style={{ height: "3.5em", position: "sticky", top: 0, zIndex: 2, borderBottom: "2px solid black", padding: 0, display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "white" }}>
                        <h2 style={{ textAlign: "left", paddingLeft: "0.5em" }}>Filtre (scroll ned)</h2>
                        <button className="primary-button" style={{ marginRight: "0.5em", borderRadius: 5 }} onClick={() => setIsModalOpen(true)}>Quiz</button>
                    </div>
                    <div style={{ padding: "1em", display: "grid", gap: "1em", height: "100%", overflowY: "auto" }}>
                        <>
                            <MultiSelectAutoComplete
                                value={filters.degreeTypes}
                                collection={data?.degreeTypeKeys ?? []}
                                selectLabel="Filtrer efter uddannelsestype"
                                selectPlaceholder="Uddannelsestype"
                                setFilters={setFilters}
                                identifier="degreeTypes"
                            />
                            <MultiSelectAutoComplete
                                value={filters.institutes}
                                collection={data?.institutionKeys ?? []}
                                selectLabel="Filtrer efter uddannelsessted"
                                selectPlaceholder="Uddannelsessted"
                                setFilters={setFilters}
                                identifier="institutes"
                            />
                            <MultiSelectAutoComplete
                                value={filters.geographies}
                                collection={data?.geographyKeys ?? []}
                                selectLabel="Filtrer efter geografi"
                                selectPlaceholder="Geografi"
                                setFilters={setFilters}
                                identifier="geographies"
                            />
                            <MinimumDistanceSlider
                                initialState={data?.educationDurationRange ?? { minimum: 0, maximum: 0 }}
                                sliderRange={data?.educationDurationRange ?? { minimum: 0, maximum: 0 }}
                                minimumDistance={1}
                                description="Filtrer efter uddannelsesvarighed i måneder"
                                getValueText={getValueTextDuration}
                                setFilters={setFilters}
                                identifier="educationDuration"
                            />
                            <MinimumDistanceSlider
                                initialState={data?.newGraduateSalaryRange ?? { minimum: 0, maximum: 0 }}
                                sliderRange={data?.newGraduateSalaryRange ?? { minimum: 0, maximum: 0 }}
                                minimumDistance={1}
                                description="Filtrer efter nyuddannedes løn i tusinde"
                                getValueText={getValueTextSalary}
                                setFilters={setFilters}
                                identifier="newGraduateSalary"
                            />

                            <MinimumDistanceSlider
                                initialState={data?.experiencedSalaryRange ?? { minimum: 0, maximum: 0 }}
                                sliderRange={data?.experiencedSalaryRange ?? { minimum: 0, maximum: 0 }}
                                minimumDistance={1}
                                description="Filtrer efter erfarenes løn i tusinde"
                                getValueText={getValueTextSalary}
                                setFilters={setFilters}
                                identifier="experiencedSalary"
                            />

                        </>

                        <p>Filter efter uddannelsesstart</p>
                        <p>Filter efter uddannelsesform</p>
                        <p>Filter efter uddannelsesindhold</p>
                    </div>
                </Paper>
            </div>

            <div style={{ width: "70%" }}>
                <MaterialReactDataTable />
            </div>
        </div>
    );
};
export default DataTableSection;