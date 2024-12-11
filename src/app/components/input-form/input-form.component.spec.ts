import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { InputFormComponent } from './input-form.component';
import { ISimulationValues } from '../../interfaces/simulation-values.interface';

describe('InputFormComponent', () => {
  let component: InputFormComponent;
  let fixture: ComponentFixture<InputFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputFormComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  it('should mark form as invalid if required fields are empty', () => {
    const form = component.simulationForm;
    expect(form.valid).toBeFalsy();

    form.get('columns')?.setValue(null);
    form.get('rows')?.setValue(null);
    form.get('totalSimulations')?.setValue(null);

    expect(form.get('columns')?.valid).toBeFalsy();
    expect(form.get('rows')?.valid).toBeFalsy();
    expect(form.get('totalSimulations')?.valid).toBeFalsy();
  });

  it('should mark form as valid if fields have valid values', () => {
    const form = component.simulationForm;

    form.get('columns')?.setValue(4);
    form.get('rows')?.setValue(5);
    form.get('totalSimulations')?.setValue(10);

    expect(form.valid).toBeTruthy();
  });

  it('should emit when form is valid and submitted', () => {
    const form = component.simulationForm;
    const input: ISimulationValues = {
      rows: 5,
      columns: 4,
      totalSimulations: 10,
    };

    jest.spyOn(component.simulationValuesEmitter, 'emit');
    form.get('columns')?.setValue(input.columns);
    form.get('rows')?.setValue(input.rows);
    form.get('totalSimulations')?.setValue(input.totalSimulations);

    component.onSubmit();

    expect(component.simulationValuesEmitter.emit).toHaveBeenCalledWith(
      input
    );
  });

  it('should not emit when form is invalid and submitted', () => {
    jest.spyOn(component.simulationValuesEmitter, 'emit');

    component.onSubmit();

    expect(component.simulationValuesEmitter.emit).not.toHaveBeenCalled();
  });

});
