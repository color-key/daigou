import Highcharts from "./highcharts";
const HighchartsOptions = Highcharts.getOptions();
const HighchartsOptionsColors = HighchartsOptions.colors || ['#fff'];

interface OptionsType {
  color?: string,
  type?: any
  threshold: number | null
}

interface Params {
  id: string,
  data: any,
  color?: string,
  seriesName?: string,
  seriesColor?: string,
  type?: 'area' | 'areaspline' | any,
  options?: {}
  threshold?: number | null
  min?: number
  max?: number
}

export const getPlotOptions:any = ({color, type, threshold=null}: OptionsType) => ({
  [type]: {
    fillColor: {
      linearGradient: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 1
      },
      stops: [
        [0, color || HighchartsOptionsColors[0]],
        [1, '#fff']
      ]
    },
    marker: {
      radius: 0
    },
    lineWidth: 2,
    states: {
      hover: {
        lineWidth: 2
      }
    },
    threshold
  },
});

const lineCharts = ({id, seriesName, data, color, seriesColor, options, type='area', threshold=null, min, max}: Params) => {
  if(min === 0 && max === 0){
    max = undefined;
  }else if(min && max && min === max){
    min = 0;
  }
  return Highcharts.chart(id, {
    credits: {
      enabled: false
    },
    chart: {
      zoomType: 'x',
    },
    title: {
      text: ''
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        millisecond: '%H:%M:%S',
        second: '%H:%M:%S',
        minute: '%H:%M',
        hour: '%H:%M',
        day: '%m-%d',
        week: '%m-%d',
        month: '%Y-%m',
        year: '%Y'
      },
    },
    yAxis: {
      title: {
        text: ''
      },
      min,
      max,
      minRange: 1
    },
    tooltip: {
      dateTimeLabelFormats: {
        millisecond: '%Y-%m-%d %H:%M:%S',
        second: '%Y-%m-%d %H:%M:%S',
        minute: '%Y-%m-%d %H:%M:%S',
        hour: '%Y-%m-%d %H:%M:%S',
        day: '%Y-%m-%d %H:%M:%S',
        week: '%Y-%m-%d %H:%M:%S',
        month: '%Y-%m-%d %H:%M:%S',
        year: '%Y-%m-%d %H:%M:%S'
      },
    },
    legend: {
      enabled: false
    },
    plotOptions: getPlotOptions({color, type, threshold}),
    series: [{
      color: seriesColor || HighchartsOptionsColors[0],
      type,
      name: seriesName,
      data
    }],
    ...options
  });
};

export default lineCharts;