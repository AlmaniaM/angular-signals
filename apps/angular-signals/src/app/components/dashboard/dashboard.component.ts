import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgxEchartsDirective } from 'ngx-echarts';
import { BarChartComponent } from '../charts/bar-chart/bar-chart.component';
import { PieChartComponent } from '../charts/pie-chart/pie-chart.component';
import { LineChartComponent } from '../charts/line-chart/line-chart.component';
import { GradientStackedChartComponent } from '../charts/gradient-stacked-chart/gradient-stacked-chart.component';
import { BarRaceChartComponent } from '../charts/bar-race-chart/bar-race-chart.component';
import { LoadingChartComponent } from '../charts/loading-chart/loading-chart.component';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgxEchartsDirective,
    MatButtonModule,
    BarChartComponent,
    PieChartComponent,
    LineChartComponent,
    GradientStackedChartComponent,
    BarRaceChartComponent,
    LoadingChartComponent,
    MatDividerModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
