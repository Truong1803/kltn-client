import React, { useState } from "react";
import String from "../String/String";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
export default function ConfirmModal({
  item,
  deleteAction,
  setIsOpen,
  isOpen,
  setAction,
  content,
}) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.AuthReducer);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleDelete = () => {
    dispatch(deleteAction(item._id, auth.accessToken));
    setIsOpen(false);
    setAction("");
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const renderContent = () => {
    if (content) {
      return content;
    } else {
      if (item.name) {
        return item.name + " sẽ được xoá khỏi hệ thống";
      } else {
        return "Thông tin sẽ được xoá khỏi hệ thống";
      }
    }
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='responsive-dialog-title'
    >
      <DialogTitle id='responsive-dialog-title'>
        {String.actionDelete + (item.name ? item.name : "thông tin")}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{renderContent()}</DialogContentText>
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
