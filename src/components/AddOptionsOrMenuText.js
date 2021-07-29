import {
  Paper,
  IconButton,
  InputBase,
  Button,
  makeStyles,
} from "@material-ui/core";
import { alpha } from "@material-ui/core/styles";
import { useContext, useState } from "react";
import ClearIcon from "@material-ui/icons/Clear";
import contextAPI from "../ContextAPI";

//Emojis
import Popper from "@material-ui/core/Popper";

import EmojiPicker from "emoji-picker-react";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";

const AddOptionsOrMenuText = ({ type, setOpen, menuId }) => {
  const [consigna, setTitle] = useState("");
  const classes = useStyle();
  const { addOption, addMenu } = useContext(contextAPI);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPoper, setOpenPoper] = useState(false);
  const [placement, setPlacement] = useState();

  //Validations
  const [error, setError] = useState(true);

  const handleAddOptionOrMenu = () => {
    if (type === "option") {
      addOption(consigna, menuId);
    } else {
      console.log("addMenu");
      console.log(consigna);
      addMenu(consigna);
    }
    setTitle("");
    setError(true);
  };

  const handleShowEmoji = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpenPoper((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <>
      <div className={classes.flexing}>
        <Paper
          className={type === "option" ? classes.card : classes.cardConsigna}
        >
          <InputBase
            multiline
            value={consigna}
            onChange={(e) => {
              const val = e.target.value;
              setTitle(e.target.value);

              if (e.target.value.length === 0) {
                setError(true);
              } else {
                setError(false);
              }
            }}
            placeholder={
              type === "option" ? "Escriba la opcion" : "Escriba la consigna"
            }
            inputProps={{ className: classes.input }}
          />
        </Paper>
        {type !== "option" ? (
          <>
            <Button
              className={classes.emoji}
              onClick={handleShowEmoji("right-start")}
            >
              <EmojiEmotionsOutlinedIcon color="disabled" fontSize="large" />
            </Button>
            <Popper open={openPoper} anchorEl={anchorEl} placement={placement}>
              <EmojiPicker
                onEmojiClick={(e, emojiObject) => {
                  const emoji = String.fromCodePoint(
                    `0x${emojiObject.unified}`
                  );
                  setTitle(consigna + emoji);
                }}
              />
            </Popper>
          </>
        ) : (
          ""
        )}
      </div>

      <div className={classes.confirm}>
        <div className={classes.options}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddOptionOrMenu}
            disabled={error}
          >
            {type === "option" ? "Agregar opcion" : "Agregar Consigna"}
          </Button>
          <IconButton onClick={() => setOpen(false)}>
            <ClearIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
};
//Importaremos un Hook
const useStyle = makeStyles((theme) => ({
  card: {
    //Creamos un objeto para diseniar con el hook
    width: "980px",
    margin: theme.spacing(1, 1, 1, 1),
    paddingBotton: theme.spacing(4),
  },
  cardConsigna: {
    //Creamos un objeto para diseniar con el hook
    width: "630px",
    margin: theme.spacing(1, 1, 1, 1),
    paddingBotton: theme.spacing(4),
  },
  input: {
    margin: theme.spacing(1),
    width: "950px",
  },
  confirm: {
    display: "flex",
    margin: theme.spacing(0, 1, 1, 1),
  },
  options: {
    flexgrow: 1,
  },
  flexing: {
    display: "flex",
  },
  emoji: {
    margin: "2%",
  },
  btnConfirm: {
    background: "#5aac44",
    color: "#fff",
    "&:hover": {
      background: alpha("#5aac44", 0.75),
    },
  },
}));
export default AddOptionsOrMenuText;
