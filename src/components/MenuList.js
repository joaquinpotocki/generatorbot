import { Paper, CssBaseline, makeStyles } from "@material-ui/core";
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
}) => {
  const classes = useStyle(); //Iniciamos el hook
  return (
    <Draggable draggableId={menu.id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <Paper className={classes.root} {...provided.dragHandleProps}>
            <CssBaseline />
            <MenuTitle
              title={menu.title}
              menuId={menu.id}
              handleDeleteMenu={handleDeleteMenu}
              index={index}
            />
            <Droppable droppableId={menu.id}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {menu.options.map((option, index) => (
                    <Options
                      option={option}
                      key={option.id}
                      index={index}
                      datos={datos}
                      menu={menu}
                      updateOption={updateOption}
                      handleDeleteOpcion={handleDeleteOpcion}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <AddOptionsOrMenu type="option" menuId={menu.id} />
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
    width: "400px",
    background: "#ebecf0",
    margin: theme.spacing(0, 2, 2, 2),
  },
}));

export default MenuList;
