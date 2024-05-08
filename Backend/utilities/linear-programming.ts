import {GLPK, LP, Result} from 'glpk.js/dist/glpk';
import {UserImputs, objectiveType, SubjectToType, TableFilters, QuizAnswers} from '../../src/types'
import GLPKConstructor from 'glpk.js/dist/glpk';

export class LPclass implements LP{
  name: string;
  objective: objectiveType;
  subjectTo: SubjectToType;
  constructor(){
    this.name = "Optimal education";
    this.objective = {direction: 1, name: "", vars: []};
    this.subjectTo = [];
  }
  addObjectiveFunction(quizAnswers:QuizAnswers):void{
    let key:string;
    let value:number;
    for([key, value] of Object.entries(quizAnswers)){
      this.objective.vars.push({name:key, coef:value})
    }
   
  }
  addConstraints(filters:TableFilters):void{
    
  }
}

export class LPsolver{
  solver: GLPK;
  constructor(){
    this.solver = GLPKConstructor();
  }
  solve(userImputs:UserImputs):Result{
    const lp:LP = this.setUpLP(userImputs);
    return this.solver.solve(lp);
  }
  setUpLP(userImputs:UserImputs):LP{
    const lp = new LPclass()
    lp.addObjectiveFunction(userImputs.quizAnswers);
    lp.addConstraints(userImputs.filters);
    return lp;
  }
}

export function findOptimalSolution(userImputs:UserImputs):Result{
  const solver = new LPsolver();
  return solver.solve(userImputs);
}

const solver = new LPsolver();