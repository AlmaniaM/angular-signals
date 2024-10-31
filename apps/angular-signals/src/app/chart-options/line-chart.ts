import { EChartsOption } from 'echarts';

export const createLineChartOptions: () => EChartsOption = () => ({
  title: {
    text: 'Line Chart Example',
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: 'Sales',
      type: 'line',
      data: [120, 200, 150, 80, 70, 110, 130, 180, 230, 300, 280, 350],
      smooth: true,
    },
  ],
});
