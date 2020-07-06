import React from 'react';
import {makeStyles, createStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import lineCharts from '../highcharts/line-charts';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import Divider from '@material-ui/core/Divider';
import {getLocale} from "./locale";
import {useTheme} from "@/components/theme";
import {getJson} from "@fay-react/lib/fetch";
import moment from "moment";
import {TRADE_CHANGE_EVENT} from '@/lib/event/trade';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
    },
    number: {
      margin: theme.spacing(1, 2, 2, 2),
      height: 19,
      fontWeight: 'bold'
    },
    divider: {
      margin: theme.spacing(2, 2, 0, 2),
    },
    trendData: {
      alignSelf: 'flex-start'
    },
    trend: {
      display: 'flex',
      padding: theme.spacing(1.5, 2, 0, 2),
      // width: 240,
      height: 40,
      fontSize: '12px'
    },
    icon: {
      fontSize: '12px',
      alignSelf: 'flex-start',
      margin: theme.spacing(0.25, 1, 0 ,0.5)
    },
    chartsArea: {
      height: 100,
      overflow: 'hidden'
    },
    charts: {
      height: 100
    }
  })
);

interface Props {
  accuracy: number
  unit?: string,
  id?: string,
  color?: string,
  seriesColor?: string,
  currency?: string,
  timeout?: number,
  type: 'wallet' | 'currency'
}

export default ({id, type, color, currency, seriesColor, accuracy, unit, timeout = 0}: Props) => {

  let chart: any;
  let width: string | number;
  let chartInterval: NodeJS.Timeout|null = null;
  let listener: () => any;

  return (() => {
    const classes = useStyles();
    const localeLangData = getLocale().lang;
    const theme = useTheme();
    const chartRef = React.useRef(null);
    const [state, setState] = React.useState({
      trend: 0, trendRatio: 0, currentPrice: 0
    });

    const getIconComponent = (change: number) => {
      if(change > 0){
        return <TrendingUpIcon htmlColor={theme.colors.green} fontSize={"small"} className={classes.icon}/>;
      }else if(change < 0){
        return <TrendingDownIcon color={"secondary"} fontSize={"small"} className={classes.icon}/>;
      }else{
        return <div className={classes.icon}/>;
      }
    };

    const request = () => {
      if(type === 'currency'){
        return getJson({path: baseUrl.malygos() + '/addressAssetsInfo', data: {walletAccountAddressId: id, coinSymbol: currency,period: '24H', interval: 10}});
      }
      return getJson({path: baseUrl.malygos() + '/walletAssetsInfo', data: {walletId: id, period: '24H', interval: 10}});
    };

    const charts = () => {
      chartInterval && clearInterval(chartInterval);
      request().then((res: any) => {
        if(res.status === 0){
          let {changeRange, alphaRatio, balanceHistory} = res;
          balanceHistory.reduce(((_p: any, c:any, i: number, a: any) => a[i] = [moment.unix(c.time/1000).format('YYYY/MM/DD HH:mm:ss'), Number.parseFloat(c.balance.toFixed(accuracy))]), 0);
          chart = chartRef.current && lineCharts({
            id: chartRef.current!, data: balanceHistory, color, seriesColor, type: "areaspline",
            options: {
              xAxis: {
                visible: false,
              },
              yAxis: {
                visible: false,
                // min: threshold,
                // minRange: 1
              },
              chart: {
                zoomType: 'x',
                events: {
                  load: () => {
                    const refresh = () => {
                      request().then((_res: any) => {
                        if (_res.status === 0) {
                          changeRange = _res.changeRange;
                          alphaRatio = _res.alphaRatio;
                          balanceHistory = _res.balanceHistory;
                          balanceHistory.reduce(((_p: any, c:any, i: number, a: any) => a[i] = [moment.unix(c.time/1000).format('YYYY/MM/DD HH:mm:ss'), Number.parseFloat(c.balance.toFixed(accuracy))]), 0);
                          setState({
                            currentPrice: balanceHistory[balanceHistory.length - 1][1],
                            trend: Number.parseFloat(changeRange.toFixed(accuracy)),
                            trendRatio: Number.parseFloat((alphaRatio*100).toFixed(2))
                          });
                          chart.update({
                            series: [{
                              color: seriesColor,
                              type: 'areaspline',
                              name: localeLangData.series.name,
                              data: balanceHistory
                            }],
                          });
                        }
                      });
                    };
                    chartInterval = setInterval(() => {
                      refresh();
                    }, 300000);
                    listener = () => {
                      refresh();
                      clearInterval(chartInterval!);
                      chartInterval = setInterval(() => {
                        refresh();
                      }, 300000);
                    };
                    window.addEventListener(TRADE_CHANGE_EVENT, listener)
                  }
                }
              }
            }, seriesName: localeLangData.series.name
          });
          setState({
            currentPrice: balanceHistory[balanceHistory.length - 1][1],
            trend: Number.parseFloat(changeRange.toFixed(accuracy)),
            trendRatio: Number.parseFloat((alphaRatio*100).toFixed(2))
          });
        }else{
          // error
        }
      })
    };

    const resize = () => {
      const resizeTimeout = setTimeout(() => {
        clearTimeout(resizeTimeout);
        const dom: any = chartRef.current!;
        if(dom){
          const currentWidth = dom ? dom.offsetWidth : 0;
          if(currentWidth !== width){
            chart && chart.reflow();
            width = currentWidth;
          }
          resize();
        }
      }, 300)
    };

    React.useEffect(() => {
      setTimeout(() => {
        charts();
        const dom: any = chartRef.current!;
        width = dom ? dom.offsetWidth : 0;
        resize();
      }, timeout);
      return () => {
        chartInterval && clearInterval(chartInterval);
        listener && window.removeEventListener(TRADE_CHANGE_EVENT, listener);
      }
    }, []);

    const icon = getIconComponent(state.trend);
    return (
    <div className={classes.root}>
      <Typography className={classes.number}>{state.currentPrice.toFixed(accuracy)}{unit}</Typography>
      <Divider className={classes.divider}/>
      <div className={classes.trend}>
        <Typography variant={"inherit"} className={classes.trendData}>{Math.abs(state.trendRatio).toFixed(2)}%</Typography>
        {icon}
        <Typography variant={"inherit"} className={classes.trendData}>{Math.abs(state.trend).toFixed(accuracy)}</Typography>
        {icon}
      </div>
      <div className={classes.chartsArea}>
        <div ref={chartRef} className={classes.charts}/>
      </div>
    </div>
    )
  })()
}
