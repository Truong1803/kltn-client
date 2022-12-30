import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
export default function AccessModal({
  item,
  method,
  setIsOpen,
  isOpen,
  setAction,
  title,
  content,
  putAction,
}) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.AuthReducer);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleDelete = () => {
    if (method) {
      dispatch(putAction(item._id, method, item, auth.accessToken));
    } else {
      dispatch(putAction(item._id, auth.accessToken));
    }
    setIsOpen(false);
    setAction("");
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='responsive-dialog-title'
    >
      <DialogTitle id='responsive-dialog-title'>Thông báo</DialogTitle>
      <DialogContent>
        <DialogContentText>Bạn có muốn {title} này?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='error' variant='contained'>
          Huỷ
        </Button>
        <Button
          onClick={handleDelete}
          autoFocus
          color='primary'
          variant='contained'
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
}
