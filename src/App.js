import { makeStyles, Grid, Paper } from "@material-ui/core";
import AddOptionsOrMenu from "./components/AddOptionsOrMenu";
import MenuList from "./components/MenuList";
import DrawerLeft from "./components/DraweLeft";
import uuid from "react-uuid";
import mockData from "./mockdata.js";
import mockData2 from "./mockdata2";
import ContextAPI from "./ContextAPI";
import { useState } from "react";
import background_image from "./images/image.png";

//Library react-beautiful-dnd -> drag and drop
import { DragDropContext, Droppable } from "react-beautiful-dnd";

function App(props) {
  const classes = useStyle(); //Iniciamos el hook
  const [data, setData] = useState(mockData);
  const [datos, setDatos] = useState(mockData2);

  const empresaId = uuid();

  const empresa = props.location.state.empresa;

  const updateMenuTitle = (updatedTitle, menuId) => {
    const menu = data.menus[menuId];
    menu.title = updatedTitle;
    setData({
      ...data, //deja todo el objeto igual
      menus: {
        //pero de los menus cambia lo siguiente
        ...data.menus, //deja los menus iguales pero
        [menuId]: menu, //de el primer menu dejame este menu
      },
    });
  };

  //update de los radios del modal
  const updateOption = (menuIdRedirect, menuId, optionId) => {
    const option = data.menus[menuId].options[optionId.charCodeAt(0) - 65];
    option.menuIdRedirect = menuIdRedirect;
  };

  //Funcion para agregar una nueva opcion
  const addOption = (title, menuId) => {
    //crear id para option
    const menucito = data.menus[menuId];

    const newOptionId = String.fromCharCode(menucito.options.length + 65); //creamos un id unico para la nueva opcion
    //crear la opcion nueva
    const newOption = {
      id: newOptionId,
      title,
      menuIdRedirect: "",
      guardar: false,
    };
    //anadir el newOption al array que tiene la lista
    const menu = data.menus[menuId];
    menu.options = [...menu.options, newOption];
    setData({
      ...data,
      menus: {
        ...data.menus,
        [menuId]: menu,
      },
    });
    updateDatos();
  };

  //Funcion para agregar un submenu 
  const addMenu = (title) => {
    //Generar id para menu nuevo
    const newMenuId = uuid();
    setData({
      menuIds: [...data.menuIds, newMenuId],
      menus: {
        ...data.menus,
        [newMenuId]: {
          id: newMenuId,
          title,
          options: [],
        },
      },
    });
    updateDatos();
  };

<<<<<<< HEAD
=======

  //Update de la variable definitiva a convertir en json para el bot
  //********************************************************************************************************************* */
>>>>>>> 961bc584d489a2648a8a42560f0a182f69f0bdfe
  const updateDatos = () => {
    console.log("empresa");
    console.log(empresa);
    console.log(empresaId);
    datos.empresa = empresa;
    datos.idEmpresa = empresaId;
    datos.menu = [];

    data.menuIds.map((menuID, index) => {
      const subMenu = data.menus[menuID];

      datos.menu.push(subMenu);

      setDatos(datos);
      console.log(datos.empresa);
      console.log(datos.idEmpresa);
      console.log(datos.menu);
      return;
    });
    console.log("Datos cargador y transformados a JSON - Objetos JSON")
    console.log(JSON.stringify(datos))
  };
  //********************************************************************************************************************** */

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
    if (type === "list") {
      const newMenuIds = data.menuIds;
      newMenuIds.splice(sourceIndex, 1);
      newMenuIds.splice(destIndex, 0, draggableId);

      setData({
        ...data,
        menuIds: data.menuIds,
      });
    }
    updateDatos();
  };

  //delete Menu
  const handleDeleteMenu = (menuId) => {
    data.menuIds.splice(data.menuIds.indexOf(menuId), 1);

    //actualizo el estado de la app
    setData({
      ...data, //Manteneme todo lo que esta en data...
      menuIds: data.menuIds, //pero en menuIds actualizalo con el valor actual
    });

    updateDatos();
  };

  //delete Opcion
  const handleDeleteOpcion = (menuId, optionId) => {
    //Delete opcion
    data.menus[menuId].options.splice(optionId.charCodeAt(0) - 65, 1);

    //Actualizacion de Id
    data.menus[menuId].options.map((option, index) => {
      option.id = String.fromCharCode(index + 65);

      return;
    });

    updateDatos();
  };
  return (
    <ContextAPI.Provider value={{ updateMenuTitle, addOption, addMenu }}>
      <DrawerLeft data={data} setData={setData}></DrawerLeft>
      <div className={classes.root}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="12345" type="list" direction="horizontal">
            {(provaided) => (
              <div
                className={classes.container}
                ref={provaided.innerRef}
                {...provaided.droppableProps}
              >
                {data.menuIds.map((menuID, index) => {
                  const menu = data.menus[menuID];

                  return (
                    <MenuList
                      index={index}
                      menu={menu}
                      key={menuID}
                      index={index}
                      handleDeleteOpcion={handleDeleteOpcion}
                      handleDeleteMenu={handleDeleteMenu}
                      datos={datos}
                      updateOption={updateOption}
                    />
                  );
                })}
                <div>{provaided.placeholder}</div>;
                <AddOptionsOrMenu type="menu" />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </ContextAPI.Provider>
  );
}

//Importaremos un Hook
const useStyle = makeStyles((theme) => ({
  root: {
    //Creamos un objeto para diseniar con el hook
    minHeight: "100vh",
    overflowY: "auto",
    backgroundImage: `url(${background_image})`,
    backgroundPosition: "center",
    backgroundSize: "contain",
  },
  container: {
    padding: "3% 0 0 10%",
    display: "flex",
  },
}));

export default App;
