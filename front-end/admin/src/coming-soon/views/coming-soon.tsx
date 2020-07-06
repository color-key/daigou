import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NavigationIcon from '@material-ui/icons/Navigation';
import * as React from 'react';
import {useHistory} from 'react-router-dom';
import {getAssetsPublicPath} from "@/lib/router";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			padding: theme.spacing(3),
			overflowX: 'auto',
			textAlign: 'center'
		},
		logo: {
			margin: 10,
			width: 150,
			height: 150,
			display: 'inline-block'
		},
		margin: {
			margin: theme.spacing(1),
		},
		extendedIcon: {
			marginRight: theme.spacing(1),
		},
	}),
);

export default () => {
	const classes = useStyles();

	const history = useHistory();

	return (
		<div className={classes.root}>
			<Avatar alt='logo' src={getAssetsPublicPath() + '/images/coding.gif'} className={classes.logo} />
			<Typography variant='h6' color='primary'>敬请期待...</Typography>
			<Fab
				variant='extended'
				size='medium'
				color='primary'
				aria-label='add'
				role='fab'
				className={classes.margin}
				onClick={() => history.go(-1)}
			>
				<NavigationIcon className={classes.extendedIcon} />
				返回上一层
			</Fab>
		</div>
	)
}
