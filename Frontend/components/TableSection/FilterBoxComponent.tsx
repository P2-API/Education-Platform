
import Paper from '@mui/material/Paper';
import { useContext, useEffect, useState } from "react";
import { EducationDataFromServerContext } from "@frontend/pages/Homepage";
import { MultiSelectAutoComplete, MinimumDistanceSlider, CheckmarkToggleButton } from "./FilterInputComponents";
import { MinimumMaximum, FinalRankingType } from "@src/types"
import { bouncy } from 'ldrs';
import QuizModal from "@frontend/pages/QuizModal"
import { useServer } from '@backend/server/useServer';
import { QuizInfoContext } from '../Tabs';
import { FilterInfoType } from '@frontend/components/Tabs';



type FilterBoxComponentProps = {
    isCalculating: Boolean;
    setIsCalculating: React.Dispatch<React.SetStateAction<boolean>>;
    setRankedData: React.Dispatch<React.SetStateAction<FinalRankingType | null>>;
    filterInfo: FilterInfoType
}



const FilterBoxComponent: React.FC<FilterBoxComponentProps> = ({ isCalculating, setIsCalculating, setRankedData, filterInfo }) => {
    const data = useContext(EducationDataFromServerContext);

    const quizAnswerState = useContext(QuizInfoContext)?.quizData;
    const SetQuizAnswerState = useContext(QuizInfoContext)?.setQuizData;
    const isModalOpen = useContext(QuizInfoContext)?.isQuizOpen;
    const setIsModalOpen = useContext(QuizInfoContext)?.setIsQuizOpen;



    // Value packing for salary sliders
    const newGraduateSalaryRange: MinimumMaximum = {
        minimum: data?.minimumValueEducation?.jobData.salaries.newGraduate.lowerQuartile ?? 0,
        maximum: data?.maximumValueEducation?.jobData.salaries.newGraduate.upperQuartile ?? 1
    };
    const experiencedSalaryRange: MinimumMaximum = {
        minimum: data?.minimumValueEducation?.jobData.salaries.experienced.lowerQuartile ?? 0,
        maximum: data?.maximumValueEducation?.jobData.salaries.experienced.upperQuartile ?? 1
    };
    // Value packing for working hours slider
    const wantedWorkingHoursRange: MinimumMaximum = {
        minimum: data?.minimumValueEducation?.jobData.workSchedule.workingHours ?? 0,
        maximum: data?.maximumValueEducation?.jobData.workSchedule.workingHours ?? 1,
    }

    // Value packing for unemployment sliders
    const newGraduateUnemploymentRange: MinimumMaximum = {
        minimum: data?.minimumValueEducation?.jobData.unemployment.newGraduate ?? 0,
        maximum: data?.maximumValueEducation?.jobData.unemployment.newGraduate ?? 1,
    }
    const experiencedUnemploymentRange: MinimumMaximum = {
        minimum: data?.minimumValueEducation?.jobData.unemployment.experienced ?? 0,
        maximum: data?.maximumValueEducation?.jobData.unemployment.experienced ?? 1,
    }



    const { filters, setFilters } = filterInfo;


    useEffect(() => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            wantedSalary: {
                newGraduate: newGraduateSalaryRange,
                experienced: experiencedSalaryRange
            },
            wantedWorkingHours: wantedWorkingHoursRange,
            unemployment: {
                newGraduate: newGraduateUnemploymentRange,
                experienced: experiencedUnemploymentRange
            },
            educationDuration: data?.educationDurationRange ?? { minimum: 0, maximum: 36 }
        }));
    }, [data]);
    // Utility function for showcasing value when moving sliders
    const getValueTextDuration = (value: number) => { return `${value} måneder`; }
    const getValueTextSalary = (value: number) => { return `${value}k kr.` }
    const getValueTextJobHours = (value: number) => { return `${value} timer` }
    const getValueTextUnemployment = (value: number) => { return `${value}%` }



    // rank degrees: 
    const { updateRanking } = useServer();
    const rankDegrees = async () => {
        setIsCalculating(true);
        setFilters(internalFilters);
        const response = await updateRanking(internalFilters, quizAnswerState,);
        setRankedData(response);
        setIsCalculating(false);
    }
    const [internalFilters, setInternalFilters] = useState(filters); // Initialize with filters directly

    useEffect(() => {
        setInternalFilters(filters); // Update internalFilters whenever filters change
    }, [filters]);

    bouncy.register()
    return (
        <>
            <QuizModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setQuizAnswerState={SetQuizAnswerState} quizAnswerState={quizAnswerState} filters={filterInfo.filters} setRankedData={setRankedData} setIsCalculating={setIsCalculating} />
            <Paper elevation={2} style={{ marginRight: "1em", height: "100%", zIndex: 1, width: "100%", overflowY: "scroll", scrollbarWidth: "none" }}>

                {isCalculating ? (
                    <div style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
                        <l-bouncy
                            size="70"
                            speed="1.75"
                            color="#006eff"
                        ></l-bouncy>
                    </div>

                ) : (
                    <>
                        <div style={{ height: "3.5em", position: "sticky", top: 0, zIndex: 2, borderBottom: "2px solid black", padding: 0, display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "white" }}>
                            <h2 style={{ textAlign: "left", paddingLeft: "0.5em" }}>Filtre</h2>
                            <button className="primary-button" style={{ marginRight: "0.5em", borderRadius: 5 }} onClick={() => setIsModalOpen(true)}>Quiz</button>
                        </div>
                        <div style={{ padding: "1em", display: "grid", gap: "1em", height: "100%", overflowY: "scroll", scrollbarColor: "red", scrollbarWidth: "thin" }}>
                            <>
                                <MultiSelectAutoComplete
                                    givenValue={internalFilters.wantedDegreeTypes}
                                    collection={data?.degreeTypeKeys ?? []}
                                    selectLabel="Filtrer efter uddannelsestype"
                                    selectPlaceholder="Uddannelsestype"
                                    setFilters={setInternalFilters}
                                    identifier="wantedDegreeTypes"
                                />
                                <MultiSelectAutoComplete
                                    givenValue={internalFilters.hasSubjects}
                                    collection={data?.subjectKeys ?? []}
                                    selectLabel="Filtrer efter interesse"
                                    selectPlaceholder="Fag"
                                    setFilters={setInternalFilters}
                                    identifier="hasSubjects"
                                />
                                <MultiSelectAutoComplete
                                    givenValue={internalFilters.canStudyAtInstitution}
                                    collection={data?.institutionKeys ?? []}
                                    selectLabel="Filtrer efter uddannelsessted"
                                    selectPlaceholder="Uddannelsessted"
                                    setFilters={setInternalFilters}
                                    identifier="canStudyAtInstitution"
                                />
                                <MultiSelectAutoComplete
                                    givenValue={internalFilters.canStudyInGeographies}
                                    collection={data?.geographyKeys ?? []}
                                    selectLabel="Filtrer efter geografi"
                                    selectPlaceholder="Geografi"
                                    setFilters={setInternalFilters}
                                    identifier="canStudyInGeographies"
                                />
                                <MultiSelectAutoComplete
                                    givenValue={internalFilters.hasFormsOfEducation}
                                    collection={data?.formOfEducationKeys ?? []}
                                    selectLabel="Filtrer efter undervisningsform"
                                    selectPlaceholder="Undervisningsform"
                                    setFilters={setInternalFilters}
                                    identifier="hasFormsOfEducation"
                                />
                                <MinimumDistanceSlider
                                    initialState={data?.educationDurationRange ?? { minimum: 0, maximum: 0 }}
                                    sliderRange={data?.educationDurationRange ?? { minimum: 0, maximum: 0 }}
                                    givenValue={internalFilters.educationDuration}
                                    minimumDistance={1}
                                    description="Filtrer efter uddannelsesvarighed i måneder"
                                    getValueText={getValueTextDuration}
                                    setFilters={setInternalFilters}
                                    identifier="educationDuration"
                                />
                                <MinimumDistanceSlider
                                    initialState={newGraduateSalaryRange}
                                    sliderRange={newGraduateSalaryRange}
                                    givenValue={internalFilters.wantedSalary.newGraduate}
                                    minimumDistance={1}
                                    description="Filtrer efter nyuddannedes løn i tusinde"
                                    getValueText={getValueTextSalary}
                                    setFilters={setInternalFilters}
                                    identifier="salary.newGraduate"
                                />
                                <MinimumDistanceSlider
                                    initialState={experiencedSalaryRange}
                                    sliderRange={experiencedSalaryRange}
                                    givenValue={internalFilters.wantedSalary.experienced}
                                    minimumDistance={1}
                                    description="Filtrer efter erfarenes løn i tusinde"
                                    getValueText={getValueTextSalary}
                                    setFilters={setInternalFilters}
                                    identifier="salary.experienced"
                                />
                                <MinimumDistanceSlider
                                    initialState={wantedWorkingHoursRange}
                                    sliderRange={wantedWorkingHoursRange}
                                    givenValue={internalFilters.wantedWorkingHours}
                                    minimumDistance={1}
                                    description="Filtrer efter arbejdstimer i muligt arbejde efter uddannelse"
                                    getValueText={getValueTextJobHours}
                                    setFilters={setInternalFilters}
                                    identifier="wantedWorkingHours"
                                />
                                <MinimumDistanceSlider
                                    initialState={newGraduateUnemploymentRange}
                                    sliderRange={newGraduateUnemploymentRange}
                                    givenValue={internalFilters.unemployment.newGraduate}
                                    minimumDistance={1}
                                    description="Filtrer efter nyuddannedes arbejdsløshed"
                                    getValueText={getValueTextUnemployment}
                                    setFilters={setInternalFilters}
                                    identifier="unemployment.newGraduate"
                                />
                                <MinimumDistanceSlider
                                    initialState={experiencedUnemploymentRange}
                                    sliderRange={experiencedUnemploymentRange}
                                    givenValue={internalFilters.unemployment.experienced}
                                    minimumDistance={1}
                                    description="Filtrer efter erfarenes arbejdsløshed"
                                    getValueText={getValueTextUnemployment}
                                    setFilters={setInternalFilters}
                                    identifier="unemployment.experienced"
                                />
                                <CheckmarkToggleButton
                                    initialState={internalFilters.canWorkInternationally}
                                    description="Har internationale arbejdsmuligheder"
                                    setFilters={setInternalFilters}
                                    identifier="canWorkInternationally"
                                />
                                <CheckmarkToggleButton
                                    initialState={internalFilters.hasFlexibleJobSchedule}
                                    description="Har fleksibelt arbejdstidsskema"
                                    setFilters={setInternalFilters}
                                    identifier="hasFlexibleJobSchedule"
                                />
                                <span style={{ color: "#006eff" }} >Du har ramt bunden</span>
                            </>
                        </div>
                        <div style={{ height: "3.5em", position: "sticky", borderTop: "1px solid black", bottom: 0, zIndex: 2, padding: 0, display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "white" }}>
                            <span style={{ textAlign: "left", paddingLeft: "0.5em" }}>Scroll ned</span>
                            <button className="primary-button" style={{ marginRight: "0.5em", borderRadius: 5 }} onClick={rankDegrees}>Beregn</button>
                        </div>
                    </>
                )
                }

            </Paper >

        </>


    );
}

export default FilterBoxComponent;