import { EChartsOption } from 'echarts';

export const createPieChartOptions: () => EChartsOption = () => ({
  title: {
    text: 'Pie Chart Example',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Sector 1' },
        { value: 735, name: 'Sector 2' },
        { value: 580, name: 'Sector 3' },
        { value: 484, name: 'Sector 4' },
        { value: 300, name: 'Sector 5' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
});
