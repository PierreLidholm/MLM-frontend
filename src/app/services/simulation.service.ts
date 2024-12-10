import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { SimulationResultDto } from '../dtos/simulation-result-dto';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {

  private simulationResult = new Subject<SimulationResultDto>();
  
  // Expose the BehaviorSubject as an Observable to subscribers
  simulationResult$ = this.simulationResult.asObservable();
  
  updateSimulationResult(simulationResult: SimulationResultDto): void {
    this.simulationResult.next(simulationResult);
  }
}
