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

import { Geography, County, Institution, JobFlexibility } from "enums";

type Subject = {
    title: string;
    score: number;
}

type Industry = {
    title: string;
    share: number;
}

type HoursSpentDoing = {
    withManyStudents: number;
    withFewStudents: number;
    withSupervision: number;
}

type SocialFeedback = {
    socialEnvironment: number;
    groupEngagement: number;
    loneliness: number;
    stress: number;
}

type AcademicFeedback = {
    academicEnvironment: number;
    teacherEvaluation: number;
    satisfaction: number;
}

type AcademicWorkload = {
    lectures: number;
    literature: number;
    studentJob: number;
}

type DegreeContents = {
    teaching: number;
    exams: number;
    internship: number;
    internationalStay: number;
}

type DegreeStructure = {
    contents: DegreeContents;
    teachingMethods: string[];
}

type Salary = {
    lower_quartile: number;
    median: number;
    upper_quartile: number;
    projected_direction: string;
}

type Unemployment = {
    newGraduate: number;
    experienced: number;
    projectedNewGraduate: number;
    projectedExperienced: number;
}

type JobWorkSchedule = {
    working_hours: number;
    fixed_hours_percent: number;
    flexible_hours_percent: number;
    self_schedule_percent: number;
    variable_schedule_percent: number;
    night_and_evening_shifts_percent: number;
}

type Salaries = {
    newGraduate: Salary;
    experienced: Salary;
}

type JobData = {
    salaries: Salaries;
    workSchedule: JobWorkSchedule;
    unemployment: Unemployment;
    degree_relevance: number;
    degree_prepares_for_job: number;
    national_jobs: number;
}

export type Education = {
    url: string;
    rank: number | null;
    title: string;
    degree_type: string; // filter = wantedDegreeTypes: string[];
    counties: County[];
    geographies: Geography[];  // filter = canStudyInGeoraphies: Geography[]
    institutions: Institution; // filter = canStudyAtInstitution: Institution[];
    subjects: Subject[] // LP filter = hasSubjects: string[]; / Quiz = subjects_priority?: number;
    industries: Industry[]; // LP filter = hasIndustries: string[];
    hours: HoursSpentDoing; // Filter / Quiz 
    social_feedback: SocialFeedback;
    academic_feedback: AcademicFeedback; // quiz
    academic_workload: AcademicWorkload; // quiz
    degree_structure: DegreeStructure; // quiz
    dropout_rate: number;
    job_data: JobData;
};


export type QuizAnswers = {

    subjects_priority?: number; // in use

    industries_priority?: number; // in use

    academic_environment_priority?: number; // in use

    social_environment_priority?: number; // in use
    group_engagement_priority?: number; // in use
    loneliness_priority?: number; // in use 

    stress_priority?: number; // in use 
    high_workload_acceptance_priority?: number; // in use

    student_job_priority?: number; // in use

    lectures_priority?: number; // in use
    literature_priority?: number; // in use
    teaching_priority?: number; // in use

    dislike_exam_priority?: number; // in use

    internship_priority?: number; // in use 

    international_stay_priority?: number; // in use
    work_nationally_priority?: number; // in use

    starting_salary_priority?: number; // in use
    experienced_salary_priority?: number; // in use

    unemployment_priority?: number; // in use

    degree_relevance_priority?: number; // in use

    fixed_hours_priority?: number; // in use
    flexible_hours_priority?: number; // in use
    self_schedule_priority?: number; // in use 
    variable_schedule_priority?: number; // in use

    night_and_evening_shifts_priority?: number; // in use 
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


export type TableFilters = {
    wantedDegreeTypes: string[]; //in use
    canStudyInGeoraphies: Geography[]; //in use
    canStudyAtInstitution: Institution[]; //in use
    hasSubjects: string[]; // in use / LP filter
    hasIndustries: string[]; // in use / LP filter
    hasFormsOfEducation: string[]; // in use
    wantedSalary: SalaryFilters; // in use / LP filter
    unemployment: UnenploymentFilters; // in use / LP filter
    jobFlexibility: JobFlexibility; // in use / LP filter
    wantedWorkingHours: MinimumMaximum; // in use / LP filter
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

