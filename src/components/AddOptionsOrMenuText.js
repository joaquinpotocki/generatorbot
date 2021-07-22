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
  const [consigna2, setTitle] = useState("");
  const [consigna, setTitle2] = useState("");
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
      addMenu(consigna2);
    }
    setTitle("");
    setError(true);
  };

  const handleShowEmoji = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpenPoper((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const emojiToUnicode = (val) => {
    //creo una expresion regular
    var regex =
      /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;

    //por la funcion marchAll pasandole la XR
    let matches = [...val.matchAll(regex)];

    //Como js no permite la mutacion de String, sobreescribo la funcion replace, permitiendo
    //agregar un indice y en esa posicion reemplazar el valor del string
    String.prototype.replaceAt = function (index, replacement) {
      if (index >= this.length) {
        return this.valueOf();
      }

      return this.substring(0, index) + replacement + this.substring(index + 2);
    };

    //Declaro dos variables auxiliares
    let valAux = "";
    let iAux = 0;

    //Con los match que encontre, recorro cada uno
    matches.forEach((match) => {
      //La magia
      val = val.replaceAt(
        match.index + iAux,
        `|U+${match[0].codePointAt(0).toString(16)}|`
      );
      valAux = `|U+${match[0].codePointAt(0).toString(16)}|`;

      iAux += valAux.length - 2;
    });
    console.log("val");
    console.log(val);
    setTitle2(val);
  };

  return (
    <>
      <div className={classes.flexing}>
        <Paper className={classes.card}>
          <InputBase
            multiline
            value={consigna2}
            onChange={(e) => {
              const val = e.target.value;
              emojiToUnicode(val);
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
                  setTitle(consigna2 + emoji);
                  setTitle2(
                    consigna + `|U+${emoji.codePointAt(0).toString(16)}|`
                  );
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
    width: "380px",
    margin: theme.spacing(1, 1, 1, 1),
    paddingBotton: theme.spacing(4),
  },
  input: {
    margin: theme.spacing(1),
    width: "250px",
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
