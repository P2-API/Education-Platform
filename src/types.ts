/*
Fag
Sted
Degree_type
Salary
Unemployment
_____________

Brancher
Klasseundervisning/forelæsning/underviservejledning


*/

import { Geography, County, Institution, DegreeType, FormOfEducation } from "./enums";

export type Industry = {
    title: string;
    share: number;
}

export type HoursSpentDoing = {
    withManyStudents: number;
    withFewStudents: number;
    withSupervision: number;
}

export type SocialFeedback = {
    socialEnvironment: number;
    groupEngagement: number;
    loneliness: number;
    stress: number;
}

export type AcademicFeedback = {
    academicEnvironment: number;
    teacherEvaluation: number;
    satisfaction: number;
}

export type AcademicWorkload = {
    lectures: number;
    literature: number;
    studentJob: number;
}

export type DegreeContents = {
    teaching: number;
    exams: number;
    internship: number;
    internationalStay: number;
}

export type DegreeStructure = {
    contents: DegreeContents;
    teachingMethods: string[];
}

export type Salary = {
    lowerQuartile: number;
    median: number;
    upperQuartile: number;
    projectedDirection: string;
}

export type Unemployment = {
    newGraduate: number;
    experienced: number;
    projectedNewGraduate: number;
    projectedExperienced: number;
}

export type JobWorkSchedule = {
    workingHours: number;
    fixedHoursPercent: number;
    flexibleHoursPercent: number;
    selfSchedulePercent: number;
    variableSchedulePercent: number;
    nightAndEveningShiftsPercent: number;
}

export type Salaries = {
    newGraduate: Salary;
    experienced: Salary;
}

export type JobData = {
    salaries: Salaries;
    workSchedule: JobWorkSchedule;
    unemployment: Unemployment;
    degreeRelevance: number;
    degreePreparesForJob: number;
    nationalJobs: number;
}

export type Education = {
    url: string;
    rank: number | null;
    title: string;
    degreeType: DegreeType; // filter = wantedDegreeTypes: string[];
    counties: County[];
    geographies: Geography[];  // filter = canStudyInGeoraphies: Geography[]
    institutions: Institution; // filter = canStudyAtInstitution: Institution[];
    subjects: Subject[] // LP filter = hasSubjects: string[]; / Quiz = subjects_priority: number;
    industries: Industry[]; // LP filter = hasIndustries: string[]; Quiz = industries_priority: number;
    hours: HoursSpentDoing; // quiz = high_workload_acceptance_priority: number; 
    socialFeedback: SocialFeedback; // quiz = social_environment_priority: number; group_engagement_priority: number; loneliness_priority: number; stress_priority: number;
    academicFeedback: AcademicFeedback;// quiz = academic_environment_priority:  teaching_priority: number; 
    academicWorkload: AcademicWorkload; // quiz = student_job_priority: number; lectures_priority: number; literature_priority: number;
    degreeStructure: DegreeStructure; // filter = hasFormsOfEducation: string[]; / quiz = dislike_exam_priority: number; internship_priority: number; international_stay_priority: number;
    dropoutRate: number;
    jobData: JobData; /* filter = canWorkInternationally: boolean; / LP filters = wantedSalary: SalaryFilters, unemployment: UnenploymentFilters, jobFlexibility: JobFlexibility; wantedWorkingHours: MinimumMaximum; 
                        / quiz = starting_salary_priority: number; experienced_salary_priority: number; unemployment_priority: number; degree_relevance_priority: number; fixed_hours_priority: number; flexible_hours_priority: number;
                        self_schedule_priority: number; variable_schedule_priority: number; night_and_evening_shifts_priority: number; work_nationally_priority: number;*/
};

