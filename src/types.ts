
export type Uddannelse = {
    title: string;
    degree_type: string;
    geography: string;
    institutions: string[];
    subjects: [
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
    industries: [
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
    hours: {
        with_many_students: number;
        with_few_students: number;
        with_supervision: number;
    };
    student_feedback: {
        social_environment: number;
        academic_environment: number;
        group_engagement: number;
        loneliness: number;
        stress: number;
        teacher_evaluation: number;
        satisfaction: number;
    };
    academic_workload: {
        lectures: number;
        literature: number;
        student_job: number;
    };
    degree_structure: {
        contents: {
            teaching: number;
            exams: number;
            internship: number;
            international_stay: number;
        };
        teaching_method: {
            [key: string]: string;
        };
    };
    dropout_rate: number;
    job_data: {
        salary: {
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
        unemployment: {
            new_graduate: number;
            experienced: number;
            projected_new_graduate: number;
            projected_experienced: number;
        };
        work_schedule: {
            fixed_hours: number;
            flexible_hours: number;
            self_schedule: number;
            variable_schedule: number;
            night_and_evening_shifts: number;
        };
        hours: number;
        job_importance: {
            [key: string]: string;
        };
        job_skills: {
            [key: string]: string;
        };
        degree_relevance: number;
        degree_prepares_for_job: number;
        national_jobs: number;
    };
};
