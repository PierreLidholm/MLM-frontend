import { byTestId, createComponentFactory, Spectator } from '@ngneat/spectator';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { SimulationService } from './services/simulation.service';
import { of } from 'rxjs';
import { ISimulationValues } from './interfaces/simulation-values.interface';
import { SimulationResultDto } from './dtos/simulation-result-dto';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  let mockApiService: Partial<ApiService>;
  let mockSimulationService: Partial<SimulationService>;

  const createComponent = createComponentFactory({
    component: AppComponent,
    providers: [
      {
        provide: ApiService,
        useValue: {
          get: jest.fn(),
        },
      },
      {
        provide: SimulationService,
        useValue: {
          updateSimulationResult: jest.fn(),
          simulationsAreDone: jest.fn(),
          allSimulationsAreDone$: of(false),
        },
      },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    mockApiService = spectator.inject(ApiService);
    mockSimulationService = spectator.inject(SimulationService);
  });

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should reset values when resetValues is called', () => {
    spectator.component.resetValues();

    expect(mockSimulationService.updateSimulationResult).toHaveBeenCalledWith(null);
    expect(mockSimulationService.simulationsAreDone).toHaveBeenCalledWith(false);
  });

  it('should start the simulation when startSimulation is called', () => {
    const mockSimulationValues: ISimulationValues = {
      rows: 3,
      columns: 4,
      totalSimulations: 10,
    };

    const mockSimulationResultDto: SimulationResultDto = {
      simulationResult: {
        simulationRuns: [],
        averageHours: 5,
      },
      columns: 4,
      rows: 3,
      averageTime: 5,
    };

    (mockApiService.get as jest.Mock).mockReturnValue(of(mockSimulationResultDto));

    spectator.component.startSimulation(mockSimulationValues);

    expect(mockSimulationService.updateSimulationResult).toHaveBeenCalledWith(mockSimulationResultDto);
    expect(spectator.component.totalSimulations).toBe(mockSimulationValues.totalSimulations);
    expect(spectator.component.averageTime).toBe(mockSimulationResultDto.averageTime);
  });

  it('should show the summary when showResults is true', () => {
    spectator.component.showResults = true;
    spectator.detectChanges();

    const summaryContainer = spectator.query(byTestId('summaryContainer'));

    expect(summaryContainer).toBeTruthy();
  });
});
