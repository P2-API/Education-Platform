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

import { Geography, Institution, JobFlexibility } from "enums";

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

type StudentFeedback = {
    socialEnvironment: number;
    academicEnvironment: number;
    groupEngagement: number;
    loneliness: number;
    stress: number;
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
    fixed_hours: number;
    flexible_hours: number;
    self_schedule: number;
    variable_schedule: number;
    night_and_evening_shifts: number;
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

export type Uddannelse = {
    title: string;  // udelukke
    degree_type: string; // filter 
    geography: Geography[];  // filter/quiz hænger sammen med nedenstående  / Hvor vigtig er det
    institutions: Institution; // filter/quiz hænger sammen med ovenstående / Hvor vigtig er det
    subjects: Subject[] // Filter / Quiz
    industries: Industry[];
    hours: HoursSpentDoing; // Filter / Quiz 
    student_feedback: StudentFeedback; // quiz
    academic_workload: AcademicWorkload; // quiz
    degree_structure: DegreeStructure; // quiz
    dropout_rate: number;
    job_data: JobData;
};


export type QuizAnswers = {
    geography_priority?: number;   // 1
    institution_priority?: number; // 1

    subjects_priority?: number;

    academic_environment_priority?: number;

    social_environment_priority?: number;
    group_engagement_priority?: number;
    loneliness_priority?: number;

    stress_priority?: number;
    high_workload_acceptance_priority?: number; ///

    student_job_priority?: number;

    lectures_priority?: number;
    literature_priority?: number;

    teaching_priority?: number;

    dislike_exam_priority?: number;

    internship_priority?: number;

    international_stay_priority?: number;

    work_internationally_priority?: number;

    starting_salary_priority?: number;
    general_salary_priority?: number;
    experienced_salary_priority?: number;
    ////////////////
    unemployment_priority?: number;

    degree_relevance_priority?: number;


    fixed_hours_priority?: number;    /////// 
    flexible_hours_priority?: number; ///////
    self_schedule_priority?: number; ///////
    variable_schedule_priority?: number; ///////

    night_and_evening_shifts_priority?: number;
}

type MinimumMaximum = {
    minimum: number;
    maximum: number;
}

type SalaryFilters = {
    newGraduate: MinimumMaximum;
    experienced: MinimumMaximum;
}

type UnenploymentFilters = {
    newGraduate: number;
    experienced: number;
}


export type TableFilters = {
    wantedDegreeTypes: string[];
    canStudyInGeoraphies: Geography[];
    canStudyAtInstitution: Institution[];
    hasSubjects: string[];
    hasIndustries: string[];
    hasFormsOfEducation: string[];
    acceptableDropOutRate: number;
    wantedSalary: SalaryFilters;
    unemployment: UnenploymentFilters;
    jobFlexibility: JobFlexibility;
    wantedWorkingHours: MinimumMaximum;
    wantedDegreeRelevance: number;
    canWorkInternationally: boolean;
}

