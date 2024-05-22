import { AcademicFeedback, AcademicWorkload, DegreeContents, Education, EducationGroup, HoursSpentDoing, Industry, JobData, JobWorkSchedule, MinimumMaximum, Salary, SocialFeedback, Subject, EducationDataFromServer, Unemployment, EducationData } from "../../src/types";
import { GetEducationsOnServerStart } from "../utilities/csv_importer";
import { DegreeType, Institution, Geography, DegreeTypeToDuration, SubjectTitle, FormOfEducation } from "../../src/enums";

import { assignSubjectsToEducations } from "../utilities/web_scraper";

import * as fs from "fs";
import { educationToEducationGroup } from "../utilities/custom-type-conversion";
import deepCopy from "../utilities/deep-copy";
import { normilizesEducations } from "../utilities/normalization";

let educations: Education[] = [];
const educationGroups: EducationGroup[] = [];
let normilizedEducations: Education[] = [];
let educationProperties: string[] = [];

let degreeTypeKeys: (keyof typeof DegreeType)[];
let subjectKeys: (keyof typeof SubjectTitle)[];
let institutionKeys: (keyof typeof Institution)[];
let geographyKeys: (keyof typeof Geography)[];
let formOfEducationKeys: (keyof typeof FormOfEducation)[];


let minimumEducation: Education;
let maximumEducation: Education;

let lowestPercentage: number = 0;
let highestPercentage: number = 100;

let educationDurationRange: MinimumMaximum;


// Called from server.ts during startup
export const onStart = () => {
    cacheEducations();
    caclulateEnumTypes();
    calculateEducationProperties();
}

// Imports the educations from the csv file and runs some heavy 
// calculations on them
const cacheEducations = async () => {
    educations = await GetEducationsOnServerStart(); // Gets the educations through the csv importer
    caclulateBasedOnEducations(); // Runs some heavy calculations based on the imported educations    
}

export const getCachedEducations = (): Education[] => {
    return educations;
}


export const getNormalizedEducations = (): Education[] => {
    return normilizedEducations;
}

// Runs some heavy calculations based on the imported educations
const caclulateBasedOnEducations = () => {
    groupEducations();
    calculateMinimumAndMaximumEducation(educations);
    //processAllEducations();
    assignSubjectsToEducations(educations);
    assignSubjectsToEducations(normilizedEducations);
}

// Calculates the properties of the education object
const calculateEducationProperties = () => {
    const edu: Education = {
        url: "",
        rank: null,
        title: "",
        degreeType: DegreeType["Andre uddannelser"],
        counties: [],
        geographies: [],
        institution: Institution["?"],
        subjects: [],
        industries: [],
        hours: {
            withManyStudents: 0,
            withFewStudents: 0,
            withSupervision: 0
        },
        socialFeedback: {
            socialEnvironment: 0,
            groupEngagement: 0,
            loneliness: 0,
            stress: 0
        },
        academicFeedback: {
            academicEnvironment: 0,
            teacherEvaluation: 0,
            satisfaction: 0
        },
        academicWorkload: {
            lectures: 0,
            literature: 0,
            studentJob: 0
        },
        degreeStructure: {
            contents: {
                teaching: 0,
                exams: 0,
                internship: 0,
                internationalStay: 0
            },
            teachingMethods: []
        },
        dropoutRate: 0,
        jobData: {
            salaries: {
                newGraduate: {
                    lowerQuartile: 0,
                    median: 0,
                    upperQuartile: 0,
                    projectedDirection: ""
                },
                experienced: {
                    lowerQuartile: 0,
                    median: 0,
                    upperQuartile: 0,
                    projectedDirection: ""
                }
            },
            workSchedule: {
                workingHours: 0,
                fixedHoursPercent: 0,
                flexibleHoursPercent: 0,
                selfSchedulePercent: 0,
                variableSchedulePercent: 0,
                nightAndEveningShiftsPercent: 0
            },
            unemployment: {
                newGraduate: 0,
                experienced: 0,
                projectedNewGraduate: 0,
                projectedExperienced: 0
            },
            degreeRelevance: 0,
            degreePreparesForJob: 0,
            nationalJobs: 0
        }
    };
    educationProperties = recursivelyGetLeafProperties(edu);

}

// Recursively gets all the leaf properties of an object
// Meaning the ones which aren't themselves objects
const recursivelyGetLeafProperties = (object: { [key: string]: any } = Object, prefix: string = ""): string[] => {
    let array: string[] = [];
    for (let key in object) { // Search through all the keys in the object
        if (object[key] !== undefined && typeof object[key] === "object") { // If the key is an object, then search through that object
            const branches = recursivelyGetLeafProperties(object[key], prefix + key + ".");
            for (let branch in branches) {
                array.push(branches[branch]);
            }
        }
        else {
            if (typeof object[key] === 'string') continue;
            array.push(prefix + key);
        }
    }
    return array;
}

// Groups the educations based on their title
function groupEducations() {
    educations.forEach((education) => {
        var alreadyGrouped = false;
        educationGroups.forEach((groupedEducation) => {
            if (groupedEducation.title == education.title) alreadyGrouped = true;
        })
        if (!alreadyGrouped) educationGroups.push(educationToEducationGroup(education));
    });
    fs.writeFileSync("./Backend/cache/education_groups.ts", JSON.stringify(educationGroups));
}

