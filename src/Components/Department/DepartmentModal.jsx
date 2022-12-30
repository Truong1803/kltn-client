import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  TextField,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box } from '@mui/system';

import String from '../../Common/String/String';
import {
  createDepartmentAction,
  editDepartmentAction,
} from '../../redux/action/DepartmentAction';

export default function DepartmentModal({
  isOpen,
  action,
  item,
  setIsOpen,
  lecturers,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [data, setData] = useState(item);
  const [isValid, setIsValid] = useState(false);
  const [lecturer, setLecturer] = useState(lecturers);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    if (action === "EDIT") {
      setData(item);
    } else if (action === "ADD") {
      setData("");
    }
    setLecturer(lecturers);
  }, [action, item, lecturers]);
  const handleSubmit = () => {
    if (action === "ADD") {
      if (data.id && data.name && data.manager_id) {
        dispatch(createDepartmentAction({ ...data }, auth.accessToken));
        setIsOpen(!isOpen);
        setData("");
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    } else {
      dispatch(editDepartmentAction({ ...data }, auth.accessToken));
      setIsOpen(!isOpen);
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
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <div className="">
            <Typography variant="h5" component={"h2"} fontWeight={"bold"}>
              {action === "ADD"
                ? String.actionAdd + " khoa: "
                : String.actionEdit + item.name}
            </Typography>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box autoComplete="on">
              <Box>
                <div className="">
                  <Typography
                    fontWeight={"bold"}
                    color={"#333"}
                    component={"div"}
                  >
                    Mã khoa:
                  </Typography>
                </div>
                <div className="">
                  <TextField
                    id="outlined-name fullWidth id"
                    fullWidth
                    name="id"
                    value={data.id}
                    onChange={handleOnchange}
                    disabled={action !== "ADD" ? true : false}
                    placeholder="Nhập mã khoa"
                    error={isValid}
                  />
                </div>
              </Box>
              <Box>
                <div className="">
                  <Typography
                    fontWeight={"bold"}
                    color={"#333"}
                    component={"div"}
                    mt={2}
                  >
                    Tên khoa:
                  </Typography>
                </div>
                <div className="">
                  <TextField
                    id="outlined-name fullWidth name"
                    fullWidth
                    name="name"
                    value={data.name}
                    onChange={handleOnchange}
                    placeholder="Nhập tên khoa"
                    error={isValid}
                  />
                </div>
              </Box>
              <Box>
                <div className="">
                  <Typography
                    fontWeight={"bold"}
                    color={"#333"}
                    mt={2}
                    component={"div"}
                  >
                    Trưởng khoa:
                  </Typography>
                </div>
                <div className="">
                  <TextField
                    id="outlined-name fullWidth leader"
                    fullWidth
                    select
                    value={data.manager_id?._id || data.manager_id}
                    name="manager_id"
                    onChange={handleOnchange}
                    error={isValid}
                  >
                    {lecturer?.map((lecturer, index) => {
                      return (
                        <MenuItem key={index} value={lecturer._id}>
                          {lecturer.name}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </div>
              </Box>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => setIsOpen(false)}
            variant="contained"
            color="error"
          >
            Huỷ
          </Button>
          <Button
            onClick={handleSubmit}
            autoFocus
            variant="contained"
            color="primary"
          >
            {action === "ADD" ? "Thêm mới" : "Lưu lại"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
