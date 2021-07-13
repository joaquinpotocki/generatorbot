<<<<<<< HEAD
import { makeStyles, IconButton, Paper } from '@material-ui/core';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import React from 'react'
=======
import { makeStyles, Paper } from '@material-ui/core';
>>>>>>> 9eff45010c83bd10ae43c645ce44e8585ccc605a

const Options = ({ option }) => {
    const classes = useStyle(); //Iniciamos el hook
    return (
        <>

            <Paper className={classes.trellocard}>
                <div className={classes.flexin}>
                    <div className={classes.growcito}>
                        {option.title}
                    </div>

                    <IconButton>
                        <MoreHorizIcon />
                    </IconButton>
                </div>
            </Paper>

        </>
    )
}
//Importaremos un Hook
const useStyle = makeStyles(theme => ({
    trellocard: { //Creamos un objeto para diseniar con el hook
        padding: theme.spacing(1, 1, 1, 2),
        margin: theme.spacing(1, 1)
    },
    flexin: {
        display: "flex"
    },
    growcito: {
        flexGrow: 1,
        padding: "15px"
    }
}))
export default Options
