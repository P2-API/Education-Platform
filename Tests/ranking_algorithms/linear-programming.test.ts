import { describe, it, expect } from 'vitest';
import { LPsolver, findOptimalSolution, LPsettings, LPclass} from '../../Backend/utilities/linear-programming';

describe("findOptimalSolution", () => {
    const settings:LPsettings = {
        minimize: false,
        objectiveCoefficients: [40,30],
        constraints: [
            {coefficients: [1,1], operator: "<=", value: 12},
            {coefficients: [2,1], operator: "<=", value: 16},
            {coefficients: [1,0], operator: ">=", value: 0},
            {coefficients: [0,1], operator: ">=", value: 0},
        ]
    }
    it("should return the optimal value to the linear program constructed from the abovementioned settings", () => {
        expect(findOptimalSolution(settings).result).toBe(400);
    })
    it("should return the values of the opjective variables for which the optimal value was obtained", () => {
        expect(findOptimalSolution(settings).result.vars).toEqual([4,8]);
    })

    settings.minimize = true;
    it("should return the optimal value to the linear program constructed from the abovementioned settings", () => {
        expect(findOptimalSolution(settings).result).toBe(0);
    })
    it("should return the values of the opjective variables for which the optimal value was obtained", () => {
        expect(findOptimalSolution(settings).result.vars).toEqual([0,0]);
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

describe("SetupLP (LPsolver method)", () => {
    const solver = new LPsolver();
    const settings:LPsettings = {
        minimize: false,
        objectiveCoefficients: [40,30],
        constraints: [
            {coefficients: [1,1], operator: "<=", value: 12},
            {coefficients: [2,1], operator: "<=", value: 16},
            {coefficients: [1,0], operator: ">=", value: 0},
            {coefficients: [0,1], operator: ">=", value: 0},
        ]
    }
    it("should construct and return an LP object corresponding to the abovementioned settings", () => {
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
describe("LPclass", () => {
    const solver = new LPsolver();
        const settings:LPsettings = {
            minimize: false,
            objectiveCoefficients: [2,5],
            constraints: [
                {coefficients: [1,4], operator: "<=", value: 24},
                {coefficients: [3,1], operator: "<=", value: 21},
                {coefficients: [1,1], operator: "<=", value: 9},
                {coefficients: [0,1], operator: ">=", value: 0},
                {coefficients: [1,0], operator: ">=", value: 0}
            ]
        }
    const lp = new LPclass();

    describe("AddObjectiveFunction method", () => {
        it("should add the objective function to the lp object", () => {
            lp.addObjectiveFunction(settings);
            expect(lp.objective).toEqual({
                    direction: solver.solver.GLP_MAX,
                    name: "objective value",
                    vars: [{name: "x_1", coef: 2},
                        {name: "x_2", coef: 5}]
                    }
            );
        });
    })

    describe("AddConstraints method", () => {
        it("should add the constraints to the lp object", () => {
            lp.addConstraints(settings);
            expect(lp.subjectTo).toEqual([
                {
                    name: "constraint 1",
                    vars: [{name: "x_1", coef: 1},
                            {name: "x_2", coef: 4}],
                    bnds: {type: solver.solver.GLP_UP, ub: 24, lb: 0}
                },
                {
                    name: "constraint 2",
                    vars: [{name: "x_1", coef: 3},
                            {name: "x_2", coef: 1}],
                    bnds: {type: solver.solver.GLP_UP, ub: 21, lb: 0}
                },
                {
                    name: "constraint 3",
                    vars: [{name: "x_1", coef: 1},
                            {name: "x_2", coef: 1}],
                    bnds: {type: solver.solver.GLP_UP, ub: 9, lb: 0}
                },
                {
                    name: "constraint 4",
                    vars: [{name: "x_2", coef: 1}],
                    bnds: {type: solver.solver.GLP_LO, ub: 0, lb: 0}
                },
                {
                    name: "constraint 5",
                    vars: [{name: "x_1", coef: 1}],
                    bnds: {type: solver.solver.GLP_LO, ub: 0, lb: 0}
                }
            ]);
        });
    })
})