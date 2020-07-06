import React from 'react';
import {getJson} from '@fay-react/lib/fetch';
import Select from "@/components/select";
import MenuItem from "@material-ui/core/MenuItem";
import {getLocale} from "./locale";
import {useLocale} from '@/components/locale'
import {getLanguage} from "@/lib/user";
import {getAssetsPublicPath} from "@/lib/router";

interface TimeZone {
  originalText: string,
  showText: string,
}

interface Props {
  label?: string,
  value?: string,
  error?: string,
  onChange?: (name: string) => void,
}

export default ({ label, value, onChange, error }: Props) => {
  useLocale();
  const language = getLanguage();
  const localeLangData = getLocale().lang;
  const [timeZones, setTimeZones] = React.useState<TimeZone[]>([]);

  React.useEffect(() => {
    getJson({path: getAssetsPublicPath() + '/data/locale/components/select/time-zone-select/'+language+'.json'}).then(res => {
      setTimeZones(res);
    });
  }, []);

  return (
    <Select label={label || localeLangData.label} value={timeZones.length>0 ? value : ''} onChange={onChange} error={error}>
      {
        timeZones.map((c: TimeZone) => <MenuItem key={c.showText} value={c.originalText}>{c.showText}</MenuItem>)
      }
    </Select>
  );
}