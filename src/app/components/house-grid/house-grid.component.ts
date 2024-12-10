import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SimulationResultDto } from '../../dtos/simulation-result-dto';
import { IHouse } from '../../interfaces/house.interface';
import { IHouseGrid } from '../../interfaces/house-grid.interface';
import { IGridPerHour } from '../../interfaces/grid-per-hour.interface';

@Component({
  selector: 'app-house-grid',
  templateUrl: './house-grid.component.html',
  styleUrl: './house-grid.component.scss',
})
export class HouseGridComponent implements OnInit {
  @Input({ required: true }) gridPerHour!: IGridPerHour[];
  @Input({ required: true }) columns!: number;
  @Input({ required: true }) rows!: number;
  @Output() increaseSimulationCount = new EventEmitter<number>();

  result: SimulationResultDto | null = null;
  houseGrid: IHouseGrid | null = null;
  currentHour: number = 0;
  maxHour: number = 0;
  interval: any;

  doneSimulating: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.maxHour = this.gridPerHour[this.gridPerHour.length - 1].hour;
    this.createHouses();
    this.interval = setInterval(() => {
      this.nextHour();
    }, 1000);
  }



  //Increase the current hour every second until the maxhour is reached
  nextHour(): void {
    if (this.currentHour < this.maxHour) {
      this.currentHour++;
    } else {
      this.increaseSimulationCount.emit(1);
      clearInterval(this.interval);
    }
  }

  //Create all houses that should be in the grid
  createHouses() {
    this.houseGrid = {
      columns: this.columns,
      rows: this.rows,
      houses: [],
    };

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        let house: IHouse = {
          position: {
            x: j,
            y: i,
          },
          visited: false,
        };
        this.houseGrid.houses.push(house);
      }
    }
  }

  //Get the column and row length
  createArray(size: number): number[] {
    return Array.from({ length: size }, (_, i) => i);
  }

  //Colorize each house that has been visited
  colorizeHouseIfItHasBeenVisited(row: number, col: number) {
    this.checkIfHouseHasSalesmanAtHour(col, row, this.currentHour);

    if (
      this.houseGrid!.houses.find(
        (h) => h.position.x == col && h.position.y === row
      )?.visited
    ) {
      return true;
    }

    return false;
  }


  //Get all visited houses
  checkIfHouseHasSalesmanAtHour(x: number, y: number, hour: number) {
    const hourData = this.gridPerHour.find((g) => g.hour === hour);

    const isVisited = hourData!.persons.some(
      (person) =>
        person.position.x === x && person.position.y === y && person.isSalesman
    );

    if (isVisited && this.houseGrid) {
      const house = this.houseGrid.houses.find(
        (h) => h.position.x === x && h.position.y === y
      );
      if (house) {
        house.visited = true;
      }
    }

    if (!this.houseGrid?.houses.find((h) => h.visited === false)) {
      this.doneSimulating = true;
      
    }
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
