import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let spectator: SpectatorService<ApiService>;
  let httpTestingController: HttpTestingController;

  const createService = createServiceFactory({
    service: ApiService,
    imports: [HttpClientTestingModule],
  });

  beforeEach(() => {
    spectator = createService();
    httpTestingController = spectator.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should call the GET endpoint with correct parameters', () => {
    const rows = 3;
    const columns = 4;
    const totalSimulations = 5;

    const expectedParams = {
      rows: rows.toString(),
      columns: columns.toString(),
      totalSimulations: totalSimulations.toString(),
    };

    const mockResponse = { data: 'success' }; 

    // Act
    spectator.service.get(rows, columns, totalSimulations).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(
      `https://localhost:7048/api/MLM/get?rows=3&columns=4&totalSimulations=5`
    );

    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('rows')).toBe(expectedParams.rows);
    expect(req.request.params.get('columns')).toBe(expectedParams.columns);
    expect(req.request.params.get('totalSimulations')).toBe(expectedParams.totalSimulations);

    req.flush(mockResponse);

    httpTestingController.verify();
  });
});