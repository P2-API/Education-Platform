import MaterialReactDataTable from "../components/DataTable";
import { MultiSelectAutoComplete, MinimumDistanceSlider } from "../components/Filters";
import { useContext } from "react";
import { TableSectionDataContext } from "./Homepage";

import React from 'react';
import Paper from '@mui/material/Paper';



type DataTableSectionProps = {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};



const DataTableSection: React.FC<DataTableSectionProps> = ({ setIsModalOpen }) => {
    const getValueTextDuration = (value: number) => { return `${value} måneder`; }
    const getValueTextSalary = (value: number) => { return `${value}k kr.` }

    const data = useContext(TableSectionDataContext);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (

        <div style={{ display: "flex", height: "80vh" }}>
            <div style={{ width: "402px", height: "100%", minWidth: "402px", marginRight: "1em" }}>
                <Paper elevation={2} style={{ marginRight: "1em", height: "100%", zIndex: 1, width: "100%", overflowY: "scroll" }}>
                    <div style={{ height: "3.5em", position: "sticky", top: 0, zIndex: 2, borderBottom: "2px solid black", padding: 0, display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "white" }}>
                        <h2 style={{ textAlign: "left", paddingLeft: "0.5em" }}>Filtre (scroll ned)</h2>
                        <button className="primary-button" style={{ marginRight: "0.5em", borderRadius: 5 }} onClick={() => setIsModalOpen(true)}>Quiz</button>
                    </div>
                    <div style={{ padding: "1em", display: "grid", gap: "1em", height: "100%", overflowY: "auto" }}>
                        <>
                            <MultiSelectAutoComplete collection={data?.degreeTypesString ?? []} selectLabel="Filtrer efter uddannelsestype" selectPlaceholder="Uddannelsestype" />
                            <MultiSelectAutoComplete collection={data?.institutesString ?? []} selectLabel="Filtrer efter uddannelsessted" selectPlaceholder="Uddannelsessted" />
                            <MultiSelectAutoComplete collection={data?.geographiesString ?? []} selectLabel="Filtrer efter kommune" selectPlaceholder="Kommune" />
                            <MultiSelectAutoComplete collection={data?.geographiesString ?? []} selectLabel="Filtrer efter kommune" selectPlaceholder="Kommune" />
                            <MinimumDistanceSlider
                                initialState={data?.educationDurationRange ?? { minimum: 0, maximum: 0 }}
                                sliderRange={data?.educationDurationRange ?? { minimum: 0, maximum: 0 }}
                                minimumDistance={1}
                                description="Filtrer efter uddannelsesvarighed i måneder"
                                getValueText={getValueTextDuration}
                            />
                            <MinimumDistanceSlider
                                initialState={data?.newGraduateSalaryRange ?? { minimum: 0, maximum: 0 }}
                                sliderRange={data?.newGraduateSalaryRange ?? { minimum: 0, maximum: 0 }}
                                minimumDistance={1}
                                description="Filtrer efter nyuddannedes løn i tusinde"
                                getValueText={getValueTextSalary}
                            />

                            <MinimumDistanceSlider
                                initialState={data?.experiencedSalaryRange ?? { minimum: 0, maximum: 0 }}
                                sliderRange={data?.experiencedSalaryRange ?? { minimum: 0, maximum: 0 }}
                                minimumDistance={1}
                                description="Filtrer efter erfarenes løn i tusinde"
                                getValueText={getValueTextSalary}
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
        </div >
    );
};

export default DataTableSection;


