import {
  Paper,
  IconButton,
  InputBase,
  Button,
  makeStyles,
} from "@material-ui/core";
import { alpha } from "@material-ui/core/styles";
import { useContext, useState } from "react";
import ClearIcon from "@material-ui/icons/Clear";
import contextAPI from "../ContextAPI";

const AddOptionsOrMenuText = ({ type, setOpen, menuId }) => {
  const [consigna, setTitle] = useState("");
  const classes = useStyle();
  const { addOption, addMenu } = useContext(contextAPI);

  //Validations
  const [error, setError] = useState(true);

  const handleAddOptionOrMenu = () => {
    if (type === "option") {
      addOption(consigna, menuId);
    } else {
      addMenu(consigna);
    }
    setTitle("");
    setError(true);
  };

  return (
    <>
      <Paper className={classes.card}>
        <InputBase
          multiline
          value={consigna}
          onChange={(e) => {
            setTitle(e.target.value);
            if (e.target.value.length === 0) {

              setError(true);
            } else {


              setError(false);
            }
          }}
          placeholder={
            type === "option" ? "Escriba la opcion" : "Escriba la consigna"
          }
          inputProps={{ className: classes.input }}
        />
      </Paper>
      <div className={classes.confirm}>
        <div className={classes.options}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddOptionOrMenu}
            disabled={error}
          >
            {type === "option" ? "Agregar opcion" : "Agregar Consigna"}
          </Button>
          <IconButton onClick={() => setOpen(false)}>
            <ClearIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
};
//Importaremos un Hook
const useStyle = makeStyles((theme) => ({
  card: {
    //Creamos un objeto para diseniar con el hook
    width: "380px",
    margin: theme.spacing(1, 1, 1, 1),
    paddingBotton: theme.spacing(4),
  },
  input: {
    margin: theme.spacing(1),
    width: "350px",
  },
  confirm: {
    display: "flex",
    margin: theme.spacing(0, 1, 1, 1),
  },
  options: {
    flexgrow: 1,
  },
  btnConfirm: {
    background: "#5aac44",
    color: "#fff",
    "&:hover": {
      background: alpha("#5aac44", 0.75),
    },
  },
}));
export default AddOptionsOrMenuText;
