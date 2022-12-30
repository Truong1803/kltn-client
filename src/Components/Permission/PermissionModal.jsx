import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import String from "../../Common/String/String";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import { MenuItem, Select, TextField, Typography } from "@mui/material";
import { createPermissionAction, editPermissionAction } from "../../redux/action/PermissionAction";

export default function PermissionModal({ isOpen, action, item, setIsOpen }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [isValid, setIsValid] = useState(false);
  const [data, setData] = useState({});

  const auth = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (action === "EDIT") {
      setData(item);
    } else if (action === "ADD") {
      setData("");
    }
  }, [action, item]);

  const handleSubmit = async () => {
    if (action === "ADD") {
      if (data) {
        dispatch(createPermissionAction(data, auth.accessToken));
        setIsOpen(!isOpen);
        setIsValid(false);
        setData("");
      } else {
        setIsValid(true);
      }
    }
    if (action === "EDIT") {
      if (data) {
        dispatch(editPermissionAction(data, auth.accessToken));
        setIsOpen(!isOpen);
        setIsValid(false);
        setData("");
      } else {
        setIsValid(true);
      }
    }
  };
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        maxWidth={"md"}
        fullWidth={true}
        open={isOpen}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>
          <div className=''>
            <Typography variant='h5' component={"h2"} fontWeight={"bold"}>
              {action === "ADD"
                ? String.actionAdd + " quyền: "
                : String.actionEdit}
            </Typography>
          </div>
        </DialogTitle>
        <DialogContent>
          <Box autoComplete='on'>
            <Box>
              <div className=''>
                <Typography
                  fontWeight={"bold"}
                  color={"#333"}
                  component={"div"}
                >
                  Tên quyền:
                </Typography>
              </div>
              <div className='' style={{ marginTop: 2 }}>
                <TextField
                  id='outlined-name fullWidth id'
                  fullWidth
                  name='permission'
                  value={data.permission}
                  onChange={handleOnchange}
                  placeholder='Nhập tên quền'
                  error={isValid}
                  disabled={action === "EDIT" ? true : false}
                />
              </div>
            </Box>
            <Box mt={2}>
              <div className=''>
                <Typography
                  fontWeight={"bold"}
                  color={"#333"}
                  component={"div"}
                >
                  Mô tả:
                </Typography>
              </div>
              <div className=''>
                <TextField
                  id='outlined-name fullWidth id'
                  fullWidth
                  multiline
                  name='desc'
                  maxRows={4}
                  value={data.desc}
                  onChange={handleOnchange}
                  placeholder='Nhập mô tả'
                  error={isValid}
                />
              </div>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              setIsOpen(false);
              setIsValid(false);
            }}
            variant='contained'
            color='error'
          >
            Huỷ
          </Button>
          <Button
            onClick={handleSubmit}
            autoFocus
            variant='contained'
            color='primary'
          >
            {action === "ADD" ? "Thêm mới" : "Lưu lại"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
