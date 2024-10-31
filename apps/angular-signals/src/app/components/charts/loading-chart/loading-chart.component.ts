import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgxEchartsDirective } from 'ngx-echarts';
import { BaseChartComponent } from '../base-chart.component';

@Component({
  selector: 'loading-chart',
  standalone: true,
  imports: [NgxEchartsDirective, MatButtonModule],
  templateUrl: '../base-chart.component.html',
  styleUrl: '../_base-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingChartComponent extends BaseChartComponent {
  constructor() {
    super();

    this.options = signal({
      graphic: {
        elements: [
          {
            type: 'group',
            left: 'center',
            top: 'center',
            children: new Array(7).fill(0).map((val, i) => ({
              type: 'rect',
              x: i * 20,
              shape: {
                x: 0,
                y: -40,
                width: 10,
                height: 80,
              },
              style: {
                fill: '#5470c6',
              },
              keyframeAnimation: {
                duration: 1000,
                delay: i * 200,
                loop: true,
                keyframes: [
                  {
                    percent: 0.5,
                    scaleY: 0.3,
                    easing: 'cubicIn',
                  },
                  {
                    percent: 1,
                    scaleY: 1,
                    easing: 'cubicOut',
                  },
                ],
              },
            })),
          },
        ],
      },
    });
  }
}
