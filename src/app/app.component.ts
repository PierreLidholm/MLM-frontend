import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { ISimulationValues } from './interfaces/simulation-values.interface';
import { SimulationService } from './services/simulation.service';
import { SimulationResultDto } from './dtos/simulation-result-dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  showResults: boolean = false;
  averageTime: number = 0;
  totalSimulations: number = 0;

  constructor(
    private apiService: ApiService,
    private simulationService: SimulationService
  ) {
    this.simulationService.allSimulationsAreDone$.subscribe((x) => {
      this.showResults = x;
    });
  }

  resetValues() {
    this.simulationService.updateSimulationResult(null);
    this.simulationService.simulationsAreDone(false);
  }
  startSimulation(simulationValues: ISimulationValues) {
    this.resetValues();
    this.apiService
      .get(
        simulationValues.rows,
        simulationValues.columns,
        simulationValues.totalSimulations
      )
      .subscribe((simulationResultDto: SimulationResultDto) => {
        if (simulationResultDto !== null) {
          this.totalSimulations = simulationValues.totalSimulations;
          this.averageTime = simulationResultDto.averageTime;
          this.simulationService.updateSimulationResult(simulationResultDto);
        }
      });
  }
}
