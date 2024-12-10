import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary-container',
  templateUrl: './summary-container.component.html',
  styleUrl: './summary-container.component.scss'
})
export class SummaryContainerComponent {
  @Input({required: true}) averageTime!: number;
  @Input({required: true}) totalSimulations!: number;
}
