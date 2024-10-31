import { EChartsOption } from 'echarts';

export const createBarChartOptions: () => EChartsOption = () => ({
  title: {
    text: 'Bar Chart Example',
  },
  tooltip: {},
  xAxis: {
    data: [
      'Category A',
      'Category B',
      'Category C',
      'Category D',
      'Category E',
    ],
  },
  yAxis: {},
  series: [
    {
      name: 'Sales',
      type: 'bar',
      data: [50, 200, 360, 100, 300],
    },
  ],
});
