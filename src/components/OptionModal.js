import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import {
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
  InputBase,
  makeStyles,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const OptionModal = ({ datos, option, menu, updateOption, updateDatos }) => {
  const classes = useStyle();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [valueOpcion, setValueOpcion] = React.useState(option.opcion);

  //para el radio
  const handleChange = (event) => {
    setValue(event.target.value);

    updateDatos();
  };

  const handleClickOpen = () => {
    updateDatos();
    setOpen(true);
  };

  const handleClose = () => {
    console.log("estoy atras del updateDatos();");
    updateOption(valueOpcion, value, menu.menuId, option.opcionId);
    console.log("pase por arriba del updateDatos();");
    updateDatos();

    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <MoreHorizIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className={classes.title}>
          Opcion: {option.opcionId}.
          <InputBase
            value={valueOpcion}
            onChange={(e) => {
              setValueOpcion(e.target.value);
            }}
            autoFocus
            fullWidth

            multiline
            className={classes.input}

          />
        </DialogTitle>
        <DialogContent>
          <Typography className={classes.contenido}>
            Al seleccionar la opcion {option.opcionId}. ¿A
            cual de las siguientes consigna se debe redirigir?
          </Typography>
          <Typography>
            Consignas disponibles:
          </Typography>
          {datos.menu.map((menucito) => {
            if (menucito.menuId !== menu.menuId) {
              return (

                  <RadioGroup value={value} onChange={handleChange} >
                    <FormControlLabel
                      className={classes.radio}
                      value={menucito.menuId}
                      control={<Radio />}
                      label={menucito.consigna}
                    />
                  </RadioGroup>

              );
            }
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
//Importaremos un Hook
const useStyle = makeStyles((theme) => ({
  input: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    margin: theme.spacing(1),
    padding: theme.spacing(0, 1, 1, 2),
    width: "440px",
    flexGrow: 1,
  },
  title: {
    fontSize: "1.2rem",
    display: "flex",
  }
}));
export default OptionModal;
