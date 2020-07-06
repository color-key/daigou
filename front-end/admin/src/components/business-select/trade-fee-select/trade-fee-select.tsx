import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {postJson, getJson} from '@fay-react/lib/fetch';
import Select from "@/components/select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {grey} from "@material-ui/core/colors";
import InputAdornment from '@material-ui/core/InputAdornment';
import NumberFormatTextField from '../../text-field/number-format-text-field';
import BigNumber from "bignumber.js";
import {getAccuracy} from "@/lib/currency/money-accuracy";
import {EthGas} from './index';
import clsx from 'clsx';
import {getErrorMessage} from "@/lib/fetch-error";
import {getLocale} from './locale';
import {getFeeUnit, additionalFee} from '@/lib/currency';
import {CustomPromise} from "@fay-react/lib/fetch/request";

const useStyles = makeStyles((theme) =>
  createStyles({
    hide: {
      display: 'none'
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: grey[600],
      fontSize: '0.75rem',
      marginTop: `-${theme.spacing(1)}px`,
      marginLeft: theme.spacing(1),
    },
    input: {
      width: '100%',
      // height: 76,
    },
    adornment: {
      fontSize: '0.875rem',
    },
  })
);

interface Props {
  coinType?: string,
  amount?: number,
  fromAddress?: string,
  toAddress?: string,
  disabled?: boolean,
  onChange?: (fee: string, ethGas: EthGas) => void,
}

const highModeCurrencies = ['ETH', 'USDT(ERC20)'];
let calculateFeePromise: CustomPromise;

