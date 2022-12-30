import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box } from '@mui/system';

import String from '../../Common/String/String';
import {
  createLecturerAction,
  editLecturerAction,
} from '../../redux/action/LecturersAction';
import { getALLPositionAction } from '../../redux/action/PositionAction';
import { getALLRankAction } from '../../redux/action/RankAction';
import { getSubjectByDepartmentAction } from '../../redux/action/SubjectAction';

export default function LecturerModal({
  isOpen,
  action,
  item,
  setIsOpen,
  departments,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [data, setData] = useState(item);
  const subjects = useSelector((state) => state.SubjectReducer);
  const auth = useSelector((state) => state.AuthReducer);
  const ranks = useSelector((state) => state.RankReducer);
  const positions = useSelector((state) => state.PositionReducer);
  const [isValid, setIsValid] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (action === "EDIT") {
      setData(item);
    } else if (action === "ADD") {
      setData("");
    }
  }, [action, item]);
  useEffect(() => {
    if (data.department_id) {
      dispatch(
        getSubjectByDepartmentAction(data.department_id, auth.accessToken)
      );
    }
  }, [data.department_id]);
  useEffect(() => {
    dispatch(getALLPositionAction(auth.accessToken));
    dispatch(getALLRankAction(auth.accessToken));
  }, []);

  const handleSubmit = () => {
    if (action === "ADD") {
      if (data.id && data.name && data.gmail) {
        dispatch(createLecturerAction({ ...data }, auth.accessToken));
        setIsOpen(!isOpen);
        setData("");
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    } else {
      dispatch(editLecturerAction({ ...data }, auth.accessToken));

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
        maxWidth={"md"}
        fullWidth={true}
        open={isOpen}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <div className="">
            <Typography variant="h5" component={"h2"} fontWeight={"bold"}>
              {action === "ADD"
                ? String.actionAdd + " giảng viên: "
                : String.actionEdit + " giảng viên " + item.name}
            </Typography>
          </div>
        </DialogTitle>
        <DialogContent>
          <Grid autoComplete="on" container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box>
                <div className="">
                  <Typography
                    fontWeight={"bold"}
                    color={"#333"}
                    component={"div"}
                    mt={2}
                  >
                    Mã giảng viên:
                  </Typography>
                </div>
                <div className="">
                  <TextField
                    size="small"
                    id="outlined-name fullWidth id"
                    fullWidth
                    name="id"
                    value={data.id}
                    onChange={handleOnchange}
                    disabled={action !== "ADD" ? true : false}
                    placeholder="Nhập mã giảng viên"
                    error={isValid}
                  />
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <div className="">
                  <Typography
                    fontWeight={"bold"}
                    color={"#333"}
                    component={"div"}
                    mt={2}
                  >
                    Tên giảng viên:
                  </Typography>
                </div>
                <div className="">
                  <TextField
                    size="small"
                    id="outlined-name fullWidth name"
                    fullWidth
                    name="name"
                    value={data.name}
                    onChange={handleOnchange}
                    placeholder="Nhập tên giảng viên"
                    error={isValid}
                  />
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <div className="">
                  <Typography
                    fontWeight={"bold"}
                    color={"#333"}
                    component={"div"}
                    mt={2}
                  >
                    Ngày sinh:
                  </Typography>
                </div>
                <div className="">
                  <TextField
                    size="small"
                    id="outlined-name fullWidth dob"
                    fullWidth
                    name="dob"
                    value={data.dob}
                    onChange={handleOnchange}
                    type={"date"}
                    error={isValid}
                  />
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <div className="">
                  <Typography
                    fontWeight={"bold"}
                    color={"#333"}
                    component={"div"}
                    mt={2}
                  >
                    Email:
                  </Typography>
                </div>
                <div className="">
                  <TextField
                    size="small"
                    id="outlined-name fullWidth"
                    fullWidth
                    name="gmail"
                    value={data.gmail}
                    onChange={handleOnchange}
                    type={"email"}
                    placeholder="Nhập email"
                    error={isValid}
                  />
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <div className="">
                  <Typography
                    fontWeight={"bold"}
                    color={"#333"}
                    mt={2}
                    component={"div"}
                  >
                    Giới tính:
                  </Typography>
                </div>
                <div className="">
                  <TextField
                    size="small"
                    id="outlined-name fullWidth leader"
                    fullWidth
                    select
                    name="gender"
                    onChange={handleOnchange}
                    error={isValid}
                    SelectProps={{ displayEmpty: true }}
                  >
                    <MenuItem selected disabled>
                      Chọn giới tính
                    </MenuItem>
                    <MenuItem value="Nam">Nam</MenuItem>
                    <MenuItem value="Nữ">Nữ</MenuItem>
                  </TextField>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <div className="">
                  <Typography
                    fontWeight={"bold"}
                    color={"#333"}
                    mt={2}
                    component={"div"}
                  >
                    Chức vụ:
                  </Typography>
                </div>
                <div className="">
                  <TextField
                    size="small"
                    id="outlined-name fullWidth leader"
                    fullWidth
                    select
                    name="position_id"
                    onChange={handleOnchange}
                    SelectProps={{ displayEmpty: true }}
                  >
                    <MenuItem selected disabled>
                      Lựa chọn chức vụ
                    </MenuItem>
                    {positions?.length > 0 ? (
                      positions?.map((position, index) => {
                        return (
                          <MenuItem key={index} value={position._id}>
                            {position.position_name}
                          </MenuItem>
                        );
                      })
                    ) : (
                      <MenuItem selected disabled>
                        Lựa chọn chức vụ
                      </MenuItem>
                    )}
                  </TextField>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <div className="">
                  <Typography
                    fontWeight={"bold"}
                    color={"#333"}
                    mt={2}
                    component={"div"}
                  >
                    Trình độ:
                  </Typography>
                </div>
                <div className="">
                  <TextField
                    size="small"
                    id="outlined-name fullWidth leader"
                    fullWidth
                    select
                    name="rank_id"
                    onChange={handleOnchange}
                    SelectProps={{ displayEmpty: true }}
                  >
                    <MenuItem selected disabled>
                      Lựa chọn trình độ
                    </MenuItem>
                    {ranks?.length > 0 ? (
                      ranks?.map((rank, index) => {
                        return (
                          <MenuItem key={index} value={rank._id}>
                            {rank.rank_name}
                          </MenuItem>
                        );
                      })
                    ) : (
                      <MenuItem selected disabled>
                        Lựa chọn trình độ
                      </MenuItem>
                    )}
                  </TextField>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <div className="">
                  <Typography
                    fontWeight={"bold"}
                    color={"#333"}
                    mt={2}
                    component={"div"}
                  >
                    Khoa quản lý:
                  </Typography>
                </div>
                <div className="">
                  <TextField
                    size="small"
                    id="outlined-name fullWidth leader"
                    fullWidth
                    select
                    value={data.department_id?._id || data.department_id}
                    name="department_id"
                    onChange={handleOnchange}
                    SelectProps={{ displayEmpty: true }}
                  >
                    <MenuItem selected disabled>
                      Chọn khoa quản lý
                    </MenuItem>
                    {departments?.map((department, index) => {
                      return (
                        <MenuItem key={index} value={department._id}>
                          {department.name}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <div className="">
                  <Typography
                    fontWeight={"bold"}
                    color={"#333"}
                    mt={2}
                    component={"div"}
                  >
                    Bộ môn quản lý:
                  </Typography>
                </div>
                <div className="">
                  <TextField
                    size="small"
                    id="outlined-name fullWidth leader"
                    fullWidth
                    select
                    value={data.subject_id?._id || data.subject_id}
                    name="subject_id"
                    onChange={handleOnchange}
                    error={isValid}
                    disabled={
                      data.department_id && data.department_id !== ""
                        ? false
                        : true
                    }
                    SelectProps={{ displayEmpty: true }}
                  >
                    <MenuItem selected disabled>
                      Chọn bộ môn
                    </MenuItem>
                    {subjects?.map((subject, index) => {
                      return (
                        <MenuItem key={index} value={subject._id}>
                          {subject.name}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </div>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              setIsOpen(false);
              setIsValid(false);
            }}
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
