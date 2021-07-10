import { Paper, CssBaseline, makeStyles } from "@material-ui/core";
import contextAPI from "../ContextAPI.js";
import AddOptionsOrMenu from "./AddOptionsOrMenu";
import MenuTitle from "./MenuTitle";
import Options from "./Options";


const MenuList = ({ menu }) => {
    const classes = useStyle(); //Iniciamos el hook
    return (

        <Paper className={classes.root}>
            <CssBaseline />
            <MenuTitle />
            {
                menu.options.map(option => (
                    <Options oprion={option} key={option.id} />
                ))
            }
            <AddOptionsOrMenu type="option" menu={menu.id} />
        </Paper>
    )
}

//Importaremos un Hook
const useStyle = makeStyles(theme => ({
    root: { //Creamos un objeto para diseniar con el hook
        width: "300px",
        background: "#ebecf0",
        margin: theme.spacing(1)
    }
}))

export default MenuList