export default ({ disabled, amount=0, fromAddress='', toAddress='',  coinType='', onChange}: Props) => {
  const classes = useStyles();
  const locale = getLocale();
  const [standardFee, setStandardFee] = React.useState({fee: '---', gasLimit: '', gwei: ''});
  const [gasFee, setGasFee] = React.useState('---');
  const [level, setLevel] = React.useState('0');
  const [ethGas, setEthGas] = React.useState({gasLimit: '', gwei: ''});
  const [erc20Gas, setErc20Gas] = React.useState({gasLimit: '', gwei: ''});
  const [gas, setGas] = React.useState({gasLimit: '', gwei: ''});
  const [highMode, setHighMode] = React.useState(false);
  const feeCoinType = getFeeUnit(coinType);

  let gasError = '';
  let gweiError = '';
  if(coinType === 'USDT(ERC20)' && Number(gas.gasLimit) < Number(erc20Gas.gasLimit)){
    gasError = locale.error.gas + erc20Gas.gasLimit;
  }else if(Number(gas.gasLimit) < Number(ethGas.gasLimit)){
    gasError = locale.error.gas + ethGas.gasLimit;
  }
  if(Number(gas.gwei) === 0){
    gweiError = locale.error.gwei;
  }

  const handleChangeLevel = (v: string) => {
    setLevel(v);
  };

  React.useEffect(() => {
    setStandardFee({fee: '---', gasLimit: '', gwei: ''});
    if(coinType.length>0 && !highMode && fromAddress.length > 0 && toAddress.length > 0 && amount > 0){
      // setFee('--');
      if(calculateFeePromise) calculateFeePromise.abort();
      calculateFeePromise = postJson({path: baseUrl.malygos() + '/calculateFee', data: {coinType, feeLevel: Number(level), amount, fromAddress, toAddress}});
      calculateFeePromise.then((res: any) => {

        if(res.status === 0){
          let gwei = '';
          let gasLimit = '';
          if(res.gasLimit && res.gasPrice){
            gwei = new BigNumber(res.gasPrice).div(1e9).toString();
            gasLimit = res.gasLimit;
          }
          setStandardFee({fee: res.fee, gwei, gasLimit});
        }else{
          getErrorMessage(res).then((_errorMsg) => {
            // error
          });
        }
      });
    }
  }, [level, coinType, highMode, fromAddress, amount, toAddress]);

  React.useEffect(() => {
    getJson({path: baseUrl.malygos() + '/no-auth/ethProposeGasInfo'}).then(res => {
      if(res.status === 0){
        const {gasLimit, gasPrice} = res;
        const gwei = new BigNumber(gasPrice).div(1e9).toFixed(0);
        setEthGas({gasLimit, gwei});
      }else{
        getErrorMessage(res).then((_errorMsg) => {
          // error
        });
      }
    });
    getJson({path: baseUrl.malygos() + '/no-auth/erc20UsdtEthProposeGasInfo'}).then(res => {
      if(res.status === 0){
        const {gasLimit, gasPrice} = res;
        const gwei = new BigNumber(gasPrice).div(1e9).toFixed(0);
        setErc20Gas({gasLimit, gwei});
      }else{
        getErrorMessage(res).then((_errorMsg) => {
          // error
        });
      }
    })
  }, []);

  React.useEffect(() => {
    setHighMode(false);
  }, [coinType]);

  React.useEffect(() => {
    if(coinType === 'USDT(ERC20)'){
      setGas({...erc20Gas});
    }else{
      setGas({...ethGas});
    }
  }, [coinType, JSON.stringify(ethGas), JSON.stringify(erc20Gas)]);

  React.useEffect(() => {
    if(highMode){
      let _fee = new BigNumber(gas.gwei).times(gas.gasLimit).div(1e9).toFixed(getAccuracy(coinType));
      _fee = Number.isNaN(Number(_fee)) ? '' : _fee;
      setGasFee(_fee);
      onChange && onChange((gasError.length>0 || gweiError.length > 0) ? '' : _fee, gas);
    }else{
      if(!Number.isNaN(Number(standardFee.fee))){
        onChange && onChange(standardFee.fee, {gasLimit: standardFee.gasLimit, gwei: standardFee.gwei});
      }else{
        onChange && onChange('', {gasLimit: '', gwei: ''});
      }
    }
  }, [standardFee.fee, coinType, JSON.stringify(gas), highMode]);

  const addFee = additionalFee[coinType];

  return (
    <div>
      <div className={classes.title}>
        <div>{locale.title}{highMode && gasFee}{addFee>0?`（${locale.additionalFee}：${addFee}）`:''}</div>
        {highModeCurrencies.includes(coinType) ? <Button size="small" color="primary" onClick={() => setHighMode(!highMode)}>{highMode ? locale.modes[0]:locale.modes[1]}</Button> : null}
        </div>
      <div className={clsx({[classes.hide]: highMode})}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Select value={level} onChange={handleChangeLevel} disabled={disabled}>
            {locale.levels.map((l: any) => <MenuItem key={l.id} value={l.id+''}>{l.name}</MenuItem>)}
          </Select>
        </Grid>
        <Grid item xs={9}>
          <NumberFormatTextField
            value={standardFee.fee}
            disabled
            className={classes.input}
            InputProps={{
              endAdornment: <InputAdornment disableTypography position="end" style={{width: 15*feeCoinType.length}} className={classes.adornment}>{feeCoinType}</InputAdornment>
            }}/>
        </Grid>
      </Grid>
      </div>
      <div className={clsx({[classes.hide]: !highMode})}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <NumberFormatTextField
            value={gas.gwei}
            disabled={disabled}
            error={gweiError.length>0}
            helperText={gweiError}
            onChange={(e: any) => setGas({...gas, gwei: e.target.value})}
            className={classes.input}
            InputProps={{
              endAdornment: <InputAdornment disableTypography position="end" style={{width: 15*4}} className={classes.adornment}>Gwei</InputAdornment>,
              inputProps: {decimalSeparator: false, maxLength: 6, allowNegative: false}
            }}/>
        </Grid>
        <Grid item xs={6}>
          <NumberFormatTextField
            value={gas.gasLimit}
            disabled={disabled}
            error={gasError.length>0}
            helperText={gasError}
            onChange={(e: any) => setGas({...gas, gasLimit: e.target.value})}
            className={classes.input}
            InputProps={{
              endAdornment: <InputAdornment disableTypography position="end" style={{width: 15*3}} className={classes.adornment}>Gas</InputAdornment>,
              inputProps: {decimalSeparator: false, maxLength: 7, allowNegative: false}
            }}/>
        </Grid>
      </Grid>
      </div>
    </div>

  );
}