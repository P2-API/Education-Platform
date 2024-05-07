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
        if (newDuration.minimum != -1){
            educationDurationMin = Math.min(educationDurationMin, newDuration.minimum); 
            educationDurationMax = Math.max(educationDurationMax, newDuration.maximum);
        }        
    });

    const educationDurationRange: MinimumMaximum = {minimum: educationDurationMin, maximum: educationDurationMax};

    // Possible Educations
    let newGraduateSalaryMin = possibleEducations[0].job_data.salaries.newGraduate.lower_quartile;
    let experiencedSalaryMin = possibleEducations[0].job_data.salaries.experienced.lower_quartile;
    let newGraduateSalaryMax = possibleEducations[0].job_data.salaries.newGraduate.upper_quartile;
    let experiencedSalaryMax = possibleEducations[0].job_data.salaries.experienced.upper_quartile;
    possibleEducations.forEach((education) =>{
        newGraduateSalaryMin = Math.min(newGraduateSalaryMin, education.job_data.salaries.newGraduate.lower_quartile);
        experiencedSalaryMin = Math.min(experiencedSalaryMin, education.job_data.salaries.experienced.lower_quartile);
        newGraduateSalaryMax = Math.max(newGraduateSalaryMax, education.job_data.salaries.newGraduate.upper_quartile);
        experiencedSalaryMax = Math.max(experiencedSalaryMax, education.job_data.salaries.experienced.upper_quartile);
    });

    const newGraduateSalaryRange: MinimumMaximum = {minimum: newGraduateSalaryMin, maximum: newGraduateSalaryMax};
    const experiencedSalaryRange: MinimumMaximum = {minimum: experiencedSalaryMin, maximum: experiencedSalaryMax};

    return (
        <div style={{ height: "100vh", width: "100%", backgroundColor: "#f8fbff" }}>
            <div ref={tableRef} id="table" style={{ marginTop: "9vh", backgroundColor: "white" }} />
            <h1 style={{ textAlign: "center" }} className="text-color-blue">
                Uddannelser
            </h1>
            <div style={{ display: "flex", padding: "1em" }}>
                <div style={{ width: "30%", height: "100%", minWidth: "302px" }}>
                    <Paper elevation={2} style={{ marginRight: "1em" }}>
                        <div style={{ height: "3.5em", borderBottom: "2px solid black", padding: 0, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h2 style={{ textAlign: "left", paddingLeft: "0.5em" }}>Filtre</h2>
                            <button className="primary-button" style={{ marginRight: "0.5em", borderRadius: 5 }} onClick={() => setIsModalOpen(true)}>Quiz</button>
                        </div>
                        <div style={{ padding: "1em", display: "grid", gap: "1em" }}>
                            <MultiSelectAutoComplete collection={degreeTypesString} selectLabel="Filtrer efter uddannelsestype" selectPlaceholder="Uddannelsestype"/>
                            <MultiSelectAutoComplete collection={institutesString} selectLabel="Filtrer efter uddannelsessted" selectPlaceholder="Uddannelsessted"/>
                            <MultiSelectAutoComplete collection={geographiesString} selectLabel="Filtrer efter kommune" selectPlaceholder="Kommune"/>
                            <MinimumDistanceSlider initialState={educationDurationRange} sliderRange={educationDurationRange} minimumDistance={1}/>
                            
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


