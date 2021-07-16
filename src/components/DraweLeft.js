import { Drawer, makeStyles, Paper, Typography } from "@material-ui/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DrawerLeft = ({ data, setData }) => {
  const classes = useStyle(); //Iniciamos el hook

  //Funcion para drag and drop
  const onDragEnd = (result) => {
    const {
      destination,
      destination: { index: destIndex },
      source: { index: sourceIndex },
      draggableId,
      type,
    } = result;

    if (!destination) {
      return;
    }
    if (type === "DEFAULT") {
      const newMenuIds = data.menuIds;
      newMenuIds.splice(sourceIndex, 1);
      newMenuIds.splice(destIndex, 0, draggableId);
      setData({
        ...data,
        menuIds: data.menuIds,
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawe,
        }}
      >
        <div className={classes.drawer}></div>
        <Droppable droppableId="consignas">
          {(droppableProvided) => (
            <div
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
            >
              {data.menuIds.map((menuID, index) => {
                const menu = data.menus[menuID];

                return (
                  <Draggable key={menuID} draggableId={menuID} index={index}>
                    {(draggableProvided) => (
                      <div className={classes.conteiner}>
                        <Paper
                          {...draggableProvided.draggableProps}
                          ref={draggableProvided.innerRef}
                          {...draggableProvided.dragHandleProps}
                          elevation={9}
                          className={classes.paper}
                        >
                          <Typography
                            variant="h5"
                            color=""
                            className={classes.typography}
                          >
                            {index}
                          </Typography>
                        </Paper>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </Drawer>
    </DragDropContext>
  );
};
const useStyle = makeStyles((theme) => ({
  conteiner: {
    padding: "10%",
  },
  paper: {
    height: "100px",
    width: "120px",
  },
  drawer: {
    margin: "0 30px 0 0 ",
    padding: "0 60px ",
  },
  drawe: {
    background: "#ffffff1a",
    borderRadius: "10px",
  },
  typography: {
    color: "grey",
    textAlign: "center",
    paddingTop: "35px",
  },
}));

export default DrawerLeft;
