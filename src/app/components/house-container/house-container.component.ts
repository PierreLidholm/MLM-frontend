import { Component } from '@angular/core';
import { SimulationService } from '../../services/simulation.service';
import { SimulationResultDto } from '../../dtos/simulation-result-dto';

@Component({
  selector: 'app-house-container',
  templateUrl: './house-container.component.html',
  styleUrl: './house-container.component.scss',
})
export class HouseContainerComponent {
  simulationResult: SimulationResultDto | null = null;
  finishedSimulationsCount: number = 0;
  totalSimulations: number = 0;
  constructor(private simulationService: SimulationService) {
    this.simulationService.simulationResult$.subscribe((result) => {
      if (result) {
        this.simulationResult = result;
        this.simulationService.simulationsAreDone(false);
        this.totalSimulations =
          this.simulationResult!.simulationResult.simulationRuns.length;
      }
    });
  }

  onSimulationFinished(increase: number) {
    this.finishedSimulationsCount += increase;
    if (this.finishedSimulationsCount === this.totalSimulations) {
      this.totalSimulations = 0;
      this.finishedSimulationsCount = 0;
      this.simulationService.simulationsAreDone(true);
    }
  }
}
