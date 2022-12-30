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
  createRankAction,
  editRankAction,
} from "../../redux/action/RankAction";
export default function TimeResearchModal({ isOpen, action, item, setIsOpen }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [rank_name, setRank_name] = useState("");
  const [time, setTime] = useState();
  const [isValid, setIsValid] = useState(false);
  const [data, setData] = useState({});
  const auth = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (action === "EDIT") {
      console.log(item);
      setRank_name(item.rank_name);
      setTime(item.time_research);
      setData(item);
    } else if (action === "ADD") {
      setRank_name("");
      setTime("");
    }
  }, [action, item]);
  const handleSubmit = () => {
    let newData = {
      rank_name: rank_name,
      time_research: removeNonNumeric(time),
    };
    if (action === "ADD") {
      if (newData.rank_name !== "" && newData.time_research !== "") {
        dispatch(createRankAction(newData, auth.accessToken));
        setIsOpen(!isOpen);
        setRank_name("");
        setTime("");
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    } else {
      if (rank_name !== "" && time !== "") {
        data.time_research = time;
        dispatch(editRankAction(data, auth.accessToken));
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
  const handleOnchangeRank_name = (e) => {
    const { value } = e.target;
    setRank_name(value);
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
              {action === "ADD" ? String.actionAdd : String.actionEdit} định mức
              nghiên cứu:
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
                  Trình độ:
                </Typography>
              </div>
              <div className=''>
                <TextField
                  id='outlined-name fullWidth id'
                  fullWidth
                  name='rank_name'
                  value={rank_name}
                  onChange={handleOnchangeRank_name}
                  disabled={action !== "ADD" ? true : false}
                  placeholder='Nhập trình độ'
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
                  Thời gian nghiên cứu:
                </Typography>
              </div>
              <div className=''>
                <TextField
                  id='outlined-name fullWidth name'
                  fullWidth
                  name='time_research'
                  value={time}
                  onChange={handleOnchange}
                  placeholder='Nhập thời gian nghiên cứu'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>Giờ</InputAdornment>
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
