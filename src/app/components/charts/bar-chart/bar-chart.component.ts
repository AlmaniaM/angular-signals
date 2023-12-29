import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgxEchartsDirective } from 'ngx-echarts';
import { BaseChartComponent } from '../base-chart.component';
import { createBarChartOptions } from '../../../chart-options/bar-chart';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'bar-chart',
  standalone: true,
  imports: [NgxEchartsDirective, MatButtonModule],
  templateUrl: '../base-chart.component.html',
  styleUrl: '../_base-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarChartComponent extends BaseChartComponent {

  constructor() {
    super();

    // NOTE: Signals HAVE to have an initial value.
    this.options = signal(createBarChartOptions(), {
      /**
       * NOTE: OPTIONAL
       *
       * The signal seems to hold a mutable value and is the original object reference. If you updated the child properties of an object
       * without first copying it, then those child properties are reflected in the Signal value state, even if you don't call the .set() function.
       * Because of those type of scenarios, it could be difficult to have a custom equals function or it's just for specific scenarios.
       */
      equal: (a, b) => JSON.stringify((a.series as any[])[0].data) === JSON.stringify((b.series as any[])[0].data)
    });
  }

  protected override randomizeChartOptions = () => {
    const newOptions: EChartsOption = this.deepCopyOptions();
    const series = newOptions.series! as any[];
    series[0].data[2] = this.getRandomNumber(500);

    /**
     * Ability to override the current value with the set() function.
     */
    this.updateChartOptions(newOptions);
  }
}
