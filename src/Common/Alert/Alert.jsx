import { Slide, Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import React, { useState, useEffect } from "react";

export default function AlertSystem({ message }) {
  const [open, setOpen] = useState(false);
  const [state] = useState({
    vertical: "bottom",
    horizontal: "right",
  });
  const { vertical, horizontal } = state;
  useEffect(() => {
    if (message.status && message.message && message.status !== "loading") {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 5000);
    }
  }, [message]);
  function slice(props) {
    return <Slide {...props} direction='left' />;
  }
  return message && message.message ? (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      key={{ vertical, horizontal }}
      TransitionComponent={slice}
      sx={open === false ? { display: "none" } : { display: "block" }}
    >
      <Alert variant='filled' severity={message.status}>
        <AlertTitle>Thông báo hệ thống</AlertTitle>
        {message.message}
      </Alert>
    </Snackbar>
  ) : (
    <></>
  );
}
