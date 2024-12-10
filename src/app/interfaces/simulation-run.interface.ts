import { IGridPerHour } from "./grid-per-hour.interface";

export interface ISimulationRun {
    hours: number;
    gridPerHour: IGridPerHour[];
}