import {
  IconButton,
  InputBase,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

import { useContext, useState } from "react";
import contextAPI from "../ContextAPI";

//Emojis
import Popper from "@material-ui/core/Popper";

import EmojiPicker from "emoji-picker-react";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import { Paper } from "@material-ui/core";

const MenuTitle = ({ consigna, menuId, handleDeleteMenu, index }) => {
  const classes = useStyle(); //Iniciamos el hook
  const [open, setOpen] = useState(false);
  const [newTitle, setNewconsigna] = useState(consigna);
  const { updateMenuTitle } = useContext(contextAPI);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openPoper, setOpenPoper] = useState(false);
  const [placement, setPlacement] = useState();

  const handleShowEmoji = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpenPoper((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const handleBlur = () => {
    setOpen(true);
  };
  const handleClick = () => {
    updateMenuTitle(newTitle, menuId);
    setOpen(false);
  };

  return (
    <>
      {open ? (
        <>
          <div className={classes.flex}>
            <div className={(classes.flexgrow = 1)}>
              <Paper>
                <InputBase
                  value={newTitle}
                  onChange={(e) => {
                    setNewconsigna(e.target.value);
                  }}
                  onBlur={handleBlur}
                  autoFocus
                  fullWidth
                  inputProps={{ className: classes.input }}
                />
              </Paper>
            </div>
            <div className={classes.emoji}>
              <Button onClick={handleShowEmoji("right-start")}>
                <EmojiEmotionsOutlinedIcon color="disabled" fontSize="large" />
              </Button>
            </div>
          </div>

          <Popper open={openPoper} anchorEl={anchorEl} placement={placement}>
            <EmojiPicker
              onEmojiClick={(e, emojiObject) => {
                const emoji = String.fromCodePoint(`0x${emojiObject.unified}`);
                setNewconsigna(newTitle + emoji);
              }}
            />
          </Popper>
          <div className={classes.flex}>
            <Button variant="contained" color="primary" onClick={handleClick}>
              Guardar Cambios
            </Button>
          </div>
        </>
      ) : (
        <div className={classes.consigna}>
          <Typography
            className={classes.consignaText}
            onClick={() => setOpen(true)}
          >
            {index}. {consigna}
          </Typography>
          <IconButton
            onClick={() => {
              handleDeleteMenu(menuId);
            }}
          >
            <ClearIcon />
          </IconButton>
        </div>
      )}
    </>
  );
};

//Importaremos un Hook
const useStyle = makeStyles((theme) => ({
  consigna: {
    //Creamos un objeto para diseniar con el hook
    display: "flex",
  },
  consignaText: {
    flexGrow: 1,
    fontSize: "1.2rem",
    fontWeight: "bold",
    padding: theme.spacing(0, 1, 1, 2),
    margin: theme.spacing(1, 0, 0, 0),
  },

  input: {
    margin: theme.spacing(1),
    width: "850px",
  },
  flex: {
    display: "flex",
    padding: "1%",
  },
  flexgrow: {
    flexgrow: 1,
  },
  emoji: {
    marginLeft: "2%",
  },
}));
export default MenuTitle;
