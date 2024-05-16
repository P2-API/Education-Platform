import { describe, it, expect } from 'vitest';
import { LPsolver, findOptimalSolution, LPclass} from '../../Backend/utilities/linear-programming';
import * as Type from '../../src/types';

const solver = new LPsolver();
const Lp = new LPclass(solver.solver); 

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
    hasSubjects: ["subject1", "subject2", "subject3"],
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
        Lp.addObjectiveFunction(deafultWeights, defaultFilters);
        expect(Lp.objective).toEqual({
            direction: solver.solver.GLP_MAX,
            name: "Optimal Education",
            vars: [{name: "subject1", coef: 3},
                   {name: "subject2", coef: 3},
                   {name: "subject3", coef: 3},
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
        Lp.addConstraints(defaultFilters);
        expect(Lp.subjectTo).toEqual([
            {
                name: "subject1",
                vars: [{name: "subject1", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "subject2",
                vars: [{name: "subject2", coef: 1}],
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
            },
            {
                name: "subject3",
                vars: [{name: "subject3", coef: 1}],
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
                bnds: {type: solver.solver.GLP_DB, ub: 1, lb: 0}
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

/*
describe("findOptimalSolution", () => {
    const LPtestSettings = costructDummySettings();
    
    it("should return the optimal value to the linear program constructed from the abovementioned settings", () => {
        expect(findOptimalSolution(LPtestSettings).result).toBe(0);
    })

    it("should return the values of the opjective variables for which the optimal value was obtained", () => {
        expect(findOptimalSolution(LPtestSettings).result.vars).toEqual([4,8]);
    })
    
    settings.constraints = [];
    it("should return undefined because no constraints exist meaning that the solution is unbounded", () => {
        expect(findOptimalSolution(settings).result).toBe(undefined);
    })
    settings.constraints = [{coefficients: [1,0], operator: ">=", value: 1},
                            {coefficients: [1,0], operator: "<=", value: 0}];

    it("should return undefined because the constraints are contradictory", () => {
        expect(findOptimalSolution(settings).result).toBe(undefined);
    })
})

expect(solver.setUpLP(settings)).toEqual({
            name: "LP",
            objective: {
                direction: solver.solver.GLP_MAX,
                name: "objective value",
                vars: [{name: "x_1", coef: 40},
                       {name: "x_2", coef: 30}]
            },
            subjectTo:[{
                    name: "constraint 1",
                    vars: [{name: "x_1", coef: 1},
                            {name: "x_2", coef: 1}],
                    bnds: {type: solver.solver.GLP_UP, ub: 12, lb: 0}
                },
                {
                    name: "constraint 2",
                    vars: [{name: "x_1", coef: 2},
                            {name: "x_2", coef: 1}],
                    bnds: {type: solver.solver.GLP_UP, ub: 16, lb: 0}
                },
                {
                    name: "constraint 3",
                    vars: [{name: "x_1", coef: 1}],
                    bnds: {type: solver.solver.GLP_LO, ub: 0, lb: 0}
                },
                {
                    name: "constraint 4",
                    vars: [{name: "x_2", coef: 1}],
                    bnds: {type: solver.solver.GLP_LO, ub: 0, lb: 0}
                }
            ],
        });     
    })
})

*/