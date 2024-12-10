import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { SimulationService } from '../../services/simulation.service';
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
  result: SimulationResultDto | null = null;
  houseGrid: IHouseGrid | null = null;
  currentHour: number = 0;
  maxHour: number = 0;
  intervalId: any;

  doneSimulating: boolean = false;

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.maxHour = this.gridPerHour[this.gridPerHour.length - 1].hour;
    this.createHouses();
    this.intervalId = setInterval(() => {
      this.nextHour();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextHour(): void {
    if (this.currentHour < this.maxHour) {
      this.currentHour++;
    } else {
      clearInterval(this.intervalId);
    }
  }

  //Create all houses that should be in each grid
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
}
