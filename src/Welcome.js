import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import background_image from "./images/image.png";

import { withRouter } from "react-router";

import { Link } from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${background_image})`,
    backgroundSize: "",
    backgroundPosition: "",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(10),
  },
  submit: {
    margin: theme.spacing(15, 0, 2),
  },
}));

const Welcome = (props) => {
  const classes = useStyles();
  const [empresa, setEmpresa] = useState("");
  const { history } = props;

  const handleAddEmpresa = () => {
    setEmpresa(empresa);
    history.push("/app", { empresa });
    return;
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Ingrese el nombre de su empresa
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="standard"
              fullWidth
              id="empresa"
              label="Nombre de su empresa"
              name="empresa"
              autoFocus
              onChange={(e) => setEmpresa(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="default"
              className={classes.submit}
              onClick={handleAddEmpresa}
            >
              Crear consignas
            </Button>
            <Grid container></Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
export default withRouter(Welcome);
