import { IconButton, makeStyles, Paper } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import OptionModal from "./OptionModal";

const Options = ({ option, datos, menu, updateOption, handleDeleteOpcion }) => {
  const classes = useStyle(); //Iniciamos el hook

  return (
    <>
      <Paper className={classes.trellocard}>
        <div className={classes.flexin}>
          <div className={classes.growcito}>
            {option.id}. {option.title}
          </div>

          <OptionModal
            datos={datos}
            option={option}
            menu={menu}
            updateOption={updateOption}
          ></OptionModal>
          <IconButton
            onClick={() => {
              handleDeleteOpcion(menu.id, option.id);
            }}
          >
            <ClearIcon />
          </IconButton>
        </div>
      </Paper>
    </>
  );
};
//Importaremos un Hook
const useStyle = makeStyles((theme) => ({
  trellocard: {
    //Creamos un objeto para diseniar con el hook
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1, 1),
  },
  flexin: {
    display: "flex",
  },
  growcito: {
    flexGrow: 1,
    padding: "15px",
  },
}));
export default Options;
