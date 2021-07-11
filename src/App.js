import { makeStyles } from "@material-ui/core";
import './App.css';
import AddOptionsOrMenu from "./components/AddOptionsOrMenu";
import AddOptionsOrMenuText from "./components/AddOptionsOrMenuText";
import MenuList from './components/MenuList';
import uuid from "react-uuid"
import mockData from "./mockdata.js"
import ContextAPI from "./ContextAPI";
import { useState } from "react";
import background_image from "./images/whatsapp-wallpaper.jpg";


function App() {
  const classes = useStyle(); //Iniciamos el hook
  const [data, setData] = useState(mockData);
 
  const updateMenuTitle = (updatedTitle, menuId) => {
    const menu = data.menus[menuId];
    menu.title = updatedTitle;
    setData({
      ...data, //deja todo el objeto igual
      menus: { //pero de los menus cambia lo siguiente
        ...data.menus, //deja los menus iguales pero
        [menuId]: menu //de el primer menu dejame este menu
      }
    })
  }

  const addOption = (title, menuId) => {
    const newOptionId = uuid(); //creamos un id unico para la nueva opcion
    //crear la opcion nueva
    const newOption = {
      id: newOptionId,
      title,
    }
    //anadir el newOption al array que tiene la lista
    const menu = data.menus[menuId]
    menu.options = [...menu.options, newOption]
    setData({
      ...data,
      menus: {
        ...data.menus,
        [menuId]: menu
      }
    })
  }
  const addMenu = (title) => { 
    //Generar id para menu nuevo
    const newMenuId = uuid();
    setData({
      menuIds : [...data.menuIds, newMenuId],
      menus:{
        ...data.menus,
        [newMenuId]:{
          id: newMenuId,
          title,
          options:[]  
        }
      }
    })

  }

  return (
    <ContextAPI.Provider value={{ updateMenuTitle, addOption, addMenu }}>
      <div className={classes.root}>
        <div className={classes.container}>
          {
            data.menuIds.map(menuID => {
              
              const menu = data.menus[menuID]
              
              return <MenuList menu={menu} key={menuID}/>
            })
          }

          <div>
            <AddOptionsOrMenu type="menu" />
          </div>

        </div>

      </div>
    </ContextAPI.Provider>

  );
}

//Importaremos un Hook
const useStyle = makeStyles(theme => ({
  root: { //Creamos un objeto para diseniar con el hook
    minHeight: "100vh",
    overflowY: "auto",
    backgroundImage : `url(${background_image})`
  },
  container: {
    padding :"15% 5% 15% ",
    display: "flex",
  }
}))

export default App;
