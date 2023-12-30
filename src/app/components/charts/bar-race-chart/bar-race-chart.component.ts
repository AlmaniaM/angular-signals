import { AfterViewInit, ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgxEchartsDirective } from 'ngx-echarts';
import { BaseChartComponent } from '../base-chart.component';
import { createBarRaceChartOptions, getBarRaceChartLifeExpectancyData } from '../../../chart-options/bar-race-chart';

@Component({
  selector: 'bar-race-chart',
  standalone: true,
  imports: [NgxEchartsDirective, MatButtonModule],
  templateUrl: '../base-chart.component.html',
  styleUrl: '../_base-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarRaceChartComponent extends BaseChartComponent implements AfterViewInit {

  private _data: any;
  private _startYear: number;
  private _startIndex: number;
  private _years: number[];
  private _updateFrequency: number;

  constructor() {
    super();

    const { options, startYear, startIndex, years, updateFrequency } = createBarRaceChartOptions();

    this.options = signal(options);
    this._startIndex = startIndex;
    this._startYear = startYear;
    this._years = years;
    this._updateFrequency = updateFrequency;

    this._data = getBarRaceChartLifeExpectancyData();
  }

  ngAfterViewInit(): void {
    for (let i = this._startIndex; i < this._years.length - 1; ++i) {
      ((i) => {
        setTimeout(() => {
          this.updateYear(this._years[i + 1]);
        }, (i - this._startIndex) * this._updateFrequency);
      })(i);
    }
  }

  updateYear(year: number): void {
    // Don't deep copy because it has there are functions in the object
    const copyOptions = { ...this.options() }; // this.deepCopyOptions();

    let source = this._data.slice(1).filter((d: any) => d[4] === year);
    (copyOptions.series as any)[0].data = source;
    (copyOptions.graphic as any).elements[0].style.text = year;
    this.updateChartOptions(copyOptions);
  }

  protected override randomizeChartOptions = () => {

  }
}
