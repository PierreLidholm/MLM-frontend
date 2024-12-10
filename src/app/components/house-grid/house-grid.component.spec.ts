import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseGridComponent } from './house-grid.component';

describe('HouseGridComponent', () => {
  let component: HouseGridComponent;
  let fixture: ComponentFixture<HouseGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouseGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
