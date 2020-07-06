import React, {useContext} from 'react';
import {getJson} from '@fay-react/lib/fetch';
import CircularProgress from "@material-ui/core/CircularProgress";
import {getLanguage, saveLanguage} from '@/lib/user';
import {LANGUAGE_CHANGE_EVENT} from '@/lib/event/language';
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {getAssetsPublicPath} from "@/lib/router";

export const LocaleContext = React.createContext({});

type UseLocale = <T>() => T;

export let useLocale: UseLocale = () => useContext(LocaleContext);

const useStyles = makeStyles(() =>
  createStyles({
    empty: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);

export default ({path, value, children}: any) => {
  const classes = useStyles();
  const language = getLanguage();
  const [locale, setLocale] = React.useState(value);

  const getLocale = (l: string) => {
    getJson({path: getAssetsPublicPath() + '/data/locale'+path+'/'+l+'.json'}).then(res => {
      setLocale(res);
    })
  };
  React.useEffect(() => {
    const listener = (e: any) => {
      getLocale(e.newValue);
    };
    if(!value){
      window.addEventListener(LANGUAGE_CHANGE_EVENT,  listener);
      if(language === null){
        saveLanguage('zh_CN');
      }else{
        getLocale(language);
      }
    }
    return () => {
      setLocale(null);
      window.removeEventListener(LANGUAGE_CHANGE_EVENT, listener);
    }
  }, []);

  return (
    locale ?
    <LocaleContext.Provider value={locale!}>
      {children}
    </LocaleContext.Provider>
    :
    <div className={classes.empty}>
      <CircularProgress/>
    </div>
  )
}