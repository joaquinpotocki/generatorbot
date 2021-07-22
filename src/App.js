import { makeStyles, Button, Typography } from "@material-ui/core";
import AddOptionsOrMenu from "./components/AddOptionsOrMenu";
import MenuList from "./components/MenuList";
import DrawerLeft from "./components/DraweLeft";
import uuid from "react-uuid";
import mockData from "./mockdata.js";
import mockData2 from "./mockdata2";
import ContextAPI from "./ContextAPI";
import { useState } from "react";
import background_image from "./images/image.png";

import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

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
    menu.consigna = updatedTitle;
    setData({
      ...data, //deja todo el objeto igual
      menus: {
        //pero de los menus cambia lo siguiente
        ...data.menus, //deja los menus iguales pero
        [menuId]: menu, //de el primer menu dejame este menu
      },
    });
  };
  const updateMenuFinaliza = (finalizar, menuId) => {
    const menu = data.menus[menuId];
    menu.finaliza = finalizar;
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
    const option = data.menus[menuId].menuItem[optionId.charCodeAt(0) - 65];
    option.menuId = menuIdRedirect;

    console.log(
      "estoy dentro de update option justo antes de llamar a update datos"
    );
    updateDatos();
  };

  //Funcion para agregar una nueva opcion
  const addOption = (consigna, menuId) => {
    //crear menuId para option
    const menucito = data.menus[menuId];

    const newOptionId = String.fromCharCode(menucito.menuItem.length + 65); //creamos un id unico para la nueva opcion
    //crear la opcion nueva
    const newOption = {
      opcionId: newOptionId,
      opcion: consigna,
      menuId: "",
      guardar: false,
    };
    //anadir el newOption al array que tiene la lista
    const menu = data.menus[menuId];
    menu.menuItem = [...menu.menuItem, newOption];
    setData({
      ...data,
      menus: {
        ...data.menus,
        [menuId]: menu,
      },
    });
    updateDatos();
  };

  //Update de la variable definitiva a convertir en json para el bot
  //emojitoUnicode
  const emojiToUnicode = (val) => {
    //creo una expresion regular
    var regex =
      /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;

    //por la funcion marchAll pasandole la XR
    let matches = [...val.matchAll(regex)];

    //Como js no permite la mutacion de String, sobreescribo la funcion replace, permitiendo
    //agregar un indice y en esa posicion reemplazar el valor del string
    String.prototype.replaceAt = function (index, replacement) {
      if (index >= this.length) {
        return this.valueOf();
      }

      return this.substring(0, index) + replacement + this.substring(index + 2);
    };

    //Declaro dos variables auxiliares
    let valAux = "";
    let iAux = 0;

    //Con los match que encontre, recorro cada uno
    matches.forEach((match) => {
      //La magia
      val = val.replaceAt(
        match.index + iAux,
        `|U+${match[0].codePointAt(0).toString(16)}|`
      );
      valAux = `|U+${match[0].codePointAt(0).toString(16)}|`;

      iAux += valAux.length - 2;
    });
    console.log("val");
    console.log(val);
    return val;
  };
  //********************************************************************************************************************* */
  const updateDatos = () => {
    datos.empresa = empresa;
    datos.empresaId = empresaId;
    datos.menu = [];

    data.menuIds.map((menuID, index) => {
      const subMenu = data.menus[menuID];
      let menu = {};
      Object.assign(menu, subMenu);
      datos.menu.push(menu);

      setDatos(datos);
      return;
    });
    datos.menu.map((subMenu) => {
      //emojiToUnicode
      subMenu.consigna = emojiToUnicode(subMenu.consigna);
      //end-emojiToUnicodes
    });

    console.log("**************");
    console.log("Objeto de JS");
    console.log(datos);
    console.log("Transformacion a JSON");
    console.log(JSON.stringify(datos));
  };
  //********************************************************************************************************************** */
  //Funcion para agregar un submenu
  const addMenu = (consigna) => {
    //Generar id para menu nuevo
    const newMenuId = uuid();

    setData({
      menuIds: [...data.menuIds, newMenuId],
      menus: {
        ...data.menus,
        [newMenuId]: {
          menuId: newMenuId,
          consigna,
          finaliza: false,
          menuItem: [],
        },
      },
    });
  };

  //Funcion para drag and drop
  const onDragEnd = (result) => {
    if (result.destination) {
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
    data.menus[menuId].menuItem.splice(optionId.charCodeAt(0) - 65, 1);
    const menu = data.menus[menuId];
    setData({
      ...data,
      menus: {
        ...data.menus,
        [menuId]: menu,
      },
    });
    //Actualizacion de Id
    data.menus[menuId].menuItem.map((option, index) => {
      option.opcionId = String.fromCharCode(index + 65);
    });
    updateDatos();
  };

  const downloadTxtFile = () => {
    updateDatos();

    const element = document.createElement("a");
    const varJson = JSON.stringify(datos);
    const file = new Blob([varJson], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "myFileJson.json";

    element.click();
  };

  return (
    <ContextAPI.Provider value={{ updateMenuTitle, addOption, addMenu }}>
      <DrawerLeft data={data} setData={setData}></DrawerLeft>

      <div className={classes.root}>
        <div className={classes.downloadButton}>
          <div className={classes.flexito}></div>
          <Button
            variant="contained"
            color="secondary"
            disableElevation
            className={classes.button}
            onClick={downloadTxtFile}
          >
            <ArrowDownwardIcon fontSize="Large" />
            <Typography variant="h5" color="initial">
              JSON
            </Typography>
          </Button>
        </div>
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
                    <>
                      <MenuList
                        index={index}
                        menu={menu}
                        key={menuID}
                        index={index}
                        handleDeleteOpcion={handleDeleteOpcion}
                        handleDeleteMenu={handleDeleteMenu}
                        datos={datos}
                        updateOption={updateOption}
                        updateDatos={updateDatos}
                        updateMenuFinaliza={updateMenuFinaliza}
                      />
                      {updateDatos()}
                    </>
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
    padding: "5% 0 0 10%",
    display: "flex",
  },
  downloadButton: {
    display: "flex",
    position: "fixed",
    right: "0px",
    top: "3%",
  },
  flexito: {
    flexGrow: 1,
  },
  button: {
    borderStartStartRadius: "50px",
    borderBottomLeftRadius: "50px",
    borderRadius: "0px",
    padding: "10px",
  },
}));

export default App;
