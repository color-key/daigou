import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import {Theme} from '@/components/theme';
import {getLocale} from "./locale";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    auditTitle: {
      marginTop: theme.spacing(1.25),
    },
    title: {
      color: theme.palette.grey[500],
      fontSize: '0.75rem',
    },
    gridContent: {
      marginTop: theme.spacing(2),
    },
    audit: {
      width: '100%'
    },
    flexCenter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    auditPiece: {
      height: 40,
      justifyContent: 'space-between'
    },
    auditHead: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative'
    },
    auditHeadBgName: {
      width: 30,
      height: 30,
      backgroundColor: theme.palette.primary.main,
      borderRadius: 15,
    },
    auditStatu: {
      width: 12,
      height: 12,
      top: 22,
      left: 22,
      position: 'absolute',
      borderRadius: 6,
      border: '1px solid white'
    },
    statuRefuse: {
      backgroundColor: theme.palette.secondary.main,
    },
    statuWait: {
      backgroundColor: theme.colors.orange,
    },
    statuAgree: {
      backgroundColor: theme.colors.green,
    },
    statuIcon: {
      width: 10,
      height: 10,
      color: "#ffffff"
    },
    auditName: {
      marginLeft: theme.spacing(1.5),
      height: 40,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    divider: {
      height: 30,
      marginLeft: theme.spacing(1.87)
    },
    auditor: {
      color: theme.palette.grey[900],
      fontSize: '0.87rem',
    },
    auditorDes: {
      color: theme.palette.grey[600],
      fontSize: '0.75rem',
    },
    auditorWord: {
      color: 'white',
      fontSize: '0.87rem',
      fontWeight: "bold"
    },
  })
);

export interface AuditorProps {
  agree?: number;
  auditTime?: string;
  initiatorTime?: string;
  avatar?: string;
  email?: string;
  id?: string;
  name?: string;
}

interface Props {
  list?: AuditorProps[],
  initiator: AuditorProps | undefined,
  leastAuditor: number
  label: string
}

export default ({list=[], initiator, leastAuditor, label}: Props) => {
  const classes = useStyles();
  const localeLangData = getLocale().lang;
  if (initiator) initiator.agree = undefined;
  const statusDes = (statu: number | undefined) => {
    if (statu === -1) {
      return localeLangData.status[0];
    } else if (statu === 0) {
      return localeLangData.status[1];
    } else if (statu === 1) {
      return localeLangData.status[2];
    } else if (statu === undefined) {
      return label;
    }
    return '----';
  };
  
  const statusIcon = (statu: number | undefined) => {
    if (statu === -1) {
      return <MoreHorizIcon className={classes.statuIcon} />
    } else if (statu === 0) {
      return <CloseIcon className={classes.statuIcon} />
    } else if (statu === 1) {
      return <DoneIcon className={classes.statuIcon} />
    } else {
      return null;
    }
  };

  const statusBg = (statu: number | undefined) => {
    if (statu === -1) {
      return classes.statuWait;
    } else if (statu === 0) {
      return classes.statuRefuse;
    } else if (statu === 1) {
      return classes.statuAgree;
    } else {
      return null;
    }
  };

  const itemAudit = (value: AuditorProps) => {
    return (
      <Grid key={value.id} container>
        <div className={classes.audit}>
          {value.agree !== undefined ? (
            <div className={classes.divider}>
              <Divider orientation="vertical"/>
            </div>
          ) : null}
          <div className={clsx(classes.flexCenter, classes.auditPiece)}>
            <div className={classes.auditHead}>
              <div className={clsx(classes.auditHeadBgName, classes.flexCenter)}>
                <div className={classes.auditorWord}>{value.name ? value.name.charAt(0) : '-'}</div>
                {value.agree !== undefined ? (
                <div className={clsx(classes.auditStatu, classes.flexCenter, statusBg(value.agree))}>
                  {value.agree !== undefined ? statusIcon(value.agree) : null}
                </div>
                ) : null}
              </div>
              <div className={classes.auditName}>
              <div className={classes.auditor}>{value.name}</div>
              <div className={classes.auditorDes}>{(value.auditTime || value.initiatorTime) ?  moment((value.auditTime || value.initiatorTime)).format('YYYY/MM/DD HH:mm:ss') : '********** ********'}</div>
              </div>
            </div>
            <div className={classes.auditorDes}>{statusDes(value.agree)}</div>
          </div>
        </div>
      </Grid>
    );
  };

  return (
    <div className={classes.auditTitle}>
      <div className={classes.title}>{localeLangData.title[0]}{leastAuditor}{localeLangData.title[1]}</div>
      <Grid item xs={12} className={classes.gridContent}>
        {itemAudit(initiator!)}
        {list.map(itemAudit)}
      </Grid>
    </div>
  );
}