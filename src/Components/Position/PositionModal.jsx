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
import { InputAdornment, TextField, Typography } from "@mui/material";
import {
  formatMoney,
  removeNonNumeric,
} from "../../Common/FormatDate/FormatDate";
import {
  createPositionAction,
  editPositionAction,
} from "../../redux/action/PositionAction";

export default function PositionModal({ isOpen, action, item, setIsOpen }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [position_name, setPosition_name] = useState();
  const [time, setTime] = useState();
  const [isValid, setIsValid] = useState(false);
  const [data, setData] = useState({});
  const auth = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (action === "EDIT") {
      setPosition_name(item.position_name);
      setTime(item.reduced);
      setData(item);
    } else if (action === "ADD") {
      setPosition_name("");
      setTime("");
    }
  }, [action, item]);
  const handleSubmit = () => {
    let newData = {
      position_name: position_name,
      reduced: removeNonNumeric(time),
    };
    if (action === "ADD") {
      if (newData.position_name !== "" && newData.reduced !== "") {
        dispatch(createPositionAction(newData, auth.accessToken));
        setIsOpen(!isOpen);
        setPosition_name("");
        setTime("");
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    } else {
      if (position_name !== "" && time !== "") {
        data.reduced = time;
        data.position_name = position_name;
        dispatch(editPositionAction(data, auth.accessToken));
        setIsOpen(!isOpen);
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    }
  };
  const handleOnchange = (e) => {
    const { value } = e.target;
    setTime(formatMoney(value));
  };
  const handleOnchangePosition_name = (e) => {
    const { value } = e.target;
    setPosition_name(value);
  };
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        maxWidth={"sm"}
        fullWidth={true}
        open={isOpen}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>
          <div className=''>
            <Typography variant='h5' component={"h2"} fontWeight={"bold"}>
              {action === "ADD"
                ? String.actionAdd + " định mức nghiên cứu: "
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
                  Tên chức vụ:
                </Typography>
              </div>
              <div className=''>
                <TextField
                  id='outlined-name fullWidth id'
                  fullWidth
                  name='position_name'
                  value={position_name}
                  onChange={handleOnchangePosition_name}
                  placeholder='Nhập tên chức vụ'
                  error={isValid}
                />
              </div>
            </Box>
            <Box>
              <div className=''>
                <Typography
                  fontWeight={"bold"}
                  color={"#333"}
                  component={"div"}
                  mt={2}
                >
                  Số giờ nghiên cứu được giảm:
                </Typography>
              </div>
              <div className=''>
                <TextField
                  id='outlined-name fullWidth name'
                  fullWidth
                  name='reduced'
                  value={time}
                  onChange={handleOnchange}
                  placeholder='Nhập giờ nghiên cứu'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>%</InputAdornment>
                    ),
                  }}
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
