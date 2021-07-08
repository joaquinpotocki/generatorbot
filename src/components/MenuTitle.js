import { makeStyles, Typography } from "@material-ui/core"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const MenuTitle = () => {
    const classes = useStyle(); //Iniciamos el hook
    return (
        <div className={classes.title}>
            <Typography className={classes.titleText}>
                Menu
            </Typography>
            <MoreHorizIcon/>
        </div>

    )
}

//Importaremos un Hook
const useStyle = makeStyles(theme => ({
    title: { //Creamos un objeto para diseniar con el hook
        display: "flex",
        margin: theme.spacing(1)
    },
    titleText: {
        flexGrow: 1,
        fontSize: "1.2rem",
        fontWeight: "bold",
    }
}))
export default MenuTitle
