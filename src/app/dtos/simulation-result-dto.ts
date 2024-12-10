import { ISimulationResult } from "../interfaces/simulation-result.interface";

export interface SimulationResultDto  {
    simulationResult: ISimulationResult;
    averageTime: number;
    columns: number;
    rows: number;
}