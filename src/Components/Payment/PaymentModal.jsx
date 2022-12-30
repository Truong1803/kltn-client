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
  createPaymentAction,
  editPaymentAction,
} from "../../redux/action/PaymentAction";
export default function PaymentModal({ isOpen, action, item, setIsOpen }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [reward_name, setReward_name] = useState();
  const [amount, setAmount] = useState();
  const [isValid, setIsValid] = useState(false);
  const [data, setData] = useState({});
  const auth = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (action === "EDIT") {
      setReward_name(item.Reward_name);
      setAmount(item.amount);
      setData(item);
    } else if (action === "ADD") {
      setReward_name("");
      setAmount("");
    }
  }, [action, item]);
  const handleSubmit = () => {
    let newData = {
      reward_name: reward_name,
      amount: removeNonNumeric(amount),
    };
    if (action === "ADD") {
      if (newData.reward_name !== "" && newData.amount !== "") {
        dispatch(createPaymentAction(newData, auth.accessToken));
        setIsOpen(!isOpen);
        setReward_name("");
        setAmount("");
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    } else {
      if (reward_name !== "" && amount !== "") {
        data.amount = removeNonNumeric(amount);
        dispatch(editPaymentAction(data, auth.accessToken));
        setIsOpen(!isOpen);
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    }
  };
  const handleOnchange = (e) => {
    const { value } = e.target;
    setAmount(formatMoney(value));
  };
  const handleOnchangeReward_name = (e) => {
    const { value } = e.target;
    setReward_name(value);
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
                ? String.actionAdd + " giờ nghiên cứu: "
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
                  Loại danh mục
                </Typography>
              </div>
              <div className=''>
                <TextField
                  id='outlined-name fullWidth id'
                  fullWidth
                  name='reward_name'
                  value={reward_name}
                  onChange={handleOnchangeReward_name}
                  disabled={action !== "ADD" ? true : false}
                  placeholder='Nhập loại danh mục thanh toán'
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
                  Mức thưởng:
                </Typography>
              </div>
              <div className=''>
                <TextField
                  id='outlined-name fullWidth name'
                  fullWidth
                  name='amount'
                  value={amount}
                  onChange={handleOnchange}
                  placeholder='Nhập mức thưởng'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>VND</InputAdornment>
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
