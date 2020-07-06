import React from 'react';
import {getJson} from '@fay-react/lib/fetch';
import Select from "@/components/select";
import MenuItem from "@material-ui/core/MenuItem";
import CurrencyTextIcon from './currency';
import {getLocale} from "./locale";

interface Currency {
  name: string,
}

interface Props {
  label?: string,
  value?: string,
  error?: string,
  disabled?: boolean,
  onChange?: (name: string) => void,
}

export default ({ label, disabled, value, onChange, error }: Props) => {
  const localeLangData = getLocale().lang;
  const [currencies, setCurrencies] = React.useState<Currency[]>([]);

  React.useEffect(() => {
    getJson({path: baseUrl.malygos() + '/currencyList'}).then(res => {
      if(res.status === 0){
        setCurrencies(res.tokens);
      }
    });
  }, []);

  return (
    <Select label={label || localeLangData.label} disabled={disabled} value={currencies.length>0 ? value : ''} onChange={onChange} renderValue={(v) => <CurrencyTextIcon type={v+''}/>} error={error}>
      {
        currencies.map((c: Currency) => <MenuItem key={c.name} value={c.name}><CurrencyTextIcon type={c.name}/></MenuItem>)
      }
    </Select>
  );
}