import { Paper, IconButton, InputBase, Button, makeStyles, fade } from "@material-ui/core";
import { useState } from "react";
import ClearIcon from "@material-ui/icons/Clear";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";


const AddOptionsOrMenuText = () => {
    const [title, setTitle] = useState("");
    const classes = useStyle(); 
    return (
        <>
            <Paper className={classes.card}>
                <InputBase
                    multiline
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Enter a title for this option.."
                    inputProps={{ className: classes.input }}
                />
            </Paper>
            <div className={classes.confirm}>
                <div className={classes.options}>
                    <Button className={classes.btnConfirm}>Add option</Button>
                    <IconButton>
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
        marginTop: theme.spacing(0, 1, 1, 1),
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
