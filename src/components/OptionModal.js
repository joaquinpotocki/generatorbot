import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import {FormControlLabel, IconButton, Radio, RadioGroup, Typography } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';


const OptionModal=({datos, option, menu})=> {
  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <MoreHorizIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Opcion: {option.id}. {option.title}</DialogTitle>
        <DialogContent>
        <Typography>
            Al seleccionar la opcion {option.id}. {option.title}, 
            ¿A cual de las siguientes consigna se debe redirigir?
        </Typography>
        {
                  datos.map((menucito) => {  
                      if (menucito.id != menu.id) {
                        return <RadioGroup>
                                  <FormControlLabel value={menucito.id} control={<Radio />} label={menucito.title} />
                                </RadioGroup>
                      }                  
                    
                    
                    
                  })
                }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OptionModal;

