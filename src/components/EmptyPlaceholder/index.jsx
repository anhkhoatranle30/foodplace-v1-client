import React from "react";
import { Container, Typography, Box, Grid } from "@material-ui/core";
import EmptyImg from "../../static/images/empty-placeholder.svg";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  img: {
    width: "100%",
    height: "auto",
  },
});

export default function EmptyPlaceholder(props) {
  const classes = useStyles();
  const { title, body } = props;
  return (
    <Container>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <Typography component="div">
            <Box fontSize="h5.fontSize" fontWeight={700}>
              {title}
            </Box>
          </Typography>
        </Grid>
        <Grid item>
          <Typography component="div">
            <Box
              textAlign="center"
              fontSize="h6.fontSize"
              color="text.secondary"
            >
              {body}
            </Box>
          </Typography>
        </Grid>
        <Grid item>
          <img className={classes.img} src={EmptyImg} alt="empty" />
        </Grid>
      </Grid>
    </Container>
  );
}
