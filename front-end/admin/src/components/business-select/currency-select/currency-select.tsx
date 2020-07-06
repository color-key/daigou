import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {getJson} from '@fay-react/lib/fetch';
import Select from "@/components/select";
import MenuItem from "@material-ui/core/MenuItem";
import {WalletToken, Token} from './index';
import CurrencyTextIcon from '../../currency/text-icon';
import clsx from 'clsx';
import {getErrorMessage} from "@/lib/fetch-error";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      '& .MuiSelect-root':{
        padding: '12px 14px'
      }
    },
    text: {
      width: 'calc(100% - 20px)'
    }
  })
);

interface Props {
  walletId: number,
  className?: string,
  label?: string,
  disabled?: boolean,
  value?: string,
  onChange?: (name: string, token: WalletToken) => void,
}

export default ({ className, walletId, label, value, onChange, disabled }: Props) => {
  const classes = useStyles();
  const [tokensMap, setTokensMap] = React.useState(new Map<string, number>());
  const [walletTokens, setWalletTokens] = React.useState<WalletToken[]>([]);
  // const [selectedValue, setSelectedValue] = React.useState(defaultValue||'');

  // React.useEffect(() => {
  //   // if(state.walletTokens.length>0){
  //     // const token: WalletToken = state.walletTokens.filter((c: WalletToken) => c.name === value)[0];
  //     // setState({...state, selectedValue: value || ''});
  //     // onChange && onChange(token.name, token);
  //   // }
  // }, [value]);

  React.useEffect(() => {
    getJson({path: baseUrl.malygos() + '/tokenList'}).then(res => {
      if(res.status === 0){
        const map = new Map();
        res.tokens.map((token: Token) => {
          map.set(token.name, token.coinType);
        });
        setTokensMap(map);
      }else{
        getErrorMessage(res).then((_errorMsg) => {
          // error
        });
      }
    });
  }, []);

  React.useEffect(() => {
    setWalletTokens([]);
    if(tokensMap.size > 0){
      getJson({path: baseUrl.malygos() + '/walletTokenList?walletId='+walletId}).then(res => {
        if(res.status === 0){
          const tokenList = res.tokenList;
          let hasCurrentValue = false;
          const tokens = tokenList.map((token: any) => {
            token.coinType = tokensMap.get(token.name);
            if(token.name === value){
              hasCurrentValue = true;
            }
            return token;
          });
          const currentValue = hasCurrentValue ? value : tokens[0].name;
          // setState({walletTokens: tokens, selectedValue: _value});
          setWalletTokens(tokens);
          onChange && onChange(currentValue, tokens.filter((c: WalletToken) => c.name === currentValue)[0]);
        }else{
          getErrorMessage(res).then((_errorMsg) => {
            // error
          });
        }
      });
    }
  }, [walletId, tokensMap.size]);

  const handleChangeCurrency = (v: string) => {
    // if(!value){
    //   setState({...state, selectedValue: v});
    // }
    onChange && onChange(v, walletTokens.filter((c: WalletToken) => c.name === v)[0]);
  };

  const _value = walletTokens.filter((c: WalletToken) => c.name === value).length === 0 ? '' : value;
  return (
    <Select className={clsx(classes.root, className)} disabled={disabled} label={label} value={_value} onChange={handleChangeCurrency} renderValue={(v) => <CurrencyTextIcon className={classes.text} type={v+''}/>}>
      {
        walletTokens.map((c: WalletToken) => <MenuItem key={c.name} value={c.name}><CurrencyTextIcon type={c.name}/></MenuItem>)
      }
    </Select>
  );
}