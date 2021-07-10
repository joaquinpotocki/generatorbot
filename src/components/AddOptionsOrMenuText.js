import { Paper, IconButton, InputBase, Button, makeStyles, fade } from "@material-ui/core";
import { useState } from "react";
import ClearIcon from "@material-ui/icons/Clear";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { SettingsInputComponent } from "@material-ui/icons";
import contextAPI from "../contextAPI";


const AddOptionsOrMenuText = ({ type, setOpen, menuId }) => {
    const [title, setTitle] = useState("");
    const classes = useStyle();
    const { addOption, addMenu } = useContext(contextAPI)

    const handleAddOptionOrMenu = () => {
        if (type === "option") {
            addOption(title, menuId)
        } else {
            addMenu(title)
        }
        setTitle("")
        setOpen(false)
    }
    return (
        <>
            <Paper className={classes.card}>
                <InputBase
                    multiline
                    value={title}
                    onBlur={() => setOpen(false)}
                    onChange={e => setTitle(e.target.value)}
                    placeholder={
                        type === "option" ?
                            "Enter a title for this option.." :
                            "Enter menu title"
                    }
                    inputProps={{ className: classes.input }}
                />
            </Paper>
            <div className={classes.confirm}>
                <div className={classes.options}>
                    <Button className={classes.btnConfirm} onClick={handleAddOptionOrMenu}>
                        {
                            type == "option" ? "Add option" :
                                "Add menu"
                        }

                    </Button>
                    <IconButton onClick={() => setOpen(false)}>
                        <ClearIcon />
                    </IconButton>
                </div>

                <IconButton>
                    <MoreHorizIcon />
                </IconButton>
            </div>
        </>
    )
}
//Importaremos un Hook
const useStyle = makeStyles(theme => ({
    card: { //Creamos un objeto para diseniar con el hook
        width: "280px",
        margin: theme.spacing(0, 1, 1, 1),
        paddingBotton: theme.spacing(4)
    },
    input: {
        margin: theme.spacing(1)
    },
    confirm: {
        display: "flex",
        margin: theme.spacing(0, 1, 1, 1)
    },
    options: {
        flexgrow: 1
    },
    btnConfirm: {
        background: "#5aac44",
        color: "#fff",
        "&:hover": {
            background: fade("#5aac44", 0.75)
        }
    }


}))
export default AddOptionsOrMenuText
