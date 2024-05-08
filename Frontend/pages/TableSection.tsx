import MaterialReactDataTable from "../components/DataTable";
import { DegreeType, DegreeTypeToDuration, Geography, Institution } from "../../src/enums";
import { MultiSelectAutoComplete, MinimumDistanceSlider } from "../components/Filters";
import { Education, MinimumMaximum } from "types";

import React from 'react';
import Paper from '@mui/material/Paper';




type TableSectionProps = {
    tableRef: React.RefObject<HTMLDivElement>;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    possibleEducations: Education[];
};



const TableSection: React.FC<TableSectionProps> = ({ tableRef, setIsModalOpen, possibleEducations }) => {
    // Enum Lists
    const degreeTypeKeys: (keyof typeof DegreeType)[] = Object.keys(DegreeType)
        .filter(key => isNaN(Number(key))) as (keyof typeof DegreeType)[];
    const degreeTypes: DegreeType[] = degreeTypeKeys.map(key => DegreeType[key]);

    const institutionKeys: (keyof typeof Institution)[] = Object.keys(Institution)
        .filter(key => isNaN(Number(key))) as (keyof typeof Institution)[];
    const institutes: Institution[] = institutionKeys.map(key => Institution[key]);

    const geographyKeys: (keyof typeof Geography)[] = Object.keys(Geography)
        .filter(key => isNaN(Number(key))) as (keyof typeof Geography)[];
    const geographies: Geography[] = geographyKeys.map(key => Geography[key]);

    const degreeTypesString = degreeTypeKeys.map(value => value.toString());
    const institutesString = institutionKeys.map(value => value.toString());
    const geographiesString = geographyKeys.map(value => value.toString());

    // Education Duration Slider
    let educationDurationMin = DegreeTypeToDuration(degreeTypes[0]).minimum;
    let educationDurationMax = DegreeTypeToDuration(degreeTypes[0]).maximum;
    degreeTypes.forEach((degreeType) => {
        let newDuration = DegreeTypeToDuration(degreeType);
        if (newDuration.minimum != -1) {
            educationDurationMin = Math.min(educationDurationMin, newDuration.minimum);
            educationDurationMax = Math.max(educationDurationMax, newDuration.maximum);
        }
    });

    const educationDurationRange: MinimumMaximum = { minimum: educationDurationMin, maximum: educationDurationMax };
    const getValueTextDuration = (value: number) => { return `${value} måneder`; }

    // Possible Educations
    let newGraduateSalaryMin: number;
    let experiencedSalaryMin: number;
    let newGraduateSalaryMax: number;
    let experiencedSalaryMax: number;

    let newGraduateSalaryRange: MinimumMaximum = { minimum: -1, maximum: -1 };
    let experiencedSalaryRange: MinimumMaximum = { minimum: -1, maximum: -1 };

    if (possibleEducations.length > 0) {
        newGraduateSalaryMin = possibleEducations[0].job_data.salaries.newGraduate.lower_quartile;
        experiencedSalaryMin = possibleEducations[0].job_data.salaries.experienced.lower_quartile;
        newGraduateSalaryMax = possibleEducations[0].job_data.salaries.newGraduate.upper_quartile;
        experiencedSalaryMax = possibleEducations[0].job_data.salaries.experienced.upper_quartile;
        possibleEducations.forEach((education) => {
            newGraduateSalaryMin = Math.min(newGraduateSalaryMin, education.job_data.salaries.newGraduate.lower_quartile);
            experiencedSalaryMin = Math.min(experiencedSalaryMin, education.job_data.salaries.experienced.lower_quartile);
            newGraduateSalaryMax = Math.max(newGraduateSalaryMax, education.job_data.salaries.newGraduate.upper_quartile);
            experiencedSalaryMax = Math.max(experiencedSalaryMax, education.job_data.salaries.experienced.upper_quartile);
        });
        newGraduateSalaryRange = { minimum: newGraduateSalaryMin, maximum: newGraduateSalaryMax };
        experiencedSalaryRange = { minimum: experiencedSalaryMin, maximum: experiencedSalaryMax };
    }

    const getValueTextSalary = (value: number) => { return `${value}k kr.` }

    // Misc


    return (
        <div style={{ height: "100vh", width: "100%", backgroundColor: "#f8fbff" }}>
            <div ref={tableRef} id="table" style={{ marginTop: "9vh", backgroundColor: "white" }} />
            <h1 style={{ textAlign: "center" }} className="text-color-blue">
                Uddannelser
            </h1>
            <div style={{ display: "flex", padding: "1em", height: "80%" }}>
                <div style={{ width: "30%", height: "100%", minWidth: "302px" }}>
                    <Paper elevation={2} style={{ marginRight: "1em", height: "100%", zIndex: 1, overflowY: "scroll" }}>
                        <div style={{ height: "3.5em", position: "sticky", top: 0, zIndex: 2, borderBottom: "2px solid black", padding: 0, display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "white" }}>
                            <h2 style={{ textAlign: "left", paddingLeft: "0.5em" }}>Filtre (scroll ned)</h2>
                            <button className="primary-button" style={{ marginRight: "0.5em", borderRadius: 5 }} onClick={() => setIsModalOpen(true)}>Quiz</button>
                        </div>
                        <div style={{ padding: "1em", display: "grid", gap: "1em", height: "100%" }}>
                            <MultiSelectAutoComplete collection={degreeTypesString} selectLabel="Filtrer efter uddannelsestype" selectPlaceholder="Uddannelsestype" />
                            <MultiSelectAutoComplete collection={institutesString} selectLabel="Filtrer efter uddannelsessted" selectPlaceholder="Uddannelsessted" />
                            <MultiSelectAutoComplete collection={geographiesString} selectLabel="Filtrer efter kommune" selectPlaceholder="Kommune" />
                            <MultiSelectAutoComplete collection={geographiesString} selectLabel="Filtrer efter kommune" selectPlaceholder="Kommune" />
                            <MinimumDistanceSlider
                                initialState={educationDurationRange}
                                sliderRange={educationDurationRange}
                                minimumDistance={1}
                                description="Filtrer efter uddannelsesvarighed i måneder"
                                getValueText={getValueTextDuration}
                            />
                            {(possibleEducations.length > 0) && (
                                <MinimumDistanceSlider
                                    initialState={newGraduateSalaryRange}
                                    sliderRange={newGraduateSalaryRange}
                                    minimumDistance={1}
                                    description="Filtrer efter nyuddannedes løn i tusinde"
                                    getValueText={getValueTextSalary}
                                />
                            )}
                            {(possibleEducations.length > 0) && (
                                <MinimumDistanceSlider
                                    initialState={experiencedSalaryRange}
                                    sliderRange={experiencedSalaryRange}
                                    minimumDistance={1}
                                    description="Filtrer efter erfarenes løn i tusinde"
                                    getValueText={getValueTextSalary}
                                />
                            )}

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
        </div >
    );
};

export default TableSection;


