import { Geography, County, Institution, DegreeType, JobFlexibility } from "./enums";
export type Industry = {
    title: string;
    share: number;
};
export type HoursSpentDoing = {
    withManyStudents: number;
    withFewStudents: number;
    withSupervision: number;
};
export type SocialFeedback = {
    socialEnvironment: number;
    groupEngagement: number;
    loneliness: number;
    stress: number;
};
export type AcademicFeedback = {
    academicEnvironment: number;
    teacherEvaluation: number;
    satisfaction: number;
};
export type AcademicWorkload = {
    lectures: number;
    literature: number;
    studentJob: number;
};
export type DegreeContents = {
    teaching: number;
    exams: number;
    internship: number;
    internationalStay: number;
};
export type DegreeStructure = {
    contents: DegreeContents;
    teachingMethods: string[];
};
export type Salary = {
    lowerQuartile: number;
    median: number;
    upperQuartile: number;
    projectedDirection: string;
};
export type Unemployment = {
    newGraduate: number;
    experienced: number;
    projectedNewGraduate: number;
    projectedExperienced: number;
};
export type JobWorkSchedule = {
    workingHours: number;
    fixedHoursPercent: number;
    flexibleHoursPercent: number;
    selfSchedulePercent: number;
    variableSchedulePercent: number;
    nightAndEveningShiftsPercent: number;
};
export type Salaries = {
    newGraduate: Salary;
    experienced: Salary;
};
export type JobData = {
    salaries: Salaries;
    workSchedule: JobWorkSchedule;
    unemployment: Unemployment;
    degreeRelevance: number;
    degreePreparesForJob: number;
    nationalJobs: number;
};
export type Education = {
    url: string;
    rank: number | null;
    title: string;
    degreeType: DegreeType;
    counties: County[];
    geographies: Geography[];
    institutions: Institution;
    subjects: Subject[];
    industries: Industry[];
    hours: HoursSpentDoing;
    socialFeedback: SocialFeedback;
    academicFeedback: AcademicFeedback;
    academicWorkload: AcademicWorkload;
    degreeStructure: DegreeStructure;
    dropoutRate: number;
    jobData: JobData;
};
export type QuizAnswers = {
    subjectsPriority: number;
    industriesPriority: number;
    academicEnvironmentPriority: number;
    socialEnvironmentPriority: number;
    groupEngagementPriority: number;
    lonelinessPriority: number;
    stressPriority: number;
    highWorkloadAcceptancePriority: number;
    studentJobPriority: number;
    lecturesPriority: number;
    literaturePriority: number;
    teachingPriority: number;
    dislikeExamPriority: number;
    internshipPriority: number;
    internationalStayPriority: number;
    workNationallyPriority: number;
    startingSalaryPriority: number;
    experiencedSalaryPriority: number;
    unemploymentPriority: number;
    degreeRelevancePriority: number;
    fixedHoursPriority: number;
    flexibleHoursPriority: number;
    selfSchedulePriority: number;
    variableSchedulePriority: number;
    nightAndEveningShiftsPriority: number;
};
export type MinimumMaximum = {
    minimum: number;
    maximum: number;
};
export type SalaryFilters = {
    newGraduate: MinimumMaximum;
    experienced: MinimumMaximum;
};
export type UnenploymentFilters = {
    newGraduate: number;
    experienced: number;
};
export type Subject = {
    title: string;
    score: number;
};
export type TableSectionDataFromServer = {
    educations: Education[];
    degreeTypeKeys: (keyof typeof DegreeType)[];
    subjectKeys: string[];
    institutionKeys: (keyof typeof Institution)[];
    geographyKeys: (keyof typeof Geography)[];
    educationDurationRange: MinimumMaximum;
    minimumValueEducation: Education;
    maximumValueEducation: Education;
};
export type TableFilters = {
    wantedDegreeTypes: string[];
    canStudyInGeoraphies: Geography[];
    canStudyAtInstitution: Institution[];
    hasSubjects: string[];
    hasIndustries: string[];
    hasFormsOfEducation: string[];
    wantedSalary: SalaryFilters;
    unemployment: UnenploymentFilters;
    jobFlexibility: JobFlexibility;
    wantedWorkingHours: MinimumMaximum;
    canWorkInternationally: boolean;
};
export type UserImputs = {
    quizAnswers: QuizAnswers;
    filters: TableFilters;
};
export type objectiveType = {
    direction: number;
    name: string;
    vars: {
        name: string;
        coef: number;
    }[];
};
export type SubjectToType = {
    name: string;
    vars: {
        name: string;
        coef: number;
    }[];
    bnds: {
        type: number;
        ub: number;
        lb: number;
    };
}[];
export type EducationGroup = {
    title: string;
    url: string;
};
