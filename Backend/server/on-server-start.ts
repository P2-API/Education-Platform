import { AcademicFeedback, AcademicWorkload, DegreeContents, Education, EducationGroup, HoursSpentDoing, Industry, JobData, JobWorkSchedule, MinimumMaximum, Salaries, Salary, SocialFeedback, Subject, TableSectionDataFromServer, Unemployment } from "../../src/types";
import { GetEducationsOnServerStart } from "../utilities/csv_importer";
import { DegreeType, Institution, Geography, DegreeTypeToDuration, SubjectTitle, FormOfEducation } from "../../src/enums";

import * as fs from "fs";
import { educationToEducationGroup } from "../utilities/custom-type-conversion";
import deepCopy from "../utilities/deep-copy";
import { normilizesEducations } from "../utilities/normalization";

let educations: Education[] = [];
let educationGroups: EducationGroup[] = [];
let normilizedEducations: Education[] = [];


let degreeTypeKeys: (keyof typeof DegreeType)[];
let subjectKeys: (keyof typeof SubjectTitle)[];
let institutionKeys: (keyof typeof Institution)[];
let geographyKeys: (keyof typeof Geography)[];
let formOfEducationKeys: (keyof typeof FormOfEducation)[];


let minimumEducation: Education;
let maximumEducation: Education;

export const onStart = () => {
    cacheEducations();
}

const cacheEducations = async () => {
    educations = await GetEducationsOnServerStart(); // Gets the educations through the csv importer
    caclulateBasedOnEducations(); // Runs some heavy calculations based on the imported educations    
}

export const getCachedEducations = (): Education[] => {
    return educations;
}

const caclulateBasedOnEducations = () => {
    // ("caclulateBasedOnEducations");
    groupEducations(); 
    caclulateEnumTypes();
    calculateMinimumAndMaximumEducation(educations);
    calculateMinMaxDegreeDuration();
}

function groupEducations() {
    educations.forEach((education) => {
        var alreadyGrouped = false;
        educationGroups.forEach((groupedEducation) => {
            if (groupedEducation.title == education.title) alreadyGrouped = true;
        })
        if (!alreadyGrouped) educationGroups.push(educationToEducationGroup(education));
    });
    fs.writeFileSync("./Backend/cache/education_groups.ts", JSON.stringify(educationGroups));
    console.log("thomas, tallet er det her :)-> ", educationGroups.length);
}

export const caclulateEnumTypes = () => {
    // ("calculateEnumTypes");
    degreeTypeKeys = Object.keys(DegreeType) as (keyof typeof DegreeType)[];

    institutionKeys = Object.keys(Institution) as (keyof typeof Institution)[];

    geographyKeys = Object.keys(Geography) as (keyof typeof Geography)[];

    subjectKeys = Object.keys(SubjectTitle) as (keyof typeof SubjectTitle)[];

    formOfEducationKeys = Object.keys(FormOfEducation) as (keyof typeof FormOfEducation)[];
}

export const getSubjectKeys = () => {
    return subjectKeys;
}

export const getDegreeTypeKeys = () => {
    return degreeTypeKeys;
}

export const getInstitutionKeys = () => {
    return institutionKeys;
}

export const getGeographyKeys = () => {
    return geographyKeys;
}

export const calculateMinimumAndMaximumEducation = (educations: Education[]) => {
    minimumEducation = deepCopy(educations[0]);
    minimumEducation.title = "minimum education";
    maximumEducation = deepCopy(educations[0]);
    maximumEducation.title = "maximum education";

    educations.forEach((education) => {
        runAndAssignFunctionForEducation(minimumEducation, education, Math.min); // recursively finds the minimum of all properties
        runAndAssignFunctionForEducation(maximumEducation, education, Math.max);
    });

    calculateBasedOnMinimumAndMaximumEducation();
};

