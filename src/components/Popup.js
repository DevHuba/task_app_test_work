import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

//Context
import { useContext } from "react";
import { TodoContext } from "../context/todo.context.jsx";

export const Popup = () => {
  const { _popupConfirm, item, setItem } = useContext(TodoContext);

  return (
    <Modal
      open={Boolean(item)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="popup_box">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          WARNING !
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          You try to add existing task for same author...
        </Typography>
        <br />
        <Button
          variant="contained"
          onClick={() => {
            _popupConfirm();
            setItem(null);
          }}
        >
          confirm
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setItem(null);
          }}
        >
          exit
        </Button>
      </Box>
    </Modal>
  );
};
