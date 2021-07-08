import { Collapse, fade, makeStyles, Paper, Typography } from "@material-ui/core";
import { useState } from "react";
import AddOptionsOrMenuText from "./AddOptionsOrMenuText";

const AddOptionsOrMenu = () => {
    const classes = useStyle(); //Iniciamos el hook
    const [open, setOpen] = useState(true)
    return (
        <div className={classes.root}>
            <Collapse in={open}>
                <AddOptionsOrMenuText />
            </Collapse>
            <Collapse in={!open}>
                <Paper className={classes.addOptionsListText}>
                    <Typography>
                        <h2>+ Add Options</h2>
                    </Typography>
                </Paper>

            </Collapse>
        </div>
    )
}

//Importaremos un Hook
const useStyle = makeStyles(theme => ({
    root: { //Creamos un objeto para diseniar con el hook
        width: "300px",
        marginTop: theme.spacing(1)
    },
    addOptionsListText: {
        padding: theme.spacing(1, 1, 1, 2),
        margin: theme.spacing(1, 1, 1, 1),
        background: "#ebecf0",
        "&:hover": {
            backgroundColor: fade("#000", 0.25)
        }

    }
}))


export default AddOptionsOrMenu
