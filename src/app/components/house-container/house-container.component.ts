import { Component } from '@angular/core';
import { SimulationService } from '../../services/simulation.service';
import { SimulationResultDto } from '../../dtos/simulation-result-dto';

@Component({
  selector: 'app-house-container',
  templateUrl: './house-container.component.html',
  styleUrl: './house-container.component.scss',
})
export class HouseContainerComponent {
  result: SimulationResultDto | null = null;

  constructor(private simulationService: SimulationService) {
    this.simulationService.simulationResult$.subscribe((result) => {
      this.result = result;
    });
  }
}
