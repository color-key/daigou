import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import LanguageIcon from '@material-ui/icons/Language';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {createStyles, makeStyles} from "@material-ui/core";
import {saveLanguage, getLanguage} from '@/lib/user';
import {getJson} from "@fay-react/lib/fetch";
import {getAssetsPublicPath} from "@/lib/router";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '-webkit-app-region': 'no-drag',
    },
    button: {
      color: theme.palette.grey[600]
    },
    languageIcon: {
      marginRight: theme.spacing(1)
    },
  })
);

interface LanguageType {
  value: string,
  name: string
}

const defaultLanguage = getLanguage();
export default () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [language, setLanguage] = React.useState<LanguageType|null>(null);
  const [languages, setLanguages] = React.useState<LanguageType[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (l: LanguageType) => {
    handleClose();
    setLanguage(l);
    saveLanguage(l.value);
  };

  React.useEffect(() => {
    getJson({path: getAssetsPublicPath() + '/data/language.json'}).then((res: LanguageType[]) => {
      setLanguages(res);
      setLanguage(res.filter(v => v.value === defaultLanguage)[0]);
    });
  }, []);

  return (
    <div className={classes.root}>
      {
        language &&
        <Button onClick={handleClick} className={classes.button}>
          <LanguageIcon fontSize={"small"} className={classes.languageIcon}/>{language.name}<ExpandMoreIcon fontSize={"small"}/>
        </Button>
      }
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {
          languages.map((l: LanguageType) => {
            return <MenuItem key={l.value} onClick={() => handleLanguageChange(l)}>{l.name}</MenuItem>;
          })
        }
      </Menu>
    </div>
  );
}