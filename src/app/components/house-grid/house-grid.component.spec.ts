import { createComponentFactory, Spectator, byTestId } from '@ngneat/spectator';
import { HouseGridComponent } from './house-grid.component';

describe('HouseGridComponent', () => {
  let spectator: Spectator<HouseGridComponent>;

  const createComponent = createComponentFactory({
    component: HouseGridComponent,
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        gridPerHour: [
          {
            hour: 0,
            persons: [
              { isSalesman: true, position: { x: 0, y: 0 } },
              { isSalesman: false, position: { x: 0, y: 1 } },
              { isSalesman: false, position: { x: 1, y: 1 } },
              { isSalesman: false, position: { x: 1, y: 0 } },
            ],
          },
          {
            hour: 1,
            persons: [
              { isSalesman: true, position: { x: 0, y: 0 } },
              { isSalesman: true, position: { x: 0, y: 1 } },
              { isSalesman: false, position: { x: 1, y: 1 } },
              { isSalesman: false, position: { x: 1, y: 0 } },
            ],
          },

          {
            hour: 3,
            persons: [
              { isSalesman: true, position: { x: 0, y: 0 } },
              { isSalesman: true, position: { x: 0, y: 1 } },
              { isSalesman: true, position: { x: 1, y: 1 } },
              { isSalesman: false, position: { x: 1, y: 0 } },
            ],
          },
          {
            hour: 4,
            persons: [
              { isSalesman: true, position: { x: 0, y: 0 } },
              { isSalesman: true, position: { x: 0, y: 1 } },
              { isSalesman: true, position: { x: 1, y: 1 } },
              { isSalesman: true, position: { x: 1, y: 0 } },
            ],
          },
        ], 
        rows: 2, 
        columns: 2, 
      },
    });
  });

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should render the correct number of rows and columns', () => {
    spectator.component.ngOnInit(); 
    spectator.detectChanges(); 

    const rows = spectator.queryAll(byTestId('rows')); 
    const firstRow = rows[0] as HTMLElement; 
    const columns = firstRow.querySelectorAll('[data-testid="columns"]'); 

    expect(rows.length).toBe(2);
    rows.forEach((row) => {
      const cols = row.querySelectorAll('[data-testid="columns"]');
      expect(cols.length).toBe(2);
    });

    expect(columns.length).toBe(2);
  });
});
