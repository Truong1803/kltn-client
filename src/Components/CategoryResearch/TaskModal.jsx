import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import String from "../../Common/String/String";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import { TextField, Typography, MenuItem } from "@mui/material";
import {
  createTaskAction,
  editTaskAction,
} from "../../redux/action/TaskAction";
export default function TaskModal({ isOpen, action, item, setIsOpen }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [data, setData] = useState(item);
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.AuthReducer);
  useEffect(() => {
    if (action === "EDIT") {
      setData(item);
    } else if (action === "ADD") {
      setData("");
    }
  }, [action, item]);
  const handleSubmit = () => {
    if (action === "ADD") {
      data.category_research_id = item._id;
      if (data.research_detail_name && data.standard_time) {
        dispatch(createTaskAction(data, auth.accessToken));
        setIsOpen(!isOpen);
        setData("");
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    } else {
      if (data.research_detail_name !== "" && data.standard_time !== "") {
        dispatch(editTaskAction(data, auth.accessToken));
        setIsOpen(!isOpen);
        setData("");
        setIsValid(false);
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
        maxWidth={"sm"}
        fullWidth={true}
        open={isOpen}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>
          <div className=''>
            <Typography variant='h5' component={"h2"} fontWeight={"bold"}>
              {action === "ADD"
                ? String.actionAdd + " c??ng vi???c: "
                : String.actionEdit + " c??ng vi???c "}
            </Typography>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box autoComplete='on'>
              <Box>
                <div className=''>
                  <Typography
                    fontWeight={"bold"}
                    color={"#333"}
                    component={"div"}
                    mt={2}
                  >
                    M?? c??ng vi???c:
                  </Typography>
                </div>
                <div className=''>
                  <TextField
                    id='outlined-name fullWidth name'
                    fullWidth
                    multiline
                    name='id'
                    value={data.id}
                    onChange={handleOnchange}
                    placeholder='Nh???p n???i dung c??ng vi???c'
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
                    N???i dung c??ng vi???c:
                  </Typography>
                </div>
                <div className=''>
                  <TextField
                    id='outlined-name fullWidth name'
                    fullWidth
                    multiline
                    name='research_detail_name'
                    value={data.research_detail_name}
                    onChange={handleOnchange}
                    placeholder='Nh???p n???i dung c??ng vi???c'
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
                    Th???i gian nghi??n c???u:
                  </Typography>
                </div>
                <div className=''>
                  <TextField
                    id='outlined-name fullWidth name'
                    fullWidth
                    name='standard_time'
                    value={data.standard_time}
                    onChange={handleOnchange}
                    placeholder='Nh???p th???i gian nghi??n c???u'
                    error={isValid}
                    type={"number"}
                  />
                </div>
              </Box>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => setIsOpen(false)}
            variant='contained'
            color='error'
          >
            Hu???
          </Button>
          <Button
            onClick={handleSubmit}
            autoFocus
            variant='contained'
            color='primary'
          >
            {action === "ADD" ? "Th??m m???i" : "L??u l???i"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
