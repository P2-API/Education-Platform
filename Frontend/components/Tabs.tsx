import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import DataTableSection from '@frontend/pages/DataTableSection';
import VisualisationSection from '@frontend/pages/VisualisationSection';
import React, { useState, createContext } from 'react';
import { QuizAnswers, FinalRankingType, TableFilters } from '@src/types';

export type rankedDataInfo = {
    rankedData: FinalRankingType | null;
    setRankedData: React.Dispatch<React.SetStateAction<FinalRankingType | null>>;
};

export type QuizInfoType = {
    quizData: QuizAnswers;
    setQuizData: React.Dispatch<React.SetStateAction<QuizAnswers>>;
    isQuizOpen: boolean;
    setIsQuizOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type FilterInfoType = {
    filters: TableFilters;
    setFilters: React.Dispatch<React.SetStateAction<TableFilters>>;
};

// create context 
const QuizInfoContext = createContext<QuizInfoType>({
    quizData: {
        subjectsPriority: 3,
        industriesPriority: 3,
        socialEnvironmentPriority: 3,
        groupEngagementPriority: 3,
        lonelinessPriority: 3,
        academicEnvironmentPriority: 3,
        stressPriority: 3,
        highWorkloadAcceptancePriority: 3,
        studentJobPriority: 3,
        teachingPriority: 3,
        lecturesPriority: 3,
        literaturePriority: 3,
        dislikeExamPriority: 3,
        internshipPriority: 3,
        internationalStayPriority: 3,
        workNationallyPriority: 3,
        startingSalaryPriority: 3,
        experiencedSalaryPriority: 3,
        unemploymentPriority: 3,
        degreeRelevancePriority: 3,
        flexibleHoursPriority: 3,
        selfSchedulePriority: 3,
        fixedHoursPriority: 3,
        variableSchedulePriority: 3,
        nightAndEveningShiftsPriority: 3,

    },
    setQuizData: () => { },
    isQuizOpen: false,
    setIsQuizOpen: () => { }
});

const filtersContext = createContext<FilterInfoType>({
    filters: {
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
    },
    setFilters: () => { }
});

export { QuizInfoContext, filtersContext };


type TabPanelProps = {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <span>{children}</span>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0); // index keeping track on whether to show data table or visualisation
    const [rankedData, setRankedData] = useState<FinalRankingType | null>(null);
    const [isQuizOpen, setIsQuizOpen] = useState(false);
    const [quizAnswerState, SetQuizAnswerState] = useState<QuizAnswers>(
        {
            subjectsPriority: 3,
            industriesPriority: 3,
            socialEnvironmentPriority: 3,
            groupEngagementPriority: 3,
            lonelinessPriority: 3,
            academicEnvironmentPriority: 3,
            stressPriority: 3,
            highWorkloadAcceptancePriority: 3,
            studentJobPriority: 3,
            teachingPriority: 3,
            lecturesPriority: 3,
            literaturePriority: 3,
            dislikeExamPriority: 3,
            internshipPriority: 3,
            internationalStayPriority: 3,
            workNationallyPriority: 3,
            startingSalaryPriority: 3,
            experiencedSalaryPriority: 3,
            unemploymentPriority: 3,
            degreeRelevancePriority: 3,
            flexibleHoursPriority: 3,
            selfSchedulePriority: 3,
            fixedHoursPriority: 3,
            variableSchedulePriority: 3,
            nightAndEveningShiftsPriority: 3,
        }
    );
    const [filters, setFilters] = useState<TableFilters>({
        wantedDegreeTypes: [],
        hasSubjects: [],
        canStudyAtInstitution: [],
        canStudyInGeographies: [],
        hasFormsOfEducation: [],
        educationDuration: { minimum: 0, maximum: 37 },
        wantedSalary: {
            newGraduate: { minimum: 0, maximum: 100 },
            experienced: { minimum: 0, maximum: 100 },
        },
        wantedWorkingHours: { minimum: 0, maximum: 60 },
        unemployment: {
            newGraduate: { minimum: 0, maximum: 50 },
            experienced: { minimum: 0, maximum: 40 },
        },
        hasFlexibleJobSchedule: false,
        canWorkInternationally: false,
    });


    const quizInfo: QuizInfoType = {
        quizData: quizAnswerState,
        setQuizData: SetQuizAnswerState,
        isQuizOpen: isQuizOpen,
        setIsQuizOpen: setIsQuizOpen
    };
    const rankedDataInfo: rankedDataInfo = {
        rankedData: rankedData,
        setRankedData: setRankedData
    };
    const filterInfo: FilterInfoType = {
        filters: filters,
        setFilters: setFilters
    };

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    return (
        <Box sx={{ width: '100vw', height: "75%" }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: "flex", justifyContent: "center", }}>
                <Tabs sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab sx={{ width: "200px", fontWeight: "bolder", fontSize: "larger", paddingTop: "14px", height: "100%" }} label="Rangering" {...a11yProps(0)} />
                    <Tab sx={{ width: "200px", fontWeight: "bolder", fontSize: "larger", paddingTop: "14px" }} label="Visualisering" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <QuizInfoContext.Provider value={quizInfo}>
                <filtersContext.Provider value={filterInfo}>
                    <CustomTabPanel value={value} index={0}>
                        <DataTableSection rankedDataInfo={rankedDataInfo} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <VisualisationSection rankedDataInfo={rankedDataInfo} />
                    </CustomTabPanel>
                </filtersContext.Provider>
            </QuizInfoContext.Provider>

        </Box>
    );
}