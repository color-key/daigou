import React from 'react';
import UsernameAvatar from "@/components/avatar/username-avatar";
import Chip, {ChipProps} from "@material-ui/core/Chip";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import clsx from 'clsx';

interface Props extends ChipProps{
  username: string
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& .MuiChip-avatar': {
        width: '28px',
        height: '28px',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        marginLeft: 0,
        fontSize: '0.875rem'
      },
      '& .MuiChip-deleteIcon': {
        width: 16,
        height: 16
      },
    }
  })
);

export default ({username, className, disabled, ...props}: Props) => {
  const classes = useStyles();

  return (
    <Chip disabled={disabled} className={clsx(classes.root, className)} label={username} avatar={<UsernameAvatar sizes={'28px'} username={username}/>} {...props} />
  )
}