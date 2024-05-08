import {GLPK, LP, Result} from 'glpk.js/dist/glpk';
import * as Types from '../../src/types';
import GLPKConstructor from 'glpk.js/dist/glpk';

export class LPclass implements LP{
  name: string;
  objective: Types.objectiveType;
  subjectTo: Types.SubjectToType;
  constructor(solver:GLPK){
    this.name = "Optimal education";
    this.objective = {direction: solver.GLP_MAX, name: "Optimal Education", vars: []};
    this.subjectTo = [];
  }
  addObjectiveFunction(quizAnswers:Types.QuizAnswers, filters:Types.TableFilters):void{
    const variables = this.objective.vars
    // add weights to:
    // subjects
    filters.hasSubjects.forEach((subject) =>{
      variables.push({name: subject, coef:quizAnswers.subjectsPriority})
    })
    // industries
    filters.hasIndustries.forEach((industry) =>{
      variables.push({name: industry, coef:quizAnswers.subjectsPriority})
    })
    // hours
    variables.push({name: "withManyStudents", coef:quizAnswers.highWorkloadAcceptancePriority},
                  {name: "withFewStudents", coef:quizAnswers.highWorkloadAcceptancePriority},
                  {name: "withManyLectures", coef:quizAnswers.highWorkloadAcceptancePriority},)
  
    // socialFeedback
    variables.push({name: "socialEnvironment", coef:quizAnswers.socialEnvironmentPriority},
                  {name: "groupEngagement", coef:quizAnswers.groupEngagementPriority},
                  {name: "loneliness", coef:quizAnswers.lonelinessPriority},
                  {name: "stress", coef:quizAnswers.stressPriority})
    // academicFeedback
    variables.push({name: "academicEnvironment", coef:quizAnswers.academicEnvironmentPriority},
                  {name: "teacherEvalutation", coef:quizAnswers.teachingPriority})
    // academicWorkload
    variables.push({name: "studentJob", coef:quizAnswers.studentJobPriority},
                  {name: "lectures", coef:quizAnswers.lecturesPriority},
                  {name: "literature", coef:quizAnswers.literaturePriority})
    // degreeStructure
    variables.push({name: "dislikeExam", coef:quizAnswers.dislikeExamPriority},
                  {name: "internship", coef:quizAnswers.internshipPriority},
                  {name: "internationalStay", coef:quizAnswers.internationalStayPriority})
    // jobData
    variables.push({name: "workNationally", coef:quizAnswers.workNationallyPriority},
                  {name: "startingSalary", coef:quizAnswers.startingSalaryPriority},
                  {name: "experiencedSalary", coef:quizAnswers.experiencedSalaryPriority},
                  {name: "unemployment", coef:quizAnswers.unemploymentPriority},
                  {name: "degreeRelevance", coef:quizAnswers.degreeRelevancePriority},
                  {name: "fixedHours", coef:quizAnswers.fixedHoursPriority},
                  {name: "flexibleHours", coef:quizAnswers.flexibleHoursPriority},
                  {name: "selfSchedule", coef:quizAnswers.selfSchedulePriority},
                  {name: "variableSchedule", coef:quizAnswers.variableSchedulePriority},
                  {name: "nightAndEveningShifts", coef:quizAnswers.nightAndEveningShiftsPriority},
                  {name: "workNationally", coef:quizAnswers.workNationallyPriority})
  
  }
  addConstraints(filters:Types.TableFilters):void{
    
  }
}

export class LPsolver{
  solver: GLPK;
  constructor(){
    this.solver = GLPKConstructor();
  }
  solve(userImputs:Types.UserImputs):Result{
    const lp:LP = this.setUpLP(userImputs);
    return this.solver.solve(lp);
  }
  setUpLP(userImputs:Types.UserImputs):LP{
    const lp = new LPclass(this.solver)
    lp.addObjectiveFunction(userImputs.quizAnswers, userImputs.filters);
    lp.addConstraints(userImputs.filters);
    return lp;
  }
}

export function findOptimalSolution(userImputs:Types.UserImputs):Result{
  const solver = new LPsolver();
  return solver.solve(userImputs);
}

const solver = new LPsolver();