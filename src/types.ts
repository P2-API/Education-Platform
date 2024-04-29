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


export type Uddannelse = {
    title: string;  // udelukke
    degree_type: string; // filter 
    geography: string;  // filter/quiz hænger sammen med nedenstående  / Hvor vigtig er det
    institutions: string[]; // filter/quiz hænger sammen med ovenstående / Hvor vigtig er det
    subjects: [ // Filter / Quiz
        {
            title: string;
            score: number;
        },
        {
            title: string;
            score: number;
        },
        {
            title: string;
            score: number;
        },
    ]
    industries: [ // ?
        {
            title: string;
            share: number;
        },
        {
            title: string;
            share: number;
        },
        {
            title: string;
            share: number;
        },
    ];
    hours: { // Filter / Quiz 
        with_many_students: number;
        with_few_students: number;
        with_supervision: number;
    };
    student_feedback: { // quiz
        social_environment: number;
        academic_environment: number;
        group_engagement: number;
        loneliness: number;
        stress: number;
        teacher_evaluation: number;
        satisfaction: number;
    };
    academic_workload: { // quiz
        lectures: number;
        literature: number;
        student_job: number;
    };
    degree_structure: { // quiz
        contents: {
            teaching: number;
            exams: number;
            internship: number;
            international_stay: number;
        };
        teaching_method: {
            methods: string[];
        };
    };
    dropout_rate: number;
    job_data: {
        salary: { // filter
            new_graduate: {
                lower_quartile: number;
                median: number;
                upper_quartile: number;
                projected_direction: string;
            };
            experienced: {
                lower_quartile: number;
                median: number;
                upper_quartile: number;
                projected_direction: string;
            };
        };
        unemployment: { // filter og quiz
            new_graduate: number;
            experienced: number;
            projected_new_graduate: number;
            projected_experienced: number;
        };
        work_schedule: { // quiz 
            fixed_hours: number;
            flexible_hours: number;
            self_schedule: number;
            variable_schedule: number;
            night_and_evening_shifts: number;
        };
        working_hours: number; // quiz
        job_importance: { // quiz
            [key: string]: string;
        };
        job_skills: {
            [key: string]: string;
        };
        degree_relevance: number; // quiz 
        degree_prepares_for_job: number; // quiz 
        national_jobs: number; // quiz
    };
};


export type QuizAnswers = {
    geography_priority: number;
    institution_priority: number;
    subjects_priority: number;
    social_environment_priority: number;
    academic_environment_priority: number;
    group_engagement_priority: number;
    loneliness_priority: number;
    stress_priority: number;
    lectures_priority: number;
    literature_priority: number;
    student_job_priority: number;
    teaching_priority: number;
    dislike_exam_priority: number;
    internship_priority: number;
    international_stay_priority: number;
    starting_salary_priority: number;
    general_salary_priority: number;
    experienced_salary_priority: number;
    unemployment_priority: number;
    fixed_hours_priority: number;
    flexible_hours_priority: number;
    self_schedule_priority: number;
    variable_schedule_priority: number;
    night_and_evening_shifts_priority: number;
    high_workload_acceptance_priority: number;
    degree_relevance_priority: number;
    work_internationally_priority: number;
}