import { makeStyles, Paper } from '@material-ui/core';
import React from 'react'

const Options = () => {
    const classes = useStyle(); //Iniciamos el hook
    return (
        <Paper className={classes.trellocard}>
            Options
        </Paper>
    )
}
//Importaremos un Hook
const useStyle = makeStyles(theme => ({
    trellocard: { //Creamos un objeto para diseniar con el hook
        padding: theme.spacing(1, 1, 1, 2),
        margin: theme.spacing(1)
    }
}))
export default Options
