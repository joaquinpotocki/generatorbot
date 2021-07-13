import { IconButton, InputBase, makeStyles, Typography } from "@material-ui/core"
import ClearIcon from "@material-ui/icons/Clear";

import { useContext, useState } from "react";
import contextAPI from "../ContextAPI";

const MenuTitle = ({ title, menuId, handleDeleteMenu }) => {
    const classes = useStyle(); //Iniciamos el hook
    const [open, setOpen] = useState(false)
    const [newTitle, setNewtitle] = useState(title)
    const { updateMenuTitle } = useContext(contextAPI)

    const handleBlur = () => {
        updateMenuTitle(newTitle, menuId)
        setOpen(false)
    }



    return (
        <>
            {open ? (
                <InputBase
                    value={newTitle}
                    onChange={e => setNewtitle(e.target.value)}
                    onBlur={handleBlur}
                    autoFocus
                    fullWidth
                    inoutProps={{ className: classes.input }}
                />
            ) : (
                <div className={classes.title}>
                    <Typography className={classes.titleText} onClick={() => setOpen(true)}>
                        {title}
                    </Typography>
                    <IconButton onClick={() => { handleDeleteMenu(menuId) }}>
                        <ClearIcon />
                    </IconButton>
                </div>)
            }
        </>
    )
}

//Importaremos un Hook
const useStyle = makeStyles(theme => ({
    title: { //Creamos un objeto para diseniar con el hook
        display: "flex",
        margin: theme.spacing(1, 1)
    },
    titleText: {
        flexGrow: 1,
        fontSize: "1.2rem",
        fontWeight: "bold",
        padding: theme.spacing(1, 1, 1, 2),
        margin: theme.spacing(1, 1)
    },
    input: {

        fontSize: "1.2rem",
        fontWight: "bold",
        "$:focus": {
            background: "#ddd"
        }
    }
}))
export default MenuTitle
