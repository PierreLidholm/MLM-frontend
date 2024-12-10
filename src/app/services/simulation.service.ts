import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { SimulationResultDto } from '../dtos/simulation-result-dto';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {

  private simulationResult = new BehaviorSubject<SimulationResultDto | null>(null);

  private allSimulationsAreDone = new BehaviorSubject<boolean>(false);
  
  simulationResult$ = this.simulationResult.asObservable();
  allSimulationsAreDone$ = this.allSimulationsAreDone.asObservable();


  updateSimulationResult(simulationResult: SimulationResultDto | null): void {
    this.simulationResult.next(simulationResult);
  }

  simulationsAreDone(status: boolean) {
    this.allSimulationsAreDone.next(status);
  }
}
