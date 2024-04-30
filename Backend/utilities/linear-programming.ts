import { GLPK, LP, Result} from 'glpk.js/dist/glpk';
import GLPKConstructor from 'glpk.js/dist/glpk';

export type LPsettings = {
  minimize: boolean, 
  objectiveCoefficients: number[], 
  constraints: {coefficients: number[], operator: string, value: number}[]
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

export class LPclass implements LP{
  name: string;
  objective: objectiveType;
  subjectTo: SubjectToType;
  constructor(){
    this.name = "";
    this.objective = {direction: 0, name: "", vars: []};
    this.subjectTo = [];
  }
  addObjectiveFunction(settings:LPsettings):void{
  }
  addConstraints(settings:LPsettings):void{
  }
}

export class LPsolver{
  solver: GLPK;
  constructor(){
    this.solver = GLPKConstructor();
  }
  solve(settings:LPsettings):Result{
    const lp:LP = this.setUpLP(settings);
    return this.solver.solve(lp);
  }
  setUpLP(settings:LPsettings):LP{
    const lp = new LPclass()
    lp.addObjectiveFunction(settings);
    lp.addConstraints(settings);
    return lp;
  }
}

export function findOptimalSolution(settings: LPsettings):Result{
  const solver = new LPsolver();
  return solver.solve(settings);
}