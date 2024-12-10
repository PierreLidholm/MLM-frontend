import { ISimulationRun } from "./simulation-run.interface";

export interface ISimulationResult {
    simulationRuns: ISimulationRun[];
    averageHours: number;
}