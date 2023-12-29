import { Component, OnInit, Inject, INJECTOR, Injector } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import { MatButtonModule } from '@angular/material/button';
import { createGradientStackedArea } from '../../../chart-options/gradient-stack-data';
import { BehaviorSubject } from 'rxjs';
import { BaseChartComponent } from '../base-chart.component';
import { EChartsOption } from 'echarts';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'gradient-stacked-chart',
  standalone: true,
  imports: [NgxEchartsDirective, MatButtonModule],
  templateUrl: '../base-chart.component.html',
  styleUrl: '../_base-chart.component.scss'
})
export class GradientStackedChartComponent extends BaseChartComponent implements OnInit {
  private _chartOptionsSubject = new BehaviorSubject<EChartsOption>(createGradientStackedArea());

  constructor(@Inject(INJECTOR) private _injector: Injector) {
    super();

    // NOTE: toSignal MUST have an initial value. This means it'll either be undefined or the initial value you guarantee to provide with options below.
    this.options = toSignal(this._chartOptionsSubject.asObservable(), {
      // This will ensure that there's a value when the signal is first created.
      // We can safely assume this because we're using a BehaviorSubject.
      requireSync: true,

      // This property can be used if your source observable doesn't provide an immediate value and/or the above requireSync is false.
      // initialValue: createGradientStackedArea(),

      injector: this._injector,

      // OPTIONAL: manual cleanup/destroy
      manualCleanup: false,

      // If true, this will behave similar to an Observable or the async pipe.
      // If false, the signal will emit the last good value forever after an observable error occurs.
      rejectErrors: true,
    });
  }

  ngOnInit(): void {
    // this._chartOptionsSubject.next(createGradientStackedArea());
  }
}