export function getGroupedEducations(): EducationGroup[] {
    return educationGroups;
}

export const getEducationProperties = () => {
    return educationProperties;
}

// Gets the enum keys and stores them in variables
export const caclulateEnumTypes = () => {
    degreeTypeKeys = Object.keys(DegreeType) as (keyof typeof DegreeType)[];

    institutionKeys = Object.keys(Institution) as (keyof typeof Institution)[];

    geographyKeys = Object.keys(Geography) as (keyof typeof Geography)[];

    subjectKeys = Object.keys(SubjectTitle) as (keyof typeof SubjectTitle)[];

    formOfEducationKeys = Object.keys(FormOfEducation) as (keyof typeof FormOfEducation)[];

    calculateMinMaxDegreeDuration();
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

// Calculates the minimum and maximum values of the education object
// Then returns values in an education object
export const calculateMinimumAndMaximumEducation = (educations: Education[]) => {
    minimumEducation = deepCopy(educations[0]);
    minimumEducation.title = "minimum education";
    maximumEducation = deepCopy(educations[0]);
    maximumEducation.title = "maximum education";

    // Loop through all educations to find the minimum and maximum values
    educations.forEach((education) => {
        runAndAssignFunctionForEducation(minimumEducation, education, Math.min); // Finds the minimum of all properties in an education object
        runAndAssignFunctionForEducation(maximumEducation, education, Math.max); // Finds the maximum of all properties in an education object
    });

    // Runs some heavy calculations based on the minimum and maximum values
    calculateBasedOnMinimumAndMaximumEducation();
};

// Runs the function for each property in the education object
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

// If the property exists in the assignTo object, then 
// assign the return value of the function to the assignTo object
// Otherwise push the property to the assignTo object
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

// Reference runAndAssignFunctionForEducationSubject for a description
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
    // Calculate the lowest and highest percentage values
    calculateLowestAndHighestPercentage();

    // Normalizes the educations based on the minimum and maximum values
    normilizedEducations = normilizesEducations(educations);
}

const calculateLowestAndHighestPercentage = () => {
    lowestPercentage = minimumEducation.dropoutRate;
    highestPercentage = maximumEducation.dropoutRate;

    lowestPercentage = Math.min(lowestPercentage, minimumEducation.jobData.workSchedule.fixedHoursPercent);
    highestPercentage = Math.max(highestPercentage, maximumEducation.jobData.workSchedule.fixedHoursPercent);

    lowestPercentage = Math.min(lowestPercentage, minimumEducation.jobData.workSchedule.flexibleHoursPercent);
    highestPercentage = Math.max(highestPercentage, maximumEducation.jobData.workSchedule.flexibleHoursPercent);

    lowestPercentage = Math.min(lowestPercentage, minimumEducation.jobData.workSchedule.selfSchedulePercent);
    highestPercentage = Math.max(highestPercentage, maximumEducation.jobData.workSchedule.selfSchedulePercent);

    minimumEducation.industries.forEach((industry) => {
        lowestPercentage = Math.min(lowestPercentage, industry.share);
        highestPercentage = Math.max(highestPercentage, industry.share);
    });

    lowestPercentage = Math.min(lowestPercentage, minimumEducation.jobData.unemployment.newGraduate);
    highestPercentage = Math.max(highestPercentage, maximumEducation.jobData.unemployment.newGraduate);

    lowestPercentage = Math.min(lowestPercentage, minimumEducation.jobData.unemployment.experienced);
    highestPercentage = Math.max(highestPercentage, maximumEducation.jobData.unemployment.experienced);
}

export const getLowestPercentage = () => {
    return lowestPercentage;
}

export const getHighestPercentage = () => {
    return highestPercentage;
}

export const getEducationData = (): EducationData => {
    const normalizedAndNormalEducations = {
        normalized: normilizedEducations.filter((education) => education.subjects.length > 0),
        normal: educations
    }
    return normalizedAndNormalEducations;
}

// Uses the keys to calculate the minimum and maximum duration of a DegreeType
export const calculateMinMaxDegreeDuration = () => {
    let educationDurationMin = DegreeTypeToDuration(degreeTypeKeys[0], false).minimum; // Initial to a value in range
    let educationDurationMax = DegreeTypeToDuration(degreeTypeKeys[0], false).maximum; // Initial to a value in range
    degreeTypeKeys.forEach((degreeType) => { // Loop through all the keys of DegreeType
        let newDuration = DegreeTypeToDuration(degreeType, false); // Get the duration of the DegreeType
        if (newDuration.minimum != -1) { // Deprecated check probably
            educationDurationMin = Math.min(educationDurationMin, newDuration.minimum);
            educationDurationMax = Math.max(educationDurationMax, newDuration.maximum);
        }
    });
    educationDurationRange = { minimum: educationDurationMin, maximum: educationDurationMax }
}

export const getEducationDurationRange = (): MinimumMaximum => {
    return educationDurationRange;
}

// Get all the relevant data packed into an object
export const getTableSectionData = (): EducationDataFromServer => {
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
