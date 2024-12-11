import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { of } from 'rxjs';
import { SimulationService } from '../../services/simulation.service';
import { HouseContainerComponent } from './house-container.component';

describe('HouseContainerComponent', () => {
  let spectator: Spectator<HouseContainerComponent>;

  const createComponent = createComponentFactory({
    component: HouseContainerComponent,
    mocks: [SimulationService],
  });

  beforeEach(() => {
    spectator = createComponent({
      providers: [
        {
          provide: SimulationService,
          useValue: {
            simulationResult$: of({
              simulationResult: {
                simulationRuns: [
                  { gridPerHour: [] },
                  { gridPerHour: [] },
                  { gridPerHour: [] },
                ],
              },
              columns: 3,
              rows: 3,
              averageTime: 2,
            }),
            simulationsAreDone: jest.fn(),
          },
        },
      ],
    });
  });

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should emit when simulations are finished', () => {
    const simulationService = spectator.inject(SimulationService);
    const spy = jest.spyOn(simulationService, 'simulationsAreDone');

    spectator.component.totalSimulations = 3;
    spectator.component.finishedSimulationsCount = 2; 
    spectator.component.onSimulationFinished(1); 

    expect(spectator.component.finishedSimulationsCount).toBe(0); 
    expect(spectator.component.totalSimulations).toBe(0); 
    expect(spy).toHaveBeenCalledWith(true); 
  });
});
