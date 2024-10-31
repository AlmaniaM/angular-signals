import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgxEchartsDirective } from 'ngx-echarts';
import { BaseChartComponent } from '../base-chart.component';
import { createPieChartOptions } from '../../../chart-options/pie-chart';

@Component({
  selector: 'pie-chart',
  standalone: true,
  imports: [NgxEchartsDirective, MatButtonModule],
  templateUrl: '../base-chart.component.html',
  styleUrl: '../_base-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PieChartComponent extends BaseChartComponent {
  constructor() {
    super();

    this.options = signal(createPieChartOptions());
  }

  protected override randomizeChartOptions(): void {
    const newOptions = this.deepCopyOptions();
    const series = newOptions.series! as any[];
    series[0].data[1].value = this.getRandomNumber(1000);

    /**
     * Ability to update the existing options.
     */
    this.updateChartOptions((currentOptions) => ({
      ...currentOptions,
      series,
    }));
  }
}
