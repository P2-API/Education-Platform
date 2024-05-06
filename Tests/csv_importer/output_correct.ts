import { Education } from "../../src/types"
import { CityToGeography, County, Institution } from "../../src/enums"

export let educations_correct: Education[] = [
    { // First
        url: "www.ug.dk/uddannelser/bachelorogkandidatuddannelser/kandidatuddannelser/samfundsvidenskabeligekandidatuddannelser/oevrigesamfundsvidenskab/organisational-innovation-and-entrepreneurship",
        rank: null,
        title: "Organisational Innovation and Entrepreneurship",
        degree_type: "Kandidatuddannelse",
        counties: [County["Frederiksberg"]],
        geographies: [CityToGeography(County["Frederiksberg"])],
        institutions: Institution["Copenhagen Business School - Handelshøjskolen"],
        subjects: [],
        industries: [
            {
                title: "Information og kommunikation",
                share: 22
            },
            {
                title: "Videnservice",
                share: 18
            },
            {
                title: "Handel",
                share: 18
            }
        ],
        hours: {
            withManyStudents: 13,
            withFewStudents: 36,
            withSupervision: 103
        },
        student_feedback: {
            socialEnvironment: 4.35,
            academicEnvironment: 4.3,
            groupEngagement: 4.3,
            loneliness: 3.56,
            stress: 3.44,
            teacherEvaluation: 3.8775,
            satisfaction: 4.28
        },
        academic_workload: {
            lectures: 44,
            literature: 15.5,
            studentJob: 81
        },
        degree_structure: {
            contents: {
                teaching: 75,
                exams: 25,
                internship: 0,
                internationalStay: 0
            },
            teachingMethods: [
                "Projektarbejde (både individuelt og i grupper)",	
                "Selvstudie (forberedelse, læsning, hjemmeopgaver)",	
                "Forelæsninger",	
                "Gruppearbejde (læsegruppe, studiegruppe)",	
                "Klasseundervisning (holdundervisning)"
            ]
        },
        dropout_rate: 4,
        job_data: {
            salaries: {
                newGraduate: {
                    lower_quartile: 30.65,
                    median: 38.55,
                    upper_quartile: 47.04,
                    projected_direction: ""
                },
                experienced: {
                    lower_quartile: 47.65,
                    median: 60.07,
                    upper_quartile: 78.01,
                    projected_direction: ""
                }
            },
            workSchedule: {
                working_hours: 37,
                fixed_hours_percent: 27,
                flexible_hours_percent: 50,
                self_schedule_percent: 23,
                variable_schedule_percent: 0,
                night_and_evening_shifts_percent: 0
            },
            unemployment: {
                newGraduate: 9,
                experienced: 0,
                projectedNewGraduate: 0,
                projectedExperienced: 0
            },
            degree_relevance: 3.24,
            degree_prepares_for_job: 3.55,
            national_jobs: 80
        }
    },
    { // Second
        url: "www.ug.dk/uddannelser/bachelorogkandidatuddannelser/kandidatuddannelser/humanistiskekandidatuddannelser/oevrigehumaniora/historie",
        rank: null,
        title: "Historie",
        degree_type: "Kandidatuddannelse",
        counties: [County["København"]],
        geographies: [CityToGeography(County["København"])],
        institutions: Institution["Københavns Universitet"],
        subjects: [],
        industries: [
            {
                title: "Undervisning",
                share: 39
            },
            {
                title: "Offentlig administration, forsvar og politi",
                share: 13
            },
            {
                title: "Kultur og fritid",
                share: 36
            }
        ],
        hours: {
            withManyStudents: 7,
            withFewStudents: 112,
            withSupervision: 0
        },
        student_feedback: {
            socialEnvironment: 3.7,
            academicEnvironment: 3.97,
            groupEngagement: 3.95,
            loneliness: 3.26,
            stress: 3.59,
            teacherEvaluation: 3.99,
            satisfaction: 3.92
        },
        academic_workload: {
            lectures: 26,
            literature: 14.5,
            studentJob: 83
        },
        degree_structure: {
            contents: {
                teaching: 75,
                exams: 25,
                internship: 0,
                internationalStay: 0
            },
            teachingMethods: [
                "Selvstudie (forberedelse, læsning, hjemmeopgaver)",
                "Klasseundervisning (holdundervisning)",
                "Forelæsninger",
                "Faglig vejledning fra din underviser",
                "Projektarbejde (både individuelt og i grupper)"
            ]
        },
        dropout_rate: 5,
        job_data: {
            salaries: {
                newGraduate: {
                    lower_quartile: 31.05,
                    median: 1.024305556,
                    upper_quartile: 35.45,
                    projected_direction: ""
                },
                experienced: {
                    lower_quartile: 34.65,
                    median: 43.95,
                    upper_quartile: 49.15,
                    projected_direction: ""
                }
            },
            workSchedule: {
                working_hours: 39,
                fixed_hours_percent: 30,
                flexible_hours_percent: 4,
                self_schedule_percent: 16,
                variable_schedule_percent: 9,
                night_and_evening_shifts_percent: 0
            },
            unemployment: {
                newGraduate: 21,
                experienced: 4,
                projectedNewGraduate: 0,
                projectedExperienced: 0
            },
            degree_relevance: 3.49,
            degree_prepares_for_job: 3.65,
            national_jobs: 95
        }
    },
    { // Third
        url: "www.ug.dk/uddannelser/bachelorogkandidatuddannelser/kandidatuddannelser/humanistiskekandidatuddannelser/oevrigehumaniora/dansk",
        rank: null,
        title: "Dansk",
        degree_type: "Kandidatuddannelse",
        counties: [County["Aarhus"]],
        geographies: [CityToGeography(County["Aarhus"])],
        institutions: Institution["Aarhus Universitet"],
        subjects: [],
        industries: [
            {
                title: "Undervisning",
                share: 63
            },
            {
                title: "Videnservice",
                share: 6
            },
            {
                title: "Information og kommunikation",
                share: 5
            }
        ],
        hours: {
            withManyStudents: 6,
            withFewStudents: 124,
            withSupervision: 8
        },
        student_feedback: {
            socialEnvironment: 4.02,
            academicEnvironment: 4.07,
            groupEngagement: 3.49,
            loneliness: 3.52,
            stress: 3.59,
            teacherEvaluation: 4.1375,
            satisfaction: 4.24
        },
        academic_workload: {
            lectures: 38,
            literature: 10,
            studentJob: 81
        },
        degree_structure: {
            contents: {
                teaching: 62.5,
                exams: 25,
                internship: 12.5,
                internationalStay: 0
            },
            teachingMethods: [
                "Klasseundervisning (holdundervisning)",	
                "Selvstudie (forberedelse, læsning, hjemmeopgaver)",	
                "Forelæsninger",	
                "Gruppearbejde (læsegruppe, studiegruppe)",	
                "Projektarbejde (både individuelt og i grupper)"
            ]
        },
        dropout_rate: 6,
        job_data: {
            salaries: {
                newGraduate: {
                    lower_quartile: 25.05,
                    median: 31.15,
                    upper_quartile: 35.09,
                    projected_direction: ""
                },
                experienced: {
                    lower_quartile: 33.85,
                    median: 44.05,
                    upper_quartile: 48.08,
                    projected_direction: ""
                }
            },
            workSchedule: {
                working_hours: 36,
                fixed_hours_percent: 21,
                flexible_hours_percent: 52,
                self_schedule_percent: 16,
                variable_schedule_percent: 2,
                night_and_evening_shifts_percent: 0
            },
            unemployment: {
                newGraduate: 23,
                experienced: 3,
                projectedNewGraduate: 0,
                projectedExperienced: 0
            },
            degree_relevance: 3.91,
            degree_prepares_for_job: 4.02,
            national_jobs: 93
        }
    }
]