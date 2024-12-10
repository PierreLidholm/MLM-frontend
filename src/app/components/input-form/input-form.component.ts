import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ISimulationValues } from '../../interfaces/simulation-values.interface';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.scss',
})
export class InputFormComponent {
  @Output() simulationValuesEmitter = new EventEmitter<ISimulationValues>();
  simulationForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder
  ) {
    this.simulationForm = this.fb.group({
      columns: [null, [Validators.required, Validators.min(2)]],
      rows: [null, [Validators.required, Validators.min(2)]],
      totalRuns: [null, [Validators.required, Validators.min(1)]],
    });
  }

  //Check if the form is valid
  isValid(): boolean {
    return this.simulationForm.valid;
  }

  //Emit values if the inputs are valid
  //Else show error messages
  onSubmit(): void {
    this.submitted = true;

    if (this.isValid()) {
      const simulationInputForm = this.simulationForm.value;
      var simulationValues: ISimulationValues = {
        rows: simulationInputForm.rows,
        columns: simulationInputForm.columns,
        totalRuns: simulationInputForm.totalRuns
      }

      this.simulationValuesEmitter.emit(simulationValues)
    }
  }
}
