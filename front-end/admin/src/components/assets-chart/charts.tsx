import React from 'react';
import lineCharts from '@/components/highcharts/line-charts';
import {getJson} from '@fay-react/lib/fetch';
import {makeStyles, createStyles} from "@material-ui/core/styles";
import {useTheme} from "@/components/theme";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import clsx from 'clsx';
import {getUser} from '@/lib/user';
import {getDefaultCurrencyAccuracy} from "@/lib/currency/money-accuracy";
import {getLocale} from "./locale";

declare global {
  interface Window {
    walletList: {
      cycle: number,
      change: boolean
    }
  }
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      // width: '100%',
      height: '100%',
      padding: theme.spacing(4, 3, 0, 3)
    },
    title: {
      display: 'flex',
      justifyContent: 'space-between',
      height: 39,
      marginBottom: theme.spacing(5),
      fontWeight: 'bold'
    },
    titleLeft: {
      display: 'flex',
    },
    titleRight: {
      display: 'flex',
      alignSelf: 'center'
    },
    number: {
      fontSize: '32px',
      alignSelf: 'center'
    },
    unit: {
      color: theme.palette.grey[500],
      alignSelf: 'flex-end',
      marginLeft: theme.spacing(1.5)
    },
    icon: {
      alignSelf: 'center'
    },
    trend: {
      fontSize: '20px',
      margin: theme.spacing(0, 2, 0, 1)
    },
    charts: {
      width: '100%',
      height: 'calc(100% - 137px)',
    },
    circle: {
      marginBottom: theme.spacing(2),
      justifyContent: 'flex-end',
      display: 'flex'
    },
    cycleButton: {
      minWidth: 40,
      height: 28,
      padding: '3px 5px',
      fontSize: '0.8125rem',
      margin: theme.spacing(0, 0.5),
    },
    cycleButtonActive: {
      backgroundColor: theme.palette.primary.light
    },
  })
);

// let chart: any;
// let width: string | number;
// let chartInterval: NodeJS.Timeout|null = null;
const cycleData = ['24H', '7D', '1M', '3M'];
const interval = [10, 60, 240, 720];

interface Props {
  id?: string
  onCallback?: Function
}

export default ({id, onCallback}: Props) => {

  let chart: any;
  let width: string | number;
  let chartInterval: NodeJS.Timeout|null = null;

  return (() => {
    const classes = useStyles();
    const theme = useTheme();
    const localeLangData = getLocale().lang;
    const user = getUser();
    const defaultCurrency = user.organization.defaultCurrency;
    const accuracy = getDefaultCurrencyAccuracy(defaultCurrency);
    const [cycle, setCycle] = React.useState(0);
    const [state, setState] = React.useState({trend: 0, trendRatio: 0, currentPrice: 0});
    const chartRef = React.useRef(null);

    const getIconComponent = (changeRange: number) => {
      if(changeRange > 0){
        return <TrendingUpIcon htmlColor={theme.colors.green} fontSize={"small"} className={classes.icon}/>;
      }else if(changeRange < 0){
        return <TrendingDownIcon color={"secondary"} fontSize={"small"} className={classes.icon}/>;
      }else{
        return <></>;
      }
    };

    const request = () => {
      if(id){
        return getJson({path: baseUrl.malygos() + '/walletAssetsInfo', data: {walletId: id, period: cycleData[window.walletList.cycle], interval: interval[window.walletList.cycle]}});
      }else{
        return getJson({path: baseUrl.malygos() + '/organizationAssetsInfo', data: {period: cycleData[window.walletList.cycle], interval: interval[window.walletList.cycle]}});
      }
    };

    const charts = () => {
      chartInterval && clearInterval(chartInterval);
      request().then((res: any) => {
        if(res.status === 0){
          let {changeRange, alphaRatio, balanceHistory} = res;
          balanceHistory.reduce(((_p: any, c:any, i: number, a: any) => a[i] = [c.time, Number.parseFloat(c.balance.toFixed(accuracy))]), 0);
          const sortBalanceHistory = [...balanceHistory];
          sortBalanceHistory.sort((s1:any, s2: any) => s1[1] < s2[1] ? -1 : 1);
          const min = sortBalanceHistory[0][1];
          const max = sortBalanceHistory[sortBalanceHistory.length-1][1];
          chart = chartRef.current && lineCharts({
            id: chartRef.current!, min, max, data: balanceHistory, color: theme.charts.color, seriesColor: theme.charts.series.color,
            options: {
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
                          balanceHistory.reduce(((_p: any, c:any, i: number, a: any) => a[i] = [c.time, Number.parseFloat(c.balance.toFixed(accuracy))]), 0);
                          const sortBalanceHistory = [...balanceHistory];
                          sortBalanceHistory.sort((s1:any, s2: any) => s1[1] < s2[1] ? -1 : 1);
                          const min = sortBalanceHistory[0][1];
                          const max = sortBalanceHistory[sortBalanceHistory.length-1][1];
                          setState({
                            currentPrice: balanceHistory[balanceHistory.length - 1][1],
                            trend: Number.parseFloat(changeRange.toFixed(accuracy)),
                            trendRatio: Number.parseFloat((alphaRatio*100).toFixed(2))
                          });
                          chart.update({
                            series: [{
                              color: theme.charts.series.color,
                              type: 'area',
                              name: localeLangData.series.name,
                              data: balanceHistory,
                            }],
                            yAxis: {
                              title: {
                                text: ''
                              },
                              min,
                              max,
                              minRange: 1
                            },
                          });
                          onCallback && onCallback();
                        }
                      });
                    };
                    let n = 0;
                    chartInterval = setInterval(() => {
                      n++;
                      if(window.walletList.change){
                        refresh();
                        window.walletList.change = false;
                        n = 0;
                      }else if(n === 50){
                        refresh();
                        n = 0;
                      }

                    }, 100);
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
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
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
      window.walletList = {cycle, change: true};
    }, [cycle]);

    React.useEffect(() => {
      window.walletList = {cycle, change: true};
      // chart && chart.destroy();
      // charts();
    }, [id]);

    React.useEffect(() => {
      window.walletList = {cycle: 0, change: true};
      charts();
      const dom: any = chartRef.current!;
      width = dom ? dom.offsetWidth : 0;
      resize();
      return () => {
        window.walletList = {cycle: 0, change: true};
        chartInterval && clearInterval(chartInterval);
      }
    }, []);

    const icon = getIconComponent(state.trend);
    return (
    <Paper className={classes.root} >
      <div className={classes.title}>
        <div className={classes.titleLeft}>
          <Typography className={classes.number} variant="inherit">
            {state.currentPrice.toFixed(accuracy)}
          </Typography>
          <Typography className={classes.unit} variant={"inherit"}>({defaultCurrency})</Typography>
        </div>
        <div className={classes.titleRight}>
          {icon}
          <Typography className={classes.trend} variant={"inherit"}>{Math.abs(state.trendRatio)}%</Typography>
          {icon}
          <Typography className={classes.trend} variant={"inherit"}>{Math.abs(state.trend).toFixed(accuracy)}</Typography>
        </div>
      </div>
      <div className={classes.circle}>
        {
          cycleData.map((item: string, i: number) => {
            return (
            <Button key={i} variant="outlined" color={cycle===i ? 'primary' : 'default'} className={clsx(classes.cycleButton, {[classes.cycleButtonActive]: cycle===i})} onClick={() => setCycle(i)}>
              {item}
            </Button>
            )
          })
        }
      </div>
      <div ref={chartRef} className={classes.charts}/>
    </Paper>
    )
  })()
}