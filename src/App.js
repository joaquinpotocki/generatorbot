import { makeStyles } from "@material-ui/core";
import './App.css';
import AddOptionsOrMenu from "./components/AddOptionsOrMenu";
import MenuList from './components/MenuList';
import uuid from "react-uuid"
import mockData from "./mockdata.js"
import ContextAPI from "./ContextAPI";
import { useState } from "react";
import background_image from "./images/whatsapp-wallpaper.jpg";

//Library react-beautiful-dnd -> drag and drop
import {DragDropContext, Droppable} from 'react-beautiful-dnd'



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

  //Funcion para drag and drop
  const onDragEnd = (result) =>
  {const {destination, destination:{ index:destIndex},  source:{ index: sourceIndex}, draggableId,type}=result;

if (!destination) {
  return;
  
}
    if (type === "list") {
      const newMenuIds = data.menuIds;
      newMenuIds.splice(sourceIndex, 1);
      newMenuIds.splice(destIndex, 0, draggableId)

      setData({
        ...data,
        menuIds: data.menuIds
      })
    }
  }

  //delete Menu
  const handleDeleteMenu=(menuId)=>{
    data.menuIds.splice(data.menuIds.indexOf(menuId), 1)
    
    //actualizo el estado de la app
    setData({
      ...data,//Manteneme todo lo que esta en data...
      menuIds: data.menuIds//pero en menuIds actualizalo con el valor actual
    })
   
}

  return (
    <ContextAPI.Provider value={{ updateMenuTitle, addOption, addMenu }}>
      <div className={classes.root}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="12345" type="list" direction="horizontal">
            {
              (provaided)=>(
                <div className={classes.container} ref={provaided.innerRef}
                {...provaided.droppableProps}
                >
                {
                  data.menuIds.map((menuID, index) => {
                    
                    const menu = data.menus[menuID]
                    
                    return <MenuList menu={menu} key={menuID} index={index} handleDeleteMenu={handleDeleteMenu}/>
                  })
                }
      
                <div>
                  <AddOptionsOrMenu type="menu" />
                  {provaided.placeholder}
                </div>
      
              </div>
              )
            }
         
          </Droppable>
       
        </DragDropContext>
        

      </div>
    </ContextAPI.Provider>

  );
}

//Importaremos un Hook
const useStyle = makeStyles(theme => ({
  root: { //Creamos un objeto para diseniar con el hook
    minHeight: "100vh",
    overflowY: "auto",
    backgroundImage : `url(${background_image})`,
    backgroundPosition:'center',
    backgroundSize: 'cover',
    backgroundRepeat:'no-repeat'
  },
  container: {
    padding :"15% 5% 15% ",
    display: "flex",
  }
}))

export default App;