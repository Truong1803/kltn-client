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
import {
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { getALLPaymentAction } from "../../redux/action/PaymentAction";
import { researchOfferAction } from "../../redux/action/ResearchAction";
export default function SuggestPaymentModal({
  isOpen,
  action,
  item,
  setIsOpen,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [reward_name, setReward_name] = useState();
  const [isValid, setIsValid] = useState(false);
  const [data, setData] = useState({});
  const auth = useSelector((state) => state.AuthReducer);
  const rewards = useSelector((state) => state.PaymentReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    setData(item);
  }, [action, item]);
  useEffect(() => {
    getReward();
  }, []);

  const getReward = () => {
    dispatch(getALLPaymentAction(auth.accessToken));
  };
  const handleSubmit = () => {
    if (data) {
      dispatch(
        researchOfferAction(
          data._id,
          "offer",
          { reward_id: reward_name },
          auth.accessToken
        )
      );
      setIsOpen(!isOpen);
    }
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
              Lựa chọn đề xuất
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
                <Select
                  labelId='semester-name-label'
                  id='list-semester'
                  fullWidth
                  displayEmpty
                  name='reward_id'
                  value={reward_name}
                  onChange={handleOnchangeReward_name}
                  error={isValid}
                  renderValue={(reward) => {
                    if (!reward) {
                      return <small>Lựa chọn đề tài thanh toán</small>;
                    }
                    return reward.reward_name;
                  }}
                >
                  {rewards && rewards.length > 0 ? (
                    rewards.map((reward) => {
                      return (
                        <MenuItem key={reward._id} value={reward}>
                          {reward.reward_name}
                        </MenuItem>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </Select>
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
            Đề xuất
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
