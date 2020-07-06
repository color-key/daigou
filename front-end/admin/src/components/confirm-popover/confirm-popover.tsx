import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Popover, { PopoverProps, PopoverOrigin } from '@material-ui/core/Popover';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import {getLocale} from "./locale";

const useStyles = makeStyles(() =>
  createStyles({
    popoverPaper: {
        boxShadow:'0px 2px 4px -1px rgba(33,33,33,0.16),0px 1px 10px 0px rgba(33,33,33,0.08),0px 4px 5px 0px rgba(33,33,33,0.1)',
        borderRadius:4,
        padding: 12,
        marginTop: 4,
        height: 40,
    },
    mainContent: {
        display: 'flex',
        alignItems:'center',
        height: '100%'
    },
    dividerRoot: {
        margin: '0 12px',
    },
  }),
);

interface DeleteProps extends PopoverProps {
    confirm: () => void,
    cancel: () => void,
}

export default (props: DeleteProps) => {
    const classes = useStyles();
    const localeLangData = getLocale().lang;
    const { open, anchorEl, anchorOrigin={
        vertical: 'top',
        horizontal: 'right',
    }, transformOrigin={
        vertical: 'top',
        horizontal: 'right',
    }, confirm, cancel, ...other } = props;
    return(
      <Popover
        open={open}
        classes={{paper: classes.popoverPaper}}
        anchorEl={anchorEl}
        onClose={cancel}
        anchorOrigin={anchorOrigin as PopoverOrigin}
        transformOrigin={transformOrigin as PopoverOrigin}
        {...other}
      >
        <div className={classes.mainContent}>
          <Button onClick={cancel}>{localeLangData.cancel}</Button>
          <Divider orientation="vertical" classes={{
            root: classes.dividerRoot
          }} />
          <Button color="secondary" onClick={confirm}>{localeLangData.del}</Button>
        </div>
      </Popover>
    )
}