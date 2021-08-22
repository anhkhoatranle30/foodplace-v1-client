import React from "react";
import { Grid, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default function PlaceInfo(props) {
  const useStyles = makeStyles({
    root: {
      color: `${props.infoColor || "black"}`,
      padding: "5px 0px",
    },
    content: {
      paddingLeft: "2px",
    },
  });
  const classes = useStyles();

  const Icon = props.innerIcon;
  const content = props.innerContent;

  return (
    <Grid
      className={classes.root}
      item
      container
      alignItems="center"
      justifyContent="flex-start"
      xs={12}
    >
      <Grid item xs={2}>
        <Icon />
      </Grid>
      <Grid item xs={9}>
        <Typography component="div">
          <Box className={classes.content} fontWeight={700}>
            {content}
          </Box>
        </Typography>
      </Grid>
    </Grid>
  );
}
