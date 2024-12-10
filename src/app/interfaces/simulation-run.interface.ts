import { IGridPerHour } from "./grid-per-hour.interface";

export interface ISimulationRun {
    id: string; 
    hours: number;
    gridPerHour: IGridPerHour[];
}