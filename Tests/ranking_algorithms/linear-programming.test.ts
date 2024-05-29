import { describe, it, expect } from 'vitest';
import { LPsolver, LPclass} from '../../Backend/utilities/linear-programming';
import * as Type from '../../src/types';

const solver = new LPsolver();

//default quizAnswers
const deafultWeights:Type.QuizAnswers = {
    subjectsPriority: 3,
    industriesPriority: 3,
    academicEnvironmentPriority: 3, 
    socialEnvironmentPriority: 3, 
    groupEngagementPriority: 3,
    lonelinessPriority: 3,
    stressPriority: 3,  
    highWorkloadAcceptancePriority: 3,
    studentJobPriority: 3,
    lecturesPriority: 3,
    literaturePriority: 3,
    teachingPriority: 3,
    dislikeExamPriority: 3,
    internshipPriority: 3, 
    internationalStayPriority: 3,
    workNationallyPriority: 3,
    startingSalaryPriority: 3,
    experiencedSalaryPriority: 3,
    unemploymentPriority: 3,
    degreeRelevancePriority: 3,
    fixedHoursPriority: 3,
    flexibleHoursPriority: 3,
    selfSchedulePriority: 3, 
    variableSchedulePriority: 3,
    nightAndEveningShiftsPriority: 3 
} 
//default filters
const defaultFilters:Type.TableFilters = {
    wantedDegreeTypes: [],
    canStudyInGeographies: [], 
    canStudyAtInstitution: [],
    hasSubjects: [],
    hasFormsOfEducation: [],
    educationDuration: {minimum: 0, maximum: 1},
    wantedSalary: { newGraduate: {minimum: 0, maximum: 1},
                    experienced: {minimum: 0, maximum: 1}},
    unemployment: { newGraduate: {minimum: 0, maximum: 1},
                    experienced: {minimum: 0, maximum: 1}},
    hasFlexibleJobSchedule: false, 
    wantedWorkingHours: {minimum: 0, maximum: 1},
    canWorkInternationally: false,
}

describe("addObjectiveFunction() method of LPclass", () => {
    it("it should add variables and their corresponding coefficients to the objective function of the lp opject", () => {
        // act
        const Lp = new LPclass(solver.solver); 
        Lp.addObjectiveFunction(deafultWeights, defaultFilters);
        const sp = deafultWeights.subjectsPriority
        //assert
        expect(Lp.objective).toEqual({
            direction: solver.solver.GLP_MAX,
            name: "Optimal Education",
            vars: [{name: "Naturvidenskab", coef: sp},
                    {name:"Kunst", coef: sp},
                    {name:"Historie", coef: sp},
                    {name:"Psykologi", coef: sp},
                    {name:"Filosofi", coef: sp},
                    {name:"Matematik", coef: sp},
                    {name:"Arkitektur", coef: sp},
                    {name:"Musik", coef: sp},
                    {name:"Politik", coef: sp},
                    {name:"Kultur", coef: sp},
                    {name:"Sundhedsvidenskab", coef: sp},
                    {name:"Jura", coef: sp},
                    {name:"Økonomi", coef: sp},
                    {name:"Informationsteknologi", coef: sp},
                    {name:"Programmering", coef: sp},
                    {name:"Miljøvidenskab", coef: sp},
                    {name:"Uddannelse", coef: sp},
                    {name:"Journalistik", coef: sp},
                    {name:"Kommunikation", coef: sp},
                    {name:"Religion", coef: sp},
                    {name:"Sociologi", coef: 3},
                    {name:"Landbrugsvidenskab", coef: sp},
                    {name: "withManyStudents", coef: 3},
                    {name: "withFewStudents", coef: 3},
                    {name: "withSupervision", coef: 3},
                    {name: "socialEnvironment", coef: 3},
                    {name: "groupEngagement", coef: 3},
                    {name: "loneliness", coef: 3},
                    {name: "stress", coef: 3},
                    {name: "academicEnvironment", coef: 3},
                    {name: "teacherEvaluation", coef: 3},
                    {name: "studentJob", coef: 3},
                    {name: "lectures", coef: 3},
                    {name: "literature", coef: 3},
                    {name: "dislikeExam", coef: 3},
                    {name: "internship", coef: 3},
                    {name: "internationalStay", coef: 3},
                    {name: "startingSalary", coef: 3},
                    {name: "experiencedSalary", coef: 3},
                    {name: "unemploymentNewGraduate", coef: 3},
                    {name: "unemploymentExperienced", coef: 3},
                    {name: "degreeRelevance", coef: 3},
                    {name: "fixedHours", coef: 3},
                    {name: "flexibleHours", coef: 3},
                    {name: "selfSchedule", coef: 3},
                    {name: "variableSchedule", coef: 3},
                    {name: "nightAndEveningShifts", coef: 3 },
                    {name: "nationalJobs", coef: 3}
                ]
        });

        // arrange
        const Lp2 = new LPclass(solver.solver);
        const modifiedFilters = {...defaultFilters}
        modifiedFilters.hasSubjects = ["Jura", "Kunst", "Historie"];

        // act
        Lp2.addObjectiveFunction(deafultWeights, modifiedFilters);

        // assert
        expect(Lp2.objective).toEqual({
            direction: solver.solver.GLP_MAX,
            name: "Optimal Education",
            vars: [ {name:"Jura", coef: sp},
                    {name:"Kunst", coef: sp},
                    {name:"Historie", coef: sp},
                    {name: "withManyStudents", coef: 3},
                    {name: "withFewStudents", coef: 3},
                    {name: "withSupervision", coef: 3},
                    {name: "socialEnvironment", coef: 3},
                    {name: "groupEngagement", coef: 3},
                    {name: "loneliness", coef: 3},
                    {name: "stress", coef: 3},
                    {name: "academicEnvironment", coef: 3},
                    {name: "teacherEvaluation", coef: 3},
                    {name: "studentJob", coef: 3},
                    {name: "lectures", coef: 3},
                    {name: "literature", coef: 3},
                    {name: "dislikeExam", coef: 3},
                    {name: "internship", coef: 3},
                    {name: "internationalStay", coef: 3},
                    {name: "startingSalary", coef: 3},
                    {name: "experiencedSalary", coef: 3},
                    {name: "unemploymentNewGraduate", coef: 3},
                    {name: "unemploymentExperienced", coef: 3},
                    {name: "degreeRelevance", coef: 3},
                    {name: "fixedHours", coef: 3},
                    {name: "flexibleHours", coef: 3},
                    {name: "selfSchedule", coef: 3},
                    {name: "variableSchedule", coef: 3},
                    {name: "nightAndEveningShifts", coef: 3 },
                    {name: "nationalJobs", coef: 3}
                ]
        });
    })
})

