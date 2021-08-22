import { Box, Button, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ArrowBack } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import maintenanceImg from "../../static/images/maintenance.svg";
import maintenanceImg1 from "../../static/images/maintenance1.svg";
import maintenanceImg2 from "../../static/images/maintenance2.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
    minHeight: "80vh",
  },
  img: {
    width: "370px",
    height: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  btn: {
    textTransform: "uppercase",
  },
  btnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px 0px",
  },
}));

export default function MaintenancePage() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Container>
        <Typography component="div">
          <Box fontWeight={700} textAlign="center" fontSize="h4.fontSize">
            Sorry :( We are now maintaining this page. Please visit us at
            another time. Thank you!
          </Box>
        </Typography>
      </Container>
      <Container className={classes.btnContainer}>
        <Button
          component={Link}
          to="/"
          color="primary"
          variant="outlined"
          className={classes.btn}
        >
          <ArrowBack />
          &nbsp; Go back to homepage
        </Button>
      </Container>
      <Container>
        <img className={classes.img} src={maintenanceImg} alt="maintainance" />
        <img
          className={classes.img}
          src={maintenanceImg1}
          alt="maintainance1"
        />
        <img
          className={classes.img}
          src={maintenanceImg2}
          alt="maintainance2"
        />
      </Container>
    </Container>
  );
}
