import React, {
  forwardRef,
  useEffect,
  useState,
} from 'react';

import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CloseIcon from '@mui/icons-material/Close';
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  Grid,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import {
  styled,
  useTheme,
} from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';

import { student } from '../../Common/Students';
import { storage } from '../../Configs/Firebase/config';
import {
  getALLCategoryResearchAction,
} from '../../redux/action/CategoryAction';
import { getAllLecturerAction } from '../../redux/action/LecturersAction';
import { createResearchAction } from '../../redux/action/ResearchAction';
import { getALLSemesterAction } from '../../redux/action/SemesterAction';
import { getTaskByCategoryAction } from '../../redux/action/TaskAction';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const Input = styled("input")({
  display: "none",
});
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ApproveResearchModal({
  isOpen,
  action,
  item,
  setIsOpen,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [lecturers, setLecturers] = useState([]);
  const [students, setStudents] = useState([]);
  const [category, setCategory] = useState([]);
  const [task, setTask] = useState([]);
  const [file, setFile] = useState();
  const [memberNum, setMemberNum] = useState(0);
  const [data, setData] = useState({});
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.AuthReducer);
  const listCategory = useSelector((state) => state.CategoryReducer);
  const listTask = useSelector((state) => state.TaskReducer);
  const listSemesters = useSelector((state) => state.SemesterReducer);
  const listLecturers = useSelector((state) => state.LectureReducer);
  const getDataCategory = () => {
    dispatch(getALLCategoryResearchAction(auth.accessToken));
  };
  const getDataTask = () => {
    dispatch(getTaskByCategoryAction(category._id, auth.accessToken));
  };
  const getDataSemester = () => {
    dispatch(getALLSemesterAction(auth.accessToken));
  };
  const getDataLecturer = () => {
    dispatch(getAllLecturerAction("", "", auth.accessToken));
  };
  useEffect(() => {
    getDataCategory();
    getDataSemester();
    getDataLecturer();
  }, []);
  useEffect(() => {
    if (item) {
      if (action === "EDIT") {
        setCategory(item?.category_research_id?.name);
      }
    }
  }, [item]);

  useEffect(() => {
    if (category.length !== 0) {
      setTask([]);
      getDataTask();
    }
  }, [category]);

  const handleChangeCategory = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(value);
  };
  const handleChangeTask = (event) => {
    const {
      target: { value },
    } = event;
    setTask(value);
  };
  const handleChangeLecture = (event, value) => setLecturers(value);
  const handleChangeStudent = (event, value) => setStudents(value);
  const handleChangeMemberNum = (e) => {
    const { value } = e.target;
    setMemberNum(value);
  };
  const handleChangeFile = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = () => {
    let listLecturer = lecturers?.map((lecturer, index) => {
      return { lecture: lecturer._id, name: lecturer.name };
    });
    const date = new Date();
    const storageRef = ref(storage, `research/${date.getTime() + file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => {
            const groupData = {
              auth_lecture: listLecturer,
              category_research_id: category,
              research_detail_id: task,
              auth_student: students,
              file: url,
              member_number: parseInt(memberNum),
            };
            Object.entries(groupData).forEach(([key, value]) => {
              data[key] = value;
            });
          })
          .then(() => {
            dispatch(createResearchAction(data, auth.accessToken));
          })
          .then();
      }
    );
  };
  return (
    <div>
      <Dialog fullScreen open={isOpen} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Cập nhật bài nghiên cứu {item.name}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box padding={3}>
          <Box autoComplete="on">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box>
                  <div className="">
                    <Typography
                      fontWeight={"bold"}
                      color={"#333"}
                      component={"div"}
                    >
                      Đề tài:
                    </Typography>
                  </div>
                  <div className="">
                    <Select
                      labelId="list-category-label"
                      id="list-category"
                      fullWidth
                      displayEmpty
                      value={category}
                      onChange={handleChangeCategory}
                      renderValue={(category) => {
                        if (category.length === 0) {
                          return <small>Lựa chọn danh mục</small>;
                        }
                        return category.name;
                      }}
                    >
                      {listCategory?.length > 0 ? (
                        listCategory?.map((category) => (
                          <MenuItem
                            key={category._id}
                            value={{ _id: category._id, name: category.name }}
                          >
                            <ListItemText primary={category.name} />
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled value=""></MenuItem>
                      )}
                    </Select>
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <div className="">
                    <Typography
                      fontWeight={"bold"}
                      color={"#333"}
                      component={"div"}
                    >
                      Công việc:
                    </Typography>
                  </div>
                  <div className="">
                    <Select
                      labelId="list-task-label"
                      id="list-task"
                      fullWidth
                      displayEmpty
                      value={task}
                      onChange={handleChangeTask}
                      disabled={category.length === 0 ? true : false}
                      renderValue={() => {
                        if (task.length === 0) {
                          return <small>Lựa chọn công việc</small>;
                        }
                        return task.research_detail_name;
                      }}
                    >
                      {listTask?.length > 0 ? (
                        listTask?.map((task) => (
                          <MenuItem
                            key={task._id}
                            value={{
                              _id: task._id,
                              research_detail_name: task.research_detail_name,
                              standard_time: task.standard_time,
                            }}
                          >
                            <ListItemText primary={task.research_detail_name} />
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled value=""></MenuItem>
                      )}
                    </Select>
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <div className="">
                    <Typography
                      fontWeight={"bold"}
                      color={"#333"}
                      component={"div"}
                      mt={2}
                    >
                      Tên bài nghiên cứu:
                    </Typography>
                  </div>
                  <div className="">
                    <TextField
                      id="outlined-name fullWidth name"
                      fullWidth
                      name="topic_name"
                      onChange={handleChangeValue}
                      placeholder="Nhập tên bài nghiên cứu"
                      error={isValid}
                    />
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography
                    fontWeight={"bold"}
                    color={"#333"}
                    component={"div"}
                    mt={2}
                  >
                    Học kỳ:
                  </Typography>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="list-lecturer"
                    fullWidth
                    displayEmpty
                    value={data.semester_id ? data.semester_id : ""}
                    name="semester_id"
                    onChange={handleChangeValue}
                    renderValue={(semester) => {
                      if (semester) {
                        return (
                          semester.semester_name + " năm học " + semester.year
                        );
                      } else return <em>Lựa chọn kỳ học</em>;
                    }}
                  >
                    {listSemesters?.length > 0
                      ? listSemesters?.map((semester) => (
                          <MenuItem
                            key={semester._id}
                            value={{
                              _id: semester._id,
                              semester_name: semester.semester_name,
                              year: semester.year,
                              status: semester.status,
                            }}
                          >
                            <ListItemText
                              primary={
                                semester.semester_name +
                                " năm học " +
                                semester.year
                              }
                            />
                          </MenuItem>
                        ))
                      : ""}
                  </Select>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography
                    fontWeight={"bold"}
                    color={"#333"}
                    component={"div"}
                    mt={2}
                  >
                    Đường dẫn:
                  </Typography>
                  <div>
                    <TextField
                      id="outlined-name link"
                      fullWidth
                      name="link"
                      onChange={handleChangeValue}
                      placeholder="Nhập đường dẫn"
                      error={isValid}
                    />
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography
                    fontWeight={"bold"}
                    color={"#333"}
                    component={"div"}
                    mt={2}
                  >
                    Số người tham gia:
                  </Typography>
                  <div>
                    <TextField
                      id="outlined-name member_number"
                      fullWidth
                      name="member_number"
                      onChange={handleChangeMemberNum}
                      placeholder="Nhập số người tham gia"
                      error={isValid}
                      type={"number"}
                    />
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography
                    fontWeight={"bold"}
                    color={"#333"}
                    component={"div"}
                    mt={2}
                  >
                    Danh sách giảng viên:
                  </Typography>
                  <Autocomplete
                    multiple
                    fullWidth
                    id="lecturer"
                    options={listLecturers}
                    getOptionLabel={(option) => option.name}
                    onChange={handleChangeLecture}
                    disableCloseOnSelect
                    renderOption={(props, option, { selected }) => (
                      <li {...props} key={option._id}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        <Avatar
                          src={option.avatar}
                          alt={`avatar ${option.name}`}
                          sx={{ width: "1.5rem", height: "1.5rem", mr: 1 }}
                        />
                        {option.name}
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Chọn giảng viên" />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography
                    fontWeight={"bold"}
                    color={"#333"}
                    component={"div"}
                    mt={2}
                  >
                    Danh sách sinh viên:
                  </Typography>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={student}
                    onChange={handleChangeStudent}
                    fullWidth
                    multiple
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option, { selected }) => (
                      <li {...props} key={option._id}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        <Avatar
                          src={option.avatar}
                          alt={`avatar ${option.id}`}
                          sx={{ width: "1.5rem", height: "1.5rem", mr: 1 }}
                        />
                        {option.id + " " + option.name}
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Nhập thông tin sinh viên"
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography
                    fontWeight={"bold"}
                    color={"#333"}
                    component={"div"}
                    mt={2}
                  >
                    File đính kèm:
                  </Typography>
                  {file ? (
                    <Chip
                      label={file.name}
                      sx={{ mr: 2 }}
                      onDelete={() => setFile(null)}
                    />
                  ) : (
                    ""
                  )}
                  <label htmlFor="contained-button-file">
                    <Input
                      // accept='docx'
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={handleChangeFile}
                    />

                    <Button
                      variant="contained"
                      component="span"
                      color="success"
                    >
                      Upload
                    </Button>
                  </label>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Button
            variant="contained"
            sx={{ mt: 2, float: "right" }}
            size="large"
            onClick={handleSubmit}
            disabled={file ? false : true}
          >
            Đăng bài nghiên cứu
          </Button>
        </Box>
      </Dialog>
    </div>
  );
}
