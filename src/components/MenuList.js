import {
  Paper,
  CssBaseline,
  makeStyles,
  Switch,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import AddOptionsOrMenu from "./AddOptionsOrMenu";
import MenuTitle from "./MenuTitle";
import Options from "./Options";

const MenuList = ({
  menu,
  index,
  updateOption,
  handleDeleteMenu,
  datos,
  handleDeleteOpcion,
  updateDatos,
  updateMenuFinaliza,
}) => {
  const classes = useStyle(); //Iniciamos el hook

  const [checked, setChecked] = useState(menu.finaliza);

  const handleSwitch = () => {
    const check = !checked;
    setChecked(check);
    updateMenuFinaliza(check, menu.menuId);
  };
  return (
    <Draggable draggableId={menu.menuId} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <Paper className={classes.root} {...provided.dragHandleProps}>
            <CssBaseline />
            <MenuTitle
              consigna={menu.consigna}
              menuId={menu.menuId}
              handleDeleteMenu={handleDeleteMenu}
              index={index}
            />
            <div className={classes.display}>
              <Typography variant="" color="initial">
                Finalizar
              </Typography>

              <Switch checked={menu.finaliza} onChange={handleSwitch} />
            </div>
            <Droppable droppableId={menu.menuId}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {menu.menuItem.map((option, index) => (
                    <Options
                      option={option}
                      key={option.opcionId}
                      index={index}
                      datos={datos}
                      menu={menu}
                      updateOption={updateOption}
                      handleDeleteOpcion={handleDeleteOpcion}
                      updateDatos={updateDatos}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <AddOptionsOrMenu type="option" menuId={menu.menuId} />
          </Paper>
        </div>
      )}
    </Draggable>
  );
};

//Importaremos un Hook
const useStyle = makeStyles((theme) => ({
  root: {
    //Creamos un objeto para diseniar con el hook
    width: "1000px",
    background: "#ebecf0",
    margin: theme.spacing(2, 2, 2, 2),
  },
  display: { textAlign: "end" },
}));

export default MenuList;
