
import Paper from '@mui/material/Paper';
import { useContext } from "react";
import { useState } from "react";
import { TableSectionDataContext, ModalContext } from "@frontend/pages/Homepage";
import { MultiSelectAutoComplete, MinimumDistanceSlider, CheckmarkToggleButton } from "./FilterInputComponents";
import { MinimumMaximum } from "@src/types"

export type FilterProps = {
    degreeTypes: string[];
    institutes: string[];
    geographies: string[];
    subjects: string[];
    formsOfEducation: string[];
    jobFlexibilities: string[];
    educationDuration: MinimumMaximum;
    newGraduateSalary: MinimumMaximum;
    experiencedSalary: MinimumMaximum;
    wantedWorkingHours: MinimumMaximum;
    canWorkInternationally: boolean;
};

const FilterBoxComponent = ({ }) => {

    // Obtain state from global context
    const data = useContext(TableSectionDataContext);
    const modalContext = useContext(ModalContext);

    // Keep track of all filters
    const [filters, setFilters] = useState<FilterProps>({
        degreeTypes: [],
        subjects: [],
        institutes: [],
        geographies: [],
        formsOfEducation: [],
        jobFlexibilities: [],
        educationDuration: { minimum: 0, maximum: 0 },
        newGraduateSalary: { minimum: 0, maximum: 0 },
        experiencedSalary: { minimum: 0, maximum: 0 },
        wantedWorkingHours: { minimum: 0, maximum: 0},
        canWorkInternationally: false,
    });

    // Value packing for salary sliders
    const newGraduateSalaryRange: MinimumMaximum = {
        minimum: data?.minimumValueEducation?.jobData.salaries.newGraduate.lowerQuartile ?? 0,
        maximum: data?.maximumValueEducation?.jobData.salaries.newGraduate.upperQuartile ?? 1
    };
    const experiencedSalaryRange: MinimumMaximum = {
        minimum: data?.minimumValueEducation?.jobData.salaries.experienced.lowerQuartile ?? 0,
        maximum: data?.maximumValueEducation?.jobData.salaries.experienced.upperQuartile ?? 1
    };

    // Value packing for working hours
    const wantedWorkingHoursRange: MinimumMaximum = {
        minimum: data?.minimumValueEducation?.jobData.workSchedule.workingHours ?? 0,
        maximum: data?.maximumValueEducation?.jobData.workSchedule.workingHours ?? 1,
    }

    // Utility function for showcasing value when moving sliders
    const getValueTextDuration = (value: number) => { return `${value} måneder`; }
    const getValueTextSalary = (value: number) => { return `${value}k kr.` }
    const getValueTextJobHours = (value: number) => { return `${value} timer` }



    return (

        <Paper elevation={2} style={{ marginRight: "1em", height: "100%", zIndex: 1, width: "100%", overflowY: "scroll" }}>
            <div style={{ height: "3.5em", position: "sticky", top: 0, zIndex: 2, borderBottom: "2px solid black", padding: 0, display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "white" }}>
                <h2 style={{ textAlign: "left", paddingLeft: "0.5em" }}>Filtre (scroll ned)</h2>
                <button className="primary-button" style={{ marginRight: "0.5em", borderRadius: 5 }} onClick={() => modalContext?.setShowModal(true)}>Quiz</button>
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
                        value={filters.subjects}
                        collection={data?.subjectKeys ?? []}
                        selectLabel="Filtrer efter interesse"
                        selectPlaceholder="Fag"
                        setFilters={setFilters}
                        identifier="subjects"
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
                    <MultiSelectAutoComplete
                        value={filters.formsOfEducation}
                        collection={data?.formOfEducationKeys ?? []}
                        selectLabel="Filtrer efter undervisningsform"
                        selectPlaceholder="Undervisningsform"
                        setFilters={setFilters}
                        identifier="formsOfEducation"
                    />
                    <MultiSelectAutoComplete
                        value={filters.jobFlexibilities}
                        collection={data?.jobFlexibilityKeys ?? []}
                        selectLabel="Filtrer efter fleksibilitet i muligt arbejde efter uddannelse"
                        selectPlaceholder="Fleksibilitet"
                        setFilters={setFilters}
                        identifier="jobFlexibilities"
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
                        initialState={newGraduateSalaryRange}
                        sliderRange={newGraduateSalaryRange}
                        minimumDistance={1}
                        description="Filtrer efter nyuddannedes løn i tusinde"
                        getValueText={getValueTextSalary}
                        setFilters={setFilters}
                        identifier="newGraduateSalary"
                    />

                    <MinimumDistanceSlider
                        initialState={experiencedSalaryRange}
                        sliderRange={experiencedSalaryRange}
                        minimumDistance={1}
                        description="Filtrer efter erfarenes løn i tusinde"
                        getValueText={getValueTextSalary}
                        setFilters={setFilters}
                        identifier="experiencedSalary"
                    />
                    <MinimumDistanceSlider
                        initialState={wantedWorkingHoursRange}
                        sliderRange={wantedWorkingHoursRange}
                        minimumDistance={1}
                        description="Filtrer efter arbejdstimer i muligt arbejde efter uddannelse"
                        getValueText={getValueTextJobHours}
                        setFilters={setFilters}
                        identifier="wantedWorkingHours"
                    />
                    <CheckmarkToggleButton
                        initialState={false}
                        description="Har internationale arbejdsmuligheder"
                        setFilters={setFilters}
                        identifier="canWorkInternationally"
                    />
                </>
            </div>
        </Paper>
    )

}

export default FilterBoxComponent;