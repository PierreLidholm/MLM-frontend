import { IHouse } from "./house.interface";

export interface IHouseGrid {
    columns: number;
    rows: number;
    houses: IHouse[]
}