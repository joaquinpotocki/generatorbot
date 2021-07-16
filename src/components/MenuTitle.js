import {
  IconButton,
  InputBase,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

import { useContext, useState } from "react";
import contextAPI from "../ContextAPI";

const MenuTitle = ({ consigna, menuId, handleDeleteMenu, index }) => {
  const classes = useStyle(); //Iniciamos el hook
  const [open, setOpen] = useState(false);
  const [newTitle, setNewconsigna] = useState(consigna);
  const { updateMenuTitle } = useContext(contextAPI);

  const handleBlur = () => {
    updateMenuTitle(newTitle, menuId);
    setOpen(false);
  };

  return (
    <>
      {open ? (
        <InputBase
          value={newTitle}
          onChange={(e) => setNewconsigna(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          fullWidth
          inputProps={{ className: classes.input }}
        />
      ) : (
        <div className={classes.consigna}>
          <Typography
            className={classes.consignaText}
            onClick={() => setOpen(true)}
          >
            {index}. {consigna}
          </Typography>
          <IconButton
            onClick={() => {
              handleDeleteMenu(menuId);
            }}
          >
            <ClearIcon />
          </IconButton>
        </div>
      )}
    </>
  );
};

//Importaremos un Hook
const useStyle = makeStyles((theme) => ({
  consigna: {
    //Creamos un objeto para diseniar con el hook
    display: "flex",
    margin: theme.spacing(1, 1),
  },
  consignaText: {
    flexGrow: 1,
    fontSize: "1.2rem",
    fontWeight: "bold",
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1, 1),
  },
  input: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1, 1),

    "$:focus": {
      background: "#ddd",
    },
  },
}));
export default MenuTitle;
