import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import topLeftImg from "../../static/images/homepage-top-left.png";
import blob from "../../static/images/homepage-top-left-blob.svg";
import RandomModal from "./randomModal";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    paddingTop: "20px",
  },
  subtitle: {
    paddingBottom: "10px",
    textAlign: "center",
  },
  topRightImg: {
    height: "auto",
    width: "100%",
    backgroundImage: `url(${blob})`,
  },
});

export default function TopSection() {
  const classes = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <Grid container alignItems="center" className={classes.root} spacing={2}>
      <Grid item xs={12} md={6}>
        <img className={classes.topRightImg} src={topLeftImg} alt="top-right" />
      </Grid>
      <Grid
        item
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        xs={12}
        md={6}
      >
        <Typography variant="h3">Want to find a place?</Typography>
        <Typography
          className={classes.subtitle}
          variant="h4"
          color="textSecondary"
        >
          You can find a random place by your category or your collection
        </Typography>
        <Grid container spacing={3}>
          <Grid
            item
            container
            xs={6}
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button
              onClick={handleOpenModal}
              size="large"
              variant="contained"
              color="primary"
            >
              Random
            </Button>

            <RandomModal onClose={handleCloseModal} isOpen={isModalOpen} />
          </Grid>
          <Grid
            item
            container
            xs={6}
            justifyContent="flex-start"
            alignItems="center"
          >
            <Button
              component={Link}
              to="/places"
              size="large"
              variant="outlined"
              color="primary"
            >
              Places
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
