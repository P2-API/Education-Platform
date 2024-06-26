import { GLPK, LP, Result } from 'glpk.js/dist/glpk';
import * as Types from '../../src/types';
import GLPKConstructor from 'glpk.js/dist/glpk';
import { Institution, DegreeType, County, Geography, SubjectTitle } from '../../src/enums';

export class LPclass implements LP {
  name: string;
  objective: Types.objectiveType;
  subjectTo: Types.SubjectToType;
  solverInstance: GLPK;
  constructor(solver: GLPK) {
    this.solverInstance = solver;
    this.name = "Optimal education";
    this.objective = { direction: this.solverInstance.GLP_MAX, name: "Optimal Education", vars: [] };
    this.subjectTo = [];
  }
  addObjectiveFunction(quizAnswers: Types.QuizAnswers, filters: Types.TableFilters): void {
    const variables = this.objective.vars
    // add weights to:
    // subjects
    if (filters.hasSubjects.length > 0) {
      filters.hasSubjects.forEach((subject) => {
        variables.push({ name: subject, coef: quizAnswers.subjectsPriority })
      })
    } else {
      Object.keys(SubjectTitle).forEach((key) => {
        variables.push({ name: key, coef: quizAnswers.subjectsPriority })
      })
    }
    // hours
    variables.push({ name: "withManyStudents", coef: quizAnswers.highWorkloadAcceptancePriority },
      { name: "withFewStudents", coef: quizAnswers.highWorkloadAcceptancePriority },
      { name: "withSupervision", coef: quizAnswers.highWorkloadAcceptancePriority },)

    // socialFeedback
    variables.push({ name: "socialEnvironment", coef: quizAnswers.socialEnvironmentPriority },
      { name: "groupEngagement", coef: quizAnswers.groupEngagementPriority },
      { name: "loneliness", coef: /*-*/quizAnswers.lonelinessPriority },
      { name: "stress", coef: /*-*/quizAnswers.stressPriority })
    // academicFeedback
    variables.push({ name: "academicEnvironment", coef: quizAnswers.academicEnvironmentPriority },
      { name: "teacherEvaluation", coef: quizAnswers.teachingPriority })
    // academicWorkload
    variables.push({ name: "studentJob", coef: quizAnswers.studentJobPriority },
      { name: "lectures", coef: quizAnswers.lecturesPriority },
      { name: "literature", coef: quizAnswers.literaturePriority })
    // degreeStructure
    variables.push({ name: "dislikeExam", coef: quizAnswers.dislikeExamPriority },
      { name: "internship", coef: quizAnswers.internshipPriority },
      { name: "internationalStay", coef: quizAnswers.internationalStayPriority })
    // jobData
    variables.push({ name: "startingSalary", coef: quizAnswers.startingSalaryPriority },
      { name: "experiencedSalary", coef: quizAnswers.experiencedSalaryPriority },
      { name: "unemploymentNewGraduate", coef: /*-*/quizAnswers.unemploymentPriority },
      { name: "unemploymentExperienced", coef: /*-*/quizAnswers.unemploymentPriority },
      { name: "degreeRelevance", coef: quizAnswers.degreeRelevancePriority },
      { name: "fixedHours", coef: quizAnswers.fixedHoursPriority },
      { name: "flexibleHours", coef: quizAnswers.flexibleHoursPriority },
      { name: "selfSchedule", coef: quizAnswers.selfSchedulePriority },
      { name: "variableSchedule", coef: quizAnswers.variableSchedulePriority },
      { name: "nightAndEveningShifts", coef: quizAnswers.nightAndEveningShiftsPriority },
      { name: "nationalJobs", coef: quizAnswers.workNationallyPriority },
    )
  }
  addConstraints(filters: Types.TableFilters): void { // normalized values are between 0 and 1 are assumed
    // default filters
    this.objective.vars.forEach((variable) => {
      this.subjectTo.push({ name: variable.name, vars: [{ name: variable.name, coef: 1 }], bnds: { type: this.solverInstance.GLP_DB, ub: 1, lb: 0 } })
    })

    // user defined LP filters
    const userDefinedConstraints = [
      { name: "startingSalary", vars: [{ name: "startingSalary", coef: 1 }], bnds: { type: this.solverInstance.GLP_DB, ub: filters.wantedSalary.newGraduate.maximum, lb: filters.wantedSalary.newGraduate.minimum } },
      { name: "experiencedSalary", vars: [{ name: "experiencedSalary", coef: 1 }], bnds: { type: this.solverInstance.GLP_DB, ub: filters.wantedSalary.experienced.maximum, lb: filters.wantedSalary.experienced.minimum } },
      { name: "unemploymentNewGraduate", vars: [{ name: "unemploymentNewGraduate", coef: 1 }], bnds: { type: this.solverInstance.GLP_DB, ub: filters.unemployment.newGraduate.maximum, lb: filters.unemployment.newGraduate.minimum } },
      { name: "unemploymentExperienced", vars: [{ name: "unemploymentExperienced", coef: 1 }], bnds: { type: this.solverInstance.GLP_DB, ub: filters.unemployment.experienced.maximum, lb: filters.unemployment.experienced.minimum } }]

    // add/change user defined constraints depending on whether default constraints of the same name already exist
    userDefinedConstraints.forEach(userConstraint => {
      const existingConstraint = this.subjectTo.find(constraint => constraint.name === userConstraint.name);
      if (existingConstraint) {
        existingConstraint.bnds.ub = userConstraint.bnds.ub;
        existingConstraint.bnds.lb = userConstraint.bnds.lb;
      } else {
        this.subjectTo.push({ name: userConstraint.name, vars: [{ name: userConstraint.name, coef: 1 }], bnds: { type: this.solverInstance.GLP_DB, ub: userConstraint.bnds.ub, lb: userConstraint.bnds.lb } });
      }
    });
  }
}