const runAndAssignFunctionForEducation = (assignTo: Education, compare: Education, func: (number1: number, number2: number) => number) => {
    assignTo.rank = func(assignTo.rank ? assignTo.rank : -1, compare.rank ? compare.rank : -1);
    runAndAssignFunctionForEducationSubject(assignTo.subjects, compare.subjects, func);
    runAndAssignFunctionForEducationIndustry(assignTo.industries, compare.industries, func);
    runAndAssignFunctionForEducationHours(assignTo.hours, compare.hours, func);
    runAndAssignFunctionForEducationSocialFeedback(assignTo.socialFeedback, compare.socialFeedback, func);
    runAndAssignFunctionForEducationAcademicFeedback(assignTo.academicFeedback, compare.academicFeedback, func);
    runAndAssignFunctionForEducationAcademicWorkload(assignTo.academicWorkload, compare.academicWorkload, func);
    runAndAssignFunctionForEducationDegreeStructureContents(assignTo.degreeStructure.contents, compare.degreeStructure.contents, func);
    assignTo.dropoutRate = func(assignTo.dropoutRate, compare.dropoutRate);
    runAndAssignFunctionForEducationJobData(assignTo.jobData, compare.jobData, func);
}

const runAndAssignFunctionForEducationSubject = (assignTo: Subject[], compare: Subject[], func: (number1: number, number2: number) => number) => {
    compare.forEach(compareSubject => {
        let exists = false;
        assignTo.forEach(assignSubject => {
            if (assignSubject.title == compareSubject.title) {
                exists = true;
                assignSubject.score = func(assignSubject.score, compareSubject.score);
            }
        })

        if (exists == false) {
            assignTo.push(compareSubject);
        }
    })
}

const runAndAssignFunctionForEducationIndustry = (assignTo: Industry[], compare: Industry[], func: (number1: number, number2: number) => number) => {
    compare.forEach(compareIndustry => {
        let exists = false;
        assignTo.forEach(assignIndustry => {
            if (assignIndustry.title == compareIndustry.title) {
                exists = true;
                assignIndustry.share = func(assignIndustry.share, compareIndustry.share);
            }
        })

        if (exists == false) {
            assignTo.push(compareIndustry);
        }
    })
}

const runAndAssignFunctionForEducationHours = (assignTo: HoursSpentDoing, compare: HoursSpentDoing, func: (number1: number, number2: number) => number) => {
    assignTo.withManyStudents = func(assignTo.withManyStudents, compare.withManyStudents);
    assignTo.withFewStudents = func(assignTo.withFewStudents, compare.withFewStudents);
    assignTo.withSupervision = func(assignTo.withSupervision, compare.withSupervision);
}

const runAndAssignFunctionForEducationSocialFeedback = (assignTo: SocialFeedback, compare: SocialFeedback, func: (number1: number, number2: number) => number) => {
    assignTo.socialEnvironment = func(assignTo.socialEnvironment, compare.socialEnvironment);
    assignTo.groupEngagement = func(assignTo.groupEngagement, compare.groupEngagement);
    assignTo.loneliness = func(assignTo.loneliness, compare.loneliness);
    assignTo.stress = func(assignTo.stress, compare.stress);
}

const runAndAssignFunctionForEducationAcademicFeedback = (assignTo: AcademicFeedback, compare: AcademicFeedback, func: (number1: number, number2: number) => number) => {
    assignTo.academicEnvironment = func(assignTo.academicEnvironment, compare.academicEnvironment);
    assignTo.teacherEvaluation = func(assignTo.teacherEvaluation, compare.teacherEvaluation);
    assignTo.satisfaction = func(assignTo.satisfaction, compare.satisfaction);
}

const runAndAssignFunctionForEducationAcademicWorkload = (assignTo: AcademicWorkload, compare: AcademicWorkload, func: (number1: number, number2: number) => number) => {
    assignTo.lectures = func(assignTo.lectures, compare.lectures);
    assignTo.literature = func(assignTo.literature, compare.literature);
    assignTo.studentJob = func(assignTo.studentJob, compare.studentJob);
}

const runAndAssignFunctionForEducationDegreeStructureContents = (assignTo: DegreeContents, compare: DegreeContents, func: (number1: number, number2: number) => number) => {
    assignTo.teaching = func(assignTo.teaching, compare.teaching);
    assignTo.exams = func(assignTo.exams, compare.exams);
    assignTo.internship = func(assignTo.internship, compare.internship);
    assignTo.internationalStay = func(assignTo.internationalStay, compare.internationalStay);
}