export type QuizAnswers = {

    subjectsPriority: number; // in use

    industriesPriority: number; // in use

    academicEnvironmentPriority: number; // in use 

    socialEnvironmentPriority: number; // in use
    groupEngagementPriority: number; // in use
    lonelinessPriority: number; // in use 

    stressPriority: number; // in use 
    highWorkloadAcceptancePriority: number; // in use

    studentJobPriority: number; // in use

    lecturesPriority: number; // in use
    literaturePriority: number; // in use
    teachingPriority: number; // in use

    dislikeExamPriority: number; // in use

    internshipPriority: number; // in use 

    internationalStayPriority: number; // in use
    workNationallyPriority: number; // in use

    startingSalaryPriority: number; // in use
    experiencedSalaryPriority: number; // in use

    unemploymentPriority: number; // in use

    degreeRelevancePriority: number; // in use

    fixedHoursPriority: number; // in use
    flexibleHoursPriority: number; // in use
    selfSchedulePriority: number; // in use 
    variableSchedulePriority: number; // in use

    nightAndEveningShiftsPriority: number; // in use 
}

export type MinimumMaximum = {
    minimum: number;
    maximum: number;
}

export type SalaryFilters = {
    newGraduate: MinimumMaximum;
    experienced: MinimumMaximum;
}

export type UnenploymentFilters = {
    newGraduate: number;
    experienced: number;
}

export type Subject = {
    title: string;
    score: number;
}

export type TableSectionDataFromServer = {
    educations: Education[];

    degreeTypeKeys: (keyof typeof DegreeType)[];
    subjectKeys: string[];
    institutionKeys: (keyof typeof Institution)[];
    geographyKeys: (keyof typeof Geography)[];
    formOfEducationKeys: (keyof typeof FormOfEducation)[];

    educationDurationRange: MinimumMaximum;

    minimumValueEducation: Education;
    maximumValueEducation: Education;
}

export type TableFilters = {
    wantedDegreeTypes: string[]; //in use               
    canStudyInGeoraphies: Geography[]; //in use         
    canStudyAtInstitution: Institution[]; //in use      
    hasSubjects: string[]; // in use      
    hasIndustries: string[]; // in use       
    hasFormsOfEducation: string[]; // in use
    wantedSalary: SalaryFilters; // in use / LP filter  
    unemployment: UnenploymentFilters; // in use / LP filter    (!!!remember to inplement in LPsolver!!!)
    hasFlexibleJobSchedule: boolean; // in use / LP filter      (!!!remember to implement in LPsolver!!!)
    wantedWorkingHours: MinimumMaximum; // in use / LP filter   (!!!remember to implement in LPsolver!!!)
    canWorkInternationally: boolean; //in use
}

export type UserImputs = {
    quizAnswers: QuizAnswers,
    filters: TableFilters
}

export type objectiveType = {
    direction: number,
    name: string,
    vars: { name: string, coef: number }[]
}

export type SubjectToType = {
    name: string,
    vars: { name: string, coef: number }[],
    bnds: { type: number, ub: number, lb: number }
}[]

export type EducationGroup = {
    title: string,
    url: string
}

export type RankedEducationsType = {
    upperhalf: Education[],
    lowerhalf: Education[]
}

export type EducationVector = {
    education: Education,
    coordinates: number[]
}

export type PCAData = {
    x_axis: string[];
    y_axis: string[];
}

export type IntermedietRankingType = {
    upperhalf: {
        education: Education;
        similarity: number;
    }[],
    lowerhalf: {
        education: Education;
        similarity: number;
    }[]
}

export type FinalRankingType = {
    ranking: RankedDataStructure[];
    index: number; //index indicating the position of the ranking afterwhich the educations don't comply with the filters
}

export type RankedDataStructure = {
    education: Education;
    score: number;
}


export type FilterProps = {
    degreeTypes: string[];
    institutes: string[];
    geographies: string[];
    subjects: string[];
    formsOfEducation: string[];
    educationDuration: MinimumMaximum;
    newGraduateSalary: MinimumMaximum;
    experiencedSalary: MinimumMaximum;
    wantedWorkingHours: MinimumMaximum;
    newGraduateUnemployment: MinimumMaximum;
    experiencedUnemployment: MinimumMaximum;
    canWorkInternationally: boolean;
    hasFlexibleJobSchedule: boolean;
};
