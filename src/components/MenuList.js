import { Paper, CssBaseline, makeStyles } from "@material-ui/core";
import AddOptionsOrMenu from "./AddOptionsOrMenu";
import MenuTitle from "./MenuTitle";
import Options from "./Options";

const MenuList = () => {
    const classes = useStyle(); //Iniciamos el hook
    return (
        <Paper className={classes.root}>
            <CssBaseline />
            <MenuTitle />
            <Options />
            <Options />
            <Options />
            <Options />
            <AddOptionsOrMenu />
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
