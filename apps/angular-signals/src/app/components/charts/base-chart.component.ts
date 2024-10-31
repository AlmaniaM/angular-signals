import { Component, Input, Signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';

type UpdateChartOptionsFn = (opts: EChartsOption) => EChartsOption;

@Component({
  selector: '',
  standalone: true,
  imports: [NgxEchartsDirective, MatButtonModule],
  templateUrl: './base-chart.component.html',
})
export class BaseChartComponent {
  @Input() options!: WritableSignal<EChartsOption> | Signal<EChartsOption>;

  protected randomizeChartOptions(): void {}

  protected deepCopyOptions(options?: EChartsOption): EChartsOption {
    return JSON.parse(JSON.stringify(options || this.options()));
  }

  protected getRandomNumber(max: number) {
    return Math.floor(Math.random() * max);
  }

  protected updateChartOptions(
    options: EChartsOption | UpdateChartOptionsFn
  ): void {
    if ('set' in this.options) {
      if (typeof options === 'function') {
        this.options.update(options);
      } else {
        this.options.set(options);
      }
    }
  }
}
