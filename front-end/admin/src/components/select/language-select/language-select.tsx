import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {getJson} from '@fay-react/lib/fetch';
import Select from "@/components/select";
import MenuItem from "@material-ui/core/MenuItem";
import LanguageIcon from '@material-ui/icons/Language';
import {getAssetsPublicPath} from "@/lib/router";

const useStyles = makeStyles((theme) =>
  createStyles({
    text: {
      display: 'flex',
      alignItems: 'center'
    },
    icon: {
      marginRight: theme.spacing(1)
    }
  })
);

interface Language {
  name: string,
  value: string,
}

interface Props {
  label?: string,
  value?: string|null,
  onChange?: (name: string) => void,
}

export default ({ label='选择语言', value, onChange }: Props) => {
  const classes = useStyles();
  const [languages, setLanguages] = React.useState<Language[]>([]);

  React.useEffect(() => {
    getJson({path: getAssetsPublicPath() + '/data/language.json'}).then(res => {
      setLanguages(res);
    });
  }, []);

  const renderValue = (v: any) => {
    const selected = languages.filter(l => l.value === v)[0];
    return <div className={classes.text}><LanguageIcon className={classes.icon}/>{selected ? selected.name : ''}</div>;
  };

  return (
    <Select label={label} value={languages.length>0 ? value : ''} onChange={onChange} renderValue={renderValue}>
      {
        languages.map((l: Language) => <MenuItem key={l.name} value={l.value}>{l.name}</MenuItem>)
      }
    </Select>
  );
}