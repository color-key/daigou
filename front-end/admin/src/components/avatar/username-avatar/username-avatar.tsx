import React from 'react';
import Avatar, {AvatarProps} from '@material-ui/core/Avatar';
import {getUserAvatarText} from '@/lib/user/avatar-text';
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";

interface Props extends AvatarProps{
  username: string
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      '& .MuiSvgIcon-root': {
        fontSize: '1.25rem'
      }
    }
  })
);

export default ({username, className, ...props}: Props) => {
  const classes = useStyles();
  const text = getUserAvatarText(username);
  return (
    <Avatar className={clsx(classes.root, className)} {...props}>{text || <PersonOutlineIcon />}</Avatar>
  )
}