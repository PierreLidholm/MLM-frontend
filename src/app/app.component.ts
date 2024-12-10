import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { ISimulationValues } from './interfaces/simulation-values.interface';
import { SimulationService } from './services/simulation.service';
import { ISimulationResult } from './interfaces/simulation-result.interface';
import { SimulationResultDto } from './dtos/simulation-result-dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'MLM-frontend';

  constructor(
    private apiService: ApiService,
    private simulationService: SimulationService
  ) {}

  startSimulation(simulationValues: ISimulationValues) {
    this.apiService
      .get(
        simulationValues.rows,
        simulationValues.columns,
        simulationValues.totalRuns
      )
      .subscribe((simulationResultDto: SimulationResultDto) => {
        this.simulationService.updateSimulationResult(simulationResultDto);
      });
  }
}
