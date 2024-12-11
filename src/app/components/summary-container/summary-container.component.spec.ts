import { byTestId, createComponentFactory, Spectator } from '@ngneat/spectator';
import { SummaryContainerComponent } from './summary-container.component';

describe('SummaryContainerComponent', () => {
  let spectator: Spectator<SummaryContainerComponent>;
  const createComponent = createComponentFactory({
    component: SummaryContainerComponent,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display total simulations', () => {
    spectator.component.totalSimulations = 150;

    spectator.detectChanges();

    const totalSimulationsText = spectator.query(
      byTestId('totaSimulationsText')
    );
    expect(totalSimulationsText!.textContent).toContain(
      'Total simulations: 150'
    );
  });

  it('should diisplay average time', () => {
    spectator.component.averageTime = 3.5;

    spectator.detectChanges();

    const averageTimeText =spectator.query(
      byTestId('averageTimeText'));
    expect(averageTimeText!.textContent).toContain('Average time: 3.5 h');
  });
});
