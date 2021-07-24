import { Collapse, makeStyles, Paper, Typography } from "@material-ui/core";
import { alpha } from "@material-ui/core/styles";

import { useState } from "react";
import AddOptionsOrMenuText from "./AddOptionsOrMenuText";

const AddOptionsOrMenu = ({ type, menuId }) => {
  const classes = useStyle(); //Iniciamos el hook
  const [open, setOpen] = useState(true);

  return (
    <div className={type === "option" ? classes.root : classes.rootConsigna}>
      <Paper>
        <Collapse in={open}>
          <AddOptionsOrMenuText type={type} menuId={menuId} setOpen={setOpen} />
        </Collapse>
        <Collapse in={!open}>
          <Paper
            className={classes.addOptionsListText}
            onClick={() => setOpen(true)}
          >
            <Typography>
              {type === "option"
                ? "+ Agregar opciones"
                : "+ Agregar otra consigna"}
            </Typography>
          </Paper>
        </Collapse>
      </Paper>
    </div>
  );
};

//Importaremos un Hook
const useStyle = makeStyles((theme) => ({
  root: {
    //Creamos un objeto para diseniar con el hook
    width: "1000px",
  },
  rootConsigna: {
    //Creamos un objeto para diseniar con el hook
    width: "750px",
  },
  addOptionsListText: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1, 1, 1, 1),
    background: "#ebecf0",
    "&:hover": {
      backgroundColor: alpha("#000", 0.25),
    },
  },
}));

export default AddOptionsOrMenu;
