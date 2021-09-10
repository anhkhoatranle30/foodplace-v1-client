import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Img from '../../static/images/email-verification-notification.svg';

const useStyles = makeStyles({
	root: {
		marginTop: '10px',
		minHeight: '100vh',
	},
	img: {
		width: '300px',
		height: 'auto',
	},
});

export default function EmailVerificationNotification() {
	const classes = useStyles();

	return (
		<Container>
			<Grid className={classes.root} container direction="column" alignItems="center" justifyContent="center">
				<Typography variant="h3">Email verification</Typography>
				<Typography variant="body1">
          You are way to go.
          There is only one more step before you can use our app.
          Please check your email for verification.
				</Typography>
				<img className={classes.img} src={Img} alt="email-verification-notification" />
			</Grid>
		</Container>
	);
}