const runAndAssignFunctionForEducationJobData = (assignTo: JobData, compare: JobData, func: (number1: number, number2: number) => number) => {
    runAndAssignFunctionForEducationJobDataSalaries(assignTo.salaries.newGraduate, compare.salaries.newGraduate, func);
    runAndAssignFunctionForEducationJobDataSalaries(assignTo.salaries.experienced, compare.salaries.experienced, func);
    runAndAssignFunctionForEducationJobDataWorkSchedule(assignTo.workSchedule, compare.workSchedule, func);
    runAndAssignFunctionForEducationJobDataUnemployment(assignTo.unemployment, compare.unemployment, func);
    assignTo.degreeRelevance = func(assignTo.degreeRelevance, compare.degreeRelevance);
    assignTo.degreePreparesForJob = func(assignTo.degreePreparesForJob, compare.degreePreparesForJob);
    assignTo.nationalJobs = func(assignTo.nationalJobs, compare.nationalJobs);
}

const runAndAssignFunctionForEducationJobDataSalaries = (assignTo: Salary, compare: Salary, func: (number1: number, number2: number) => number) => {
    assignTo.lowerQuartile = func(assignTo.lowerQuartile, compare.lowerQuartile);
    assignTo.median = func(assignTo.median, compare.median);
    assignTo.upperQuartile = func(assignTo.upperQuartile, compare.upperQuartile);
}

const runAndAssignFunctionForEducationJobDataWorkSchedule = (assignTo: JobWorkSchedule, compare: JobWorkSchedule, func: (number1: number, number2: number) => number) => {
    assignTo.workingHours = func(assignTo.workingHours, compare.workingHours);
    assignTo.fixedHoursPercent = func(assignTo.fixedHoursPercent, compare.fixedHoursPercent);
    assignTo.flexibleHoursPercent = func(assignTo.flexibleHoursPercent, compare.flexibleHoursPercent);
    assignTo.selfSchedulePercent = func(assignTo.selfSchedulePercent, compare.selfSchedulePercent);
    assignTo.variableSchedulePercent = func(assignTo.variableSchedulePercent, compare.variableSchedulePercent);
    assignTo.nightAndEveningShiftsPercent = func(assignTo.nightAndEveningShiftsPercent, compare.nightAndEveningShiftsPercent);
}

const runAndAssignFunctionForEducationJobDataUnemployment = (assignTo: Unemployment, compare: Unemployment, func: (number1: number, number2: number) => number) => {
    assignTo.newGraduate = func(assignTo.newGraduate, compare.newGraduate);
    assignTo.experienced = func(assignTo.experienced, compare.experienced);
    assignTo.projectedNewGraduate = func(assignTo.projectedNewGraduate, compare.projectedNewGraduate);
    assignTo.projectedExperienced = func(assignTo.projectedExperienced, compare.projectedExperienced);
}

export const getMinimumEducation = (): Education => {
    return minimumEducation;
}

export const getMaximumEducation = (): Education => {
    return maximumEducation;
}

const calculateBasedOnMinimumAndMaximumEducation = () => {
    // ("calculateBasedOnMinimumAndMaximumEducation");
    normilizedEducations = normilizesEducations(educations);
}

let educationDurationRange: MinimumMaximum;

export const calculateMinMaxDegreeDuration = (): MinimumMaximum => {
    // ("caclulateMinMaxDegreeDuration");

    let educationDurationMin = DegreeTypeToDuration(degreeTypeKeys[0]).minimum;
    let educationDurationMax = DegreeTypeToDuration(degreeTypeKeys[0]).maximum;
    degreeTypeKeys.forEach((degreeType) => {
        let newDuration = DegreeTypeToDuration(degreeType);
        if (newDuration.minimum != -1) {
            educationDurationMin = Math.min(educationDurationMin, newDuration.minimum);
            educationDurationMax = Math.max(educationDurationMax, newDuration.maximum);
        }
    });
    educationDurationRange = { minimum: educationDurationMin, maximum: educationDurationMax }
    return educationDurationRange;
}

const getEducationDurationRange = (): MinimumMaximum => {
    return educationDurationRange;
}

export const getTableSectionData = (): TableSectionDataFromServer => {
    return {
        educations: educations,

        degreeTypeKeys: degreeTypeKeys,
        subjectKeys: subjectKeys,
        institutionKeys: institutionKeys,
        geographyKeys: geographyKeys,
        formOfEducationKeys: formOfEducationKeys,

        educationDurationRange: educationDurationRange,

        minimumValueEducation: minimumEducation,
        maximumValueEducation: maximumEducation,
    }
}

