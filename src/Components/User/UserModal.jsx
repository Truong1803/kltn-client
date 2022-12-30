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
  Grid,
  ListItemText,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { getSubjectByDepartmentAction } from "../../redux/action/SubjectAction";
import {
  createLecturerAction,
  editLecturerAction,
} from "../../redux/action/LecturersAction";
import { getAllRoleAction } from "../../redux/action/RoleAction";
export default function UserModal({
  isOpen,
  action,
  item,
  setIsOpen,
  renderRank,
  renderPosition,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [data, setData] = useState(item);
  const auth = useSelector((state) => state.AuthReducer);
  const [isValid, setIsValid] = useState(false);
  const subjects = useSelector((state) => state.SubjectReducer);
  const ranks = useSelector((state) => state.RankReducer);
  const positions = useSelector((state) => state.PositionReducer);
  const departments = useSelector((state) => state.DepartmentReducer);
  const roles = useSelector((state) => state.RoleReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (action === "EDIT") {
      setData(item);
    } else if (action === "ADD") {
      setData("");
    }
  }, [action, item]);
  useEffect(() => {
    dispatch(getAllRoleAction(auth.accessToken));
  }, []);

  useEffect(() => {
    if (data.department_id) {
      if (data.department_id._id) {
        dispatch(
          getSubjectByDepartmentAction(data.department_id._id, auth.accessToken)
        );
      } else {
        dispatch(
          getSubjectByDepartmentAction(data.department_id, auth.accessToken)
        );
      }
    }
  }, [data?.department_id]);

  const handleSubmit = () => {
    if (action === "ADD") {
      if (data.id && data.name && data.gmail && data.position_id) {
        if (!data.gender || data.gender === "") {
          data.gender = "Nam";
        }
        dispatch(createLecturerAction({ ...data }, auth.accessToken));
        setIsOpen(!isOpen);
        setData("");
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    } else {
      console.log("my log test", { ...data });
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
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>
          <div className=''>
            <Typography variant='h5' component={"h2"} fontWeight={"bold"}>
              {action === "ADD"
                ? String.actionAdd + " giảng viên: "
                : String.actionEdit + " giảng viên " + item.name}
            </Typography>
          </div>
        </DialogTitle>
        <DialogContent>
          <Grid autoComplete='on' container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box>
                <div className=''>
                  <Typography
                    fontWeight={"bold"}
                    color={"#333"}
                    component={"div"}
                    mt={2}
                  >
                    Mã giảng viên:
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
                    placeholder='Nhập mã giảng viên'
                    error={isValid}
                  />
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <div className=''>
                  <Typography
                    fontWeight={"bold"}
                    color={"#333"}
                    component={"div"}
                    mt={2}
                  >
                    Tên giảng viên:
                  </Typography>
                </div>
                <div className=''>
                  <TextField
                    id='outlined-name fullWidth name'
                    fullWidth
                    name='name'
                    value={data.name}
                    onChange={handleOnchange}
                    placeholder='Nhập tên giảng viên'
                    error={isValid}
                  />
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <div className=''>
                  <Typography
                    fontWeight={"bold"}
                    color={"#333"}
                    component={"div"}
                    mt={2}
                  >
                    Ngày sinh:
                  </Typography>
                </div>
                <div className=''>
                  <TextField
                    id='outlined-name fullWidth dob'
                    fullWidth
                    name='dob'
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
                <div className=''>
                  <Typography
                    fontWeight={"bold"}
                    color={"#333"}
                    component={"div"}
                    mt={2}
                  >
                    Email:
                  </Typography>
                </div>
                <div className=''>
                  <TextField
                    id='outlined-name fullWidth'
                    fullWidth
                    name='gmail'
                    value={data.gmail}
                    onChange={handleOnchange}
                    type={"email"}
                    placeholder='Nhập email'
                    error={isValid}
                  />
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <div className=''>
                  <Typography
                    fontWeight={"bold"}
                    color={"#333"}
                    component={"div"}
                    mt={2}
                  >
                    Giới tính:
                  </Typography>
                </div>
                <div className=''>
                  <Select
                    labelId='list-gender-label'
                    id='list-gender'
                    fullWidth
                    displayEmpty
                    value={data.gender}
                    onChange={handleOnchange}
                    name='gender'
                    defaultValue={"Nam"}
                  >
                    <MenuItem value='Nam'>Nam</MenuItem>
                    <MenuItem value='Nữ'>Nữ</MenuItem>
                  </Select>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <div className=''>
                  <Typography
                    fontWeight={"bold"}
                    color={"#333"}
                    mt={2}
                    component={"div"}
                  >
                    Chức vụ:
                  </Typography>
                </div>
                <div className=''>
                  <Select
                    labelId='list-position-label'
                    id='list-position'
                    fullWidth
                    displayEmpty
                    value={data.position_id?._id || data.position_id}
                    onChange={handleOnchange}
                    name='position_id'
                    renderValue={(position) => {
                      return renderPosition(position);
                    }}
                    error={isValid}
                  >
                    {positions.length > 0 ? (
                      positions.map((position) => (
                        <MenuItem key={position._id} value={position._id}>
                          <ListItemText primary={position.position_name} />
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled value=''></MenuItem>
                    )}
                  </Select>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <div className=''>
                  <Typography
                    fontWeight={"bold"}
                    color={"#333"}
                    mt={2}
                    component={"div"}
                  >
                    Trình độ:
                  </Typography>
                </div>
                <div className=''>
                  <Select
                    labelId='list-position-label'
                    id='list-position'
                    fullWidth
                    displayEmpty
                    value={data.rank_id?._id || data.rank_id}
                    onChange={handleOnchange}
                    name='rank_id'
                    renderValue={(rank) => {
                      if (rank) {
                        return renderRank(rank);
                      } else {
                        return "Chọn trình độ";
                      }
                    }}
                  >
                    {ranks.length > 0 ? (
                      ranks.map((rank) => (
                        <MenuItem key={rank._id} value={rank._id}>
                          <ListItemText primary={rank.rank_name} />
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled value=''></MenuItem>
                    )}
                  </Select>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <div className=''>
                  <Typography
                    fontWeight={"bold"}
                    color={"#333"}
                    mt={2}
                    component={"div"}
                  >
                    Vai trò:
                  </Typography>
                </div>
                <div className=''>
                  <TextField
                    id='outlined-name fullWidth leader'
                    fullWidth
                    select
                    value={data.role?._id || data.role}
                    name='role'
                    onChange={handleOnchange}
                    error={isValid}
                  >
                    {roles.length > 0 ? (
                      roles.map((role, index) => {
                        return (
                          <MenuItem key={index} value={role._id}>
                            {role.role}
                          </MenuItem>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </TextField>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
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
                    id='outlined-name fullWidth leader'
                    fullWidth
                    select
                    value={data.department_id?._id || data.department_id}
                    name='department_id'
                    onChange={handleOnchange}
                    error={isValid}
                    placeholder='Chọn khoa quản lý'
                  >
                    <MenuItem selected disabled>
                      Chọn khoa quản lý
                    </MenuItem>
                    {departments.length > 0 ? (
                      departments.map((department, index) => {
                        return (
                          <MenuItem key={index} value={department._id}>
                            {department.name}
                          </MenuItem>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </TextField>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <div className=''>
                  <Typography
                    fontWeight={"bold"}
                    color={"#333"}
                    mt={2}
                    component={"div"}
                  >
                    Bộ môn quản lý:
                  </Typography>
                </div>
                <div className=''>
                  <TextField
                    id='outlined-name fullWidth leader'
                    fullWidth
                    select
                    value={data.subject_id?._id || data.subject_id}
                    name='subject_id'
                    onChange={handleOnchange}
                    error={isValid}
                    disabled={
                      data.department_id && data.department_id !== ""
                        ? false
                        : true
                    }
                  >
                    <MenuItem selected disabled>
                      Chọn bộ môn
                    </MenuItem>
                    {subjects.length > 0 ? (
                      subjects.map((subject, index) => {
                        return (
                          <MenuItem key={index} value={subject._id}>
                            {subject.name}
                          </MenuItem>
                        );
                      })
                    ) : (
                      <></>
                    )}
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