export class LPsolver {
  solver: GLPK;
  constructor() {
    this.solver = GLPKConstructor();
  }
  solve(userInputs: Types.UserInputs): Result {
    const lp: LP = this.setUpLP(userInputs);
    return this.solver.solve(lp);
  }
  setUpLP(userInputs: Types.UserInputs): LP {
    const lp = new LPclass(this.solver)
    lp.addObjectiveFunction(userInputs.quizAnswers, userInputs.filters);
    lp.addConstraints(userInputs.filters);
    return lp;
  }
}

export function findOptimalSolution(userInputs: Types.UserInputs): Types.Education {
  const solver = new LPsolver();
  const result = solver.solve(userInputs);
  return OptimalEducation(result, userInputs.filters);
}

function OptimalEducation(result: Result, filters: Types.TableFilters): Types.Education {
  const values = result.result.vars;
  const optimalEducation: Types.Education = {
    url: "", // irrelevant 
    rank: null, // irrelevant 
    title: "", // irrelevant 
    degreeType: "" as DegreeType, // irrelevant 
    counties: [] as County[], // irrelevant 
    geographies: [] as Geography[], // irrelevant 
    institution: "" as Institution, // irrelevant
    subjects: addSubjects(result, filters.hasSubjects),
    industries: [], // irrelevant
    hours: {
      withManyStudents: values["withManyStudents"],
      withFewStudents: values["withFewStudents"],
      withSupervision: values["withSupervision"]
    },
    socialFeedback: {
      socialEnvironment: values["socialEnvironment"],
      groupEngagement: values["groupEngagement"],
      loneliness: 1-values["loneliness"],
      stress: 1-values["stress"]
    },
    academicFeedback: {
      academicEnvironment: values["academicEnvironment"],
      teacherEvaluation: values["teacherEvaluation"],
      satisfaction: 0
    }, //irrelevant
    academicWorkload: {
      lectures: values["lectures"],
      literature: values["literature"],
      studentJob: values["studentJob"]
    },
    degreeStructure: {
      contents: {
        teaching: 0, //irrelevant
        exams: values["dislikeExam"],
        internship: values["internship"],
        internationalStay: values["internationalStay"]
      },
      teachingMethods: [] //irrelevant
    },
    dropoutRate: 0, //irrelevant
    jobData: {
      salaries: {
        newGraduate: {
          lowerQuartile: 0, //irrelevant
          median: values["startingSalary"],
          upperQuartile: 0, //irrelevant
          projectedDirection: ""
        }, //irrelevant
        experienced: {
          lowerQuartile: 0, //irrelevant
          median: values["experiencedSalary"],
          upperQuartile: 0, //irrelevant
          projectedDirection: ""
        }
      }, //irrelevant
      workSchedule: {
        workingHours: 0, //irrelevant
        fixedHoursPercent: values["fixedHours"],
        flexibleHoursPercent: values["flexibleHours"],
        selfSchedulePercent: values["selfSchedule"],
        variableSchedulePercent: values["variableSchedule"],
        nightAndEveningShiftsPercent: values["nightAndEveningShifts"]
      },
      unemployment: {
        newGraduate: 1-values["unemploymentNewGraduate"],
        experienced: 1-values["unemploymentExperienced"],
        projectedNewGraduate: 0, //irelevant
        projectedExperienced: 0
      }, //irelevant
      degreeRelevance: values["degreeRelevance"],
      degreePreparesForJob: 0, // irelevant
      nationalJobs: 0
    } //irelevant 
  };

  function addSubjects(result: Result, FilterSubjects: string[]): Types.Subject[] {
    const optimalSubjectsAndScores: Types.Subject[] = [];
    if (FilterSubjects.length > 0) {
      FilterSubjects.forEach((subject) => {
        optimalSubjectsAndScores.push({ title: subject, score: result.result.vars[subject] })
      })
    } else {
      Object.keys(SubjectTitle).forEach((key) => {
        optimalSubjectsAndScores.push({ title: key, score: result.result.vars[key] })
      })
    }
    return optimalSubjectsAndScores;
  }

  /*
  function addIndustries(result: Result, FilterIndustries: string[]): Types.Industry[] {
    const optimalIndustries: Types.Industry[] = [];
    FilterIndustries.forEach((industry) => {
      optimalIndustries.push({ title: industry, share: result.result.vars[industry] })
    })
    return optimalIndustries;
  }
  */
  return optimalEducation;
}

