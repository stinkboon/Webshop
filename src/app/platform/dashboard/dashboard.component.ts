import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, BaseChartDirective],
  template: `
    <mat-card>
      <canvas baseChart
              [data]="chartData"
              [type]="chartType">
      </canvas>
    </mat-card>
  `
})
export class DashboardComponent {
  chartType: 'bar' = 'bar';

  chartData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      { data: [12, 19, 3, 5, 2, 3], label: 'Votes' }
    ]
  };
}