describe("AddConstraintsFunction() method of LPclass", () => {
    it("should add the constraints to the lp object", () => {
        
        //arrange
        const Lp = new LPclass(solver.solver); 

        //act
        Lp.addObjectiveFunction(deafultWeights, defaultFilters);
        Lp.addConstraints(defaultFilters);

        //assert
        expect(Lp.subjectTo).toEqual([
            {
                name: "Naturvidenskab",
                vars: [{name: "Naturvidenskab", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "Kunst",
                vars: [{name: "Kunst", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "Historie",
                vars: [{name: "Historie", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "Psykologi",
                vars: [{name: "Psykologi", coef: 1}], 
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "Filosofi",
                vars: [{name: "Filosofi", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "Matematik",
                vars: [{name: "Matematik", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "Arkitektur",
                vars: [{name: "Arkitektur", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "Musik",
                vars: [{name: "Musik", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "Politik",
                vars: [{name: "Politik", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "Kultur",
                vars: [{name: "Kultur", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "Sundhedsvidenskab",
                vars: [{name: "Sundhedsvidenskab", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "Jura",
                vars: [{name: "Jura", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "Økonomi",
                vars: [{name: "Økonomi", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "Informationsteknologi",
                vars: [{name: "Informationsteknologi", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "Programmering",
                vars: [{name: "Programmering", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "Miljøvidenskab",
                vars: [{name: "Miljøvidenskab", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "Uddannelse",
                vars: [{name: "Uddannelse", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "Journalistik",
                vars: [{name: "Journalistik", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "Kommunikation",
                vars: [{name: "Kommunikation", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "Religion",
                vars: [{name: "Religion", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "Sociologi",
                vars: [{name: "Sociologi", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "Landbrugsvidenskab",
                vars: [{name: "Landbrugsvidenskab", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {   
                name: "withManyStudents",
                vars: [{name: "withManyStudents", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {   
                name: "withFewStudents",
                vars: [{name: "withFewStudents", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "withSupervision",
                vars: [{name: "withSupervision", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "socialEnvironment",
                vars: [{name: "socialEnvironment", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "groupEngagement",
                vars: [{name: "groupEngagement", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "loneliness",
                vars: [{name: "loneliness", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "stress",
                vars: [{name: "stress", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "academicEnvironment",
                vars: [{name: "academicEnvironment", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "teacherEvaluation",
                vars: [{name: "teacherEvaluation", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "studentJob",
                vars: [{name: "studentJob", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "lectures",
                vars: [{name: "lectures", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "literature",
                vars: [{name: "literature", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "dislikeExam",
                vars: [{name: "dislikeExam", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "internship",
                vars: [{name: "internship", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "internationalStay",
                vars: [{name: "internationalStay", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "startingSalary",
                vars: [{name: "startingSalary", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: defaultFilters.wantedSalary.newGraduate.maximum, lb: defaultFilters.wantedSalary.newGraduate.minimum}
            },
            {
                name: "experiencedSalary",
                vars: [{name: "experiencedSalary", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "unemploymentNewGraduate",
                vars: [{name: "unemploymentNewGraduate", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "unemploymentExperienced",
                vars: [{name: "unemploymentExperienced", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: defaultFilters.unemployment.experienced.maximum, lb: 0}
            },
            {
                name: "degreeRelevance",
                vars: [{name: "degreeRelevance", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "fixedHours",
                vars: [{name: "fixedHours", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "flexibleHours",
                vars: [{name: "flexibleHours", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "selfSchedule",
                vars: [{name: "selfSchedule", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "variableSchedule",
                vars: [{name: "variableSchedule", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "nightAndEveningShifts",
                vars: [{name: "nightAndEveningShifts", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "nationalJobs",
                vars: [{name: "nationalJobs", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            }]
        );
    });
})