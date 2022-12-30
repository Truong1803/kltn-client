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
import { TextField, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {
  createSubjectAction,
  editSubjectAction,
} from "../../redux/action/SubjectAction";
export default function SubjectModal({
  isOpen,
  action,
  item,
  setIsOpen,
  lecturers,
  departments,
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
        dispatch(createSubjectAction({ ...data }, auth.accessToken));
        setIsOpen(!isOpen);
        setData("");
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    } else {
      dispatch(editSubjectAction({ ...data }, auth.accessToken));
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
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>
          <div className=''>
            <Typography variant='h5' component={"h2"} fontWeight={"bold"}>
              {action === "ADD"
                ? String.actionAdd + " bộ môn: "
                : String.actionEdit + item.name}
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
                  >
                    Mã bộ môn:
                  </Typography>
                </div>
                <div className=''>
                  <TextField
                    id='outlined-name fullWidth id'
                    fullWidth
                    name='id'
                    value={data.id}
                    onChange={handleOnchange}
                    disabled={action !== "ADD" ? true : false}
                    placeholder='Nhập mã bộ môn'
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
                    Tên bộ môn:
                  </Typography>
                </div>
                <div className=''>
                  <TextField
                    id='outlined-name fullWidth name'
                    fullWidth
                    name='name'
                    value={data.name}
                    onChange={handleOnchange}
                    placeholder='Nhập tên bộ môn'
                    error={isValid}
                  />
                </div>
              </Box>
              <Box>
                <div className=''>
                  <Typography
                    fontWeight={"bold"}
                    color={"#333"}
                    mt={2}
                    component={"div"}
                  >
                    Trưởng bộ môn:
                  </Typography>
                </div>
                <div className=''>
                  <TextField
                    id='outlined-name fullWidth leader'
                    fullWidth
                    select
                    value={data.manager_id?._id || data.manager_id}
                    name='manager_id'
                    onChange={handleOnchange}
                    error={isValid}
                    SelectProps={{
                      displayEmpty: true,
                    }}
                  >
                    <MenuItem selected disabled>
                      Chọn giảng viên
                    </MenuItem>
                    {lecturer.map((lecturer, index) => {
                      return (
                        <MenuItem key={index} value={lecturer._id}>
                          {lecturer.name}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </div>
              </Box>
              <Box>
                <div className=''>
                  <Typography
                    fontWeight={"bold"}
                    color={"#333"}
                    mt={2}
                    component={"div"}
                  >
                    Khoa quản lý:
                  </Typography>
                </div>
                <div className=''>
                  <TextField
                    id='outlined-name fullWidth department'
                    fullWidth
                    select
                    value={data.department_id?._id || data.department_id}
                    name='department_id'
                    onChange={handleOnchange}
                    error={isValid}
                    SelectProps={{
                      displayEmpty: true,
                    }}
                  >
                    <MenuItem>Chọn khoa quản lý</MenuItem>
                    {departments.map((department, index) => {
                      return (
                        <MenuItem key={index} value={department._id}>
                          {department.name}
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
