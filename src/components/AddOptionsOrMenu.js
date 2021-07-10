import { Collapse, fade, makeStyles, Paper, Typography } from "@material-ui/core";

import { useState } from "react";
import AddOptionsOrMenuText from "./AddOptionsOrMenuText";

const AddOptionsOrMenu = ({ type, menuId }) => {
    const classes = useStyle(); //Iniciamos el hook
    const [open, setOpen] = useState(true)


    return (
        <div className={classes.root}>
            <Collapse in={open}>
                <AddOptionsOrMenuText type={type} menuId={menuId} setOpen={setOpen} />
            </Collapse>
            <Collapse in={!open}>
                <Paper className={classes.addOptionsListText} onClick={() => setOpen(true)}>
                    <Typography>
                        {
                            type === "option" ?
                                "+ Add Options" :
                                "+ Add another menu"
                        }

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
        margin: theme.spacing(0, 1, 1, 1),
        background: "#ebecf0",
        "&:hover": {
            backgroundColor: fade("#000", 0.25)
        }

    }
}))


export default AddOptionsOrMenu
