import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';
import * as echarts from 'echarts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  barChartOptions: EChartsOption = {};
  pieChartOptions: EChartsOption = {};
  lineChartOptions: EChartsOption = {};
  gradientStackedArea: EChartsOption = {};

  ngOnInit(): void {
    this.barChartOptions = {
      title: {
          text: 'Bar Chart Example'
      },
      tooltip: {},
      xAxis: {
          data: ["Category A", "Category B", "Category C", "Category D", "Category E"]
      },
      yAxis: {},
      series: [{
          name: 'Sales',
          type: 'bar',
          data: [50, 200, 360, 100, 300]
      }]
    };

    this.pieChartOptions = {
      title: {
          text: 'Pie Chart Example',
          left: 'center'
      },
      tooltip: {
          trigger: 'item'
      },
      legend: {
          orient: 'vertical',
          left: 'left',
      },
      series: [{
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
              { value: 1048, name: 'Sector 1' },
              { value: 735, name: 'Sector 2' },
              { value: 580, name: 'Sector 3' },
              { value: 484, name: 'Sector 4' },
              { value: 300, name: 'Sector 5' }
          ],
          emphasis: {
              itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
      }]
    };

    this.lineChartOptions = {
      title: {
          text: 'Line Chart Example'
      },
      tooltip: {
          trigger: 'axis'
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          name: 'Sales',
          type: 'line',
          data: [120, 200, 150, 80, 70, 110, 130, 180, 230, 300, 280, 350],
          smooth: true
      }]
    };

    this.gradientStackedArea = {
      color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
      title: {
        text: 'Gradient Stacked Area Chart'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Line 1',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(128, 255, 165)'
              },
              {
                offset: 1,
                color: 'rgb(1, 191, 236)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [140, 232, 101, 264, 90, 340, 250]
        },
        {
          name: 'Line 2',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(0, 221, 255)'
              },
              {
                offset: 1,
                color: 'rgb(77, 119, 255)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [120, 282, 111, 234, 220, 340, 310]
        },
        {
          name: 'Line 3',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(55, 162, 255)'
              },
              {
                offset: 1,
                color: 'rgb(116, 21, 219)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [320, 132, 201, 334, 190, 130, 220]
        },
        {
          name: 'Line 4',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 0, 135)'
              },
              {
                offset: 1,
                color: 'rgb(135, 0, 157)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [220, 402, 231, 134, 190, 230, 120]
        },
        {
          name: 'Line 5',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          label: {
            show: true,
            position: 'top'
          },
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 191, 0)'
              },
              {
                offset: 1,
                color: 'rgb(224, 62, 76)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [220, 302, 181, 234, 210, 290, 150]
        }
      ]
    };
  }
}
