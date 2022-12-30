import React, { forwardRef, useEffect, useState, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { useDispatch, useSelector } from "react-redux";
import {
  Checkbox,
  Chip,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Box,
  Button,
  Grid,
  Autocomplete,
  Avatar,
  Link,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { styled } from "@mui/material/styles";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../Configs/Firebase/config";
import { getALLCategoryResearchAction } from "../../redux/action/CategoryAction";
import { getTaskByCategoryAction } from "../../redux/action/TaskAction";
import { getALLSemesterAction } from "../../redux/action/SemesterAction";
import { getAllLecturerAction } from "../../redux/action/LecturersAction";
import {
  createResearchAction,
  editResearchAction,
  getResearchByCaseAction,
} from "../../redux/action/ResearchAction";
import { getAllDepartmentAction } from "../../redux/action/DepartmentAction";
import { getSubjectByDepartmentAction } from "../../redux/action/SubjectAction";
import ConfirmModal from "../../Common/Alert/Confirm";
import { SHOW_NOTIFICATION } from "../../redux/type/Alert";
import students from "../../Common/Students";
const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;
const Input = styled("input")({
  display: "none",
});
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function AddResearch({ isOpen, action, item, setIsOpen }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [category, setCategory] = useState([]);
  const [task, setTask] = useState([]);
  const [department, setDepartment] = useState([]);
  const [subject, setSubject] = useState([]);
  const [file, setFile] = useState();
  const [memberNum, setMemberNum] = useState(0);
  const [data, setData] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [hasLecturer, setHasLecturer] = useState([]);
  const [dataLec, setDataLec] = useState([]);
  const [hasStudent, setHasStudent] = useState([]);
  const [dataStu, setDataStu] = useState([]);
  const [unit, setUnit] = useState(1);
  const [listDepartment, setListDepartment] = useState([]);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.AuthReducer);
  const listCategory = useSelector((state) => state.CategoryReducer);
  const listTask = useSelector((state) => state.TaskReducer);
  const listSemesters = useSelector((state) => state.SemesterReducer);
  const listLecturers = useSelector((state) => state.LectureReducer);
  const listDepartments = useSelector((state) => state.DepartmentReducer);
  const listSubject = useSelector((state) => state.SubjectReducer);
  const permission = useSelector((state) => state.CheckPermissionReducer);
  const roles = useSelector((state) => state.RoleReducer);
  const info = useSelector((state) => state.UserAuthReducer);
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
  const getDataDepartment = () => {
    dispatch(getAllDepartmentAction(auth.accessToken));
  };
  const getDataSubjectByDepartment = (departmentId) => {
    if (departmentId) {
      dispatch(getSubjectByDepartmentAction(departmentId, auth.accessToken));
    }
  };

  useEffect(() => {
    getDataCategory();
    getDataSemester();
    getDataLecturer();
    getDataDepartment();
  }, []);
  useEffect(() => {
    if (action === "EDIT") {
      setHasLecturer(item.auth_lecture);
      setHasStudent(item.auth_student);
    } else if (action === "ADD") {
      setHasLecturer([]);
      setHasStudent([]);
    }
  }, [action, item]);
  useEffect(() => {
    if (listLecturers) {
      filterDataLecture(listLecturers, hasLecturer);
    }
  }, [hasLecturer]);
  useEffect(() => {
    if (students) {
      filterDataStudent(students, hasStudent);
    }
  }, [hasStudent]);
  useEffect(() => {
    if (listLecturers) {
      setDataLec(listLecturers);
    }
  }, [listLecturers]);
  useEffect(() => {
    if (students) {
      setDataStu(students);
    }
  }, [hasStudent]);
  const filterDataLecture = (arr1, arr2) => {
    if (arr1.length > 0 && arr2.length > 0) {
      const finalArr = arr1.filter((a) => {
        return !arr2.some((b) => {
          return a["_id"] === b["_id"];
        });
      });
      setDataLec(finalArr);

      return finalArr;
    }
  };
  const filterDataStudent = (arr1, arr2) => {
    if (arr1.length > 0) {
      const finalArr = arr1.filter((a) => {
        return !arr2.some((b) => {
          return a["_id"] === b["_id"];
        });
      });
      setDataStu(finalArr);
      return finalArr;
    }
  };
  useEffect(() => {
    if (roles.id_role === "TK") {
      setListDepartment(info.department_id);
    } else {
      setListDepartment(listDepartments);
    }
  }, [roles, listDepartments]);
  useEffect(() => {
    if (category.length !== 0) {
      if (action !== "EDIT") {
        setTask([]);
      } else {
        setTask(item.research_detail_id);
      }
      getDataTask();
    }
  }, [category]);
  useEffect(() => {
    if (action === "EDIT") {
      setData(item);
      setCategory(item.category_research_id);
      setDepartment(item.department_id);
      setSubject(item.subject_id);
      setMemberNum(item.member_number);
      setUnit(item.unit);
    }
  }, [item]);

  useEffect(() => {
    if (listDepartment.length !== 0) {
      if (action !== "EDIT") {
        setSubject("");
      }
      getDataSubjectByDepartment(department._id);
    }
  }, [department]);

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
  const handleChangeDepartment = (event) => {
    const {
      target: { value },
    } = event;
    setDepartment(value);
  };
  const handleChangeSubject = (event) => {
    const {
      target: { value },
    } = event;
    setSubject(value);
  };

  const handleChangeLecture = (event, value) => {
    setHasLecturer(value);
  };
  const handleChangeStudent = (event, value) => {
    setHasStudent(value);
  };
  const handleChangeMemberNum = (e) => {
    const { value } = e.target;
    setMemberNum(value);
  };
  const handleChangeUnit = (e) => {
    const { value } = e.target;
    setUnit(parseInt(value));
  };
  const handleChangeFile = (e) => {
    if (e.target.files[0]) {
      console.log(e.target.files[0]);
      setFile(e.target.files[0]);
    }
  };

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const submitByFile = () => {
    let listLecturer = hasLecturer.map((lecturer, index) => {
      if (lecturer.lecture) {
        return { lecture: lecturer.lecture, name: lecturer.name };
      } else {
        return { lecture: lecturer._id, name: lecturer.name };
      }
    });
    Array.from(new Set(listLecturer));
    let checkMember = listLecturer.length + hasStudent.length;
    if (checkMember !== parseInt(memberNum)) {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: {
          status: "error",
          message: "Số lượng người tham gia khác với giảng viên và sinh viên",
        },
      });
    } else {
      const date = new Date();
      const storageRef = ref(storage, `research/${date.getTime() + file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          dispatch({
            type: SHOW_NOTIFICATION,
            payload: { status: "loading" },
          });
        },
        (error) => console.log(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
              const groupData = {
                auth_lecture: listLecturer,
                category_research_id: category,
                research_detail_id: task,
                auth_student: hasStudent,
                file: url,
                member_number: parseInt(memberNum),
                department_id: department,
                subject_id: subject,
                unit,
              };
              Object.entries(groupData).forEach(([key, value]) => {
                data[key] = value;
              });
            })
            .then(() => {
              if (action !== "EDIT") {
                dispatch(createResearchAction(data, auth.accessToken));
                getDataResearch();
              } else {
                dispatch(editResearchAction(data, auth.accessToken));
              }
            })
            .then(() => {
              getDataResearch();
            })
            .then(() => {
              setData([]);
              setSubject([]);
              setTask([]);
              setDepartment([]);
              setCategory([]);
              setFile();
              setMemberNum(0);
              setUnit(1);
              setHasLecturer([]);
              setHasStudent([]);
            });
        }
      );
    }
  };
  const submitNotFile = () => {
    {
      let listLecturer = hasLecturer.map((lecturer, index) => {
        if (lecturer.lecture) {
          return { lecture: lecturer.lecture, name: lecturer.name };
        } else {
          return { lecture: lecturer._id, name: lecturer.name };
        }
      });
      Array.from(new Set(listLecturer));
      let checkMember = listLecturer.length + hasStudent.length;
      if (checkMember !== parseInt(memberNum)) {
        dispatch({
          type: SHOW_NOTIFICATION,
          payload: {
            status: "error",
            message: "Số lượng người tham gia khác với giảng viên và sinh viên",
          },
        });
      } else {
        const groupData = {
          auth_lecture: listLecturer,
          category_research_id: category,
          research_detail_id: task,
          auth_student: hasStudent,
          file: data.file,
          member_number: parseInt(memberNum),
          department_id: department,
          subject_id: subject,
          unit,
        };
        Object.entries(groupData).forEach(([key, value]) => {
          data[key] = value;
        });
        if (action !== "EDIT") {
          dispatch(createResearchAction(data, auth.accessToken));
          setData([]);
          setSubject([]);
          setTask([]);
          setDepartment([]);
          setCategory([]);
          setFile();
          setMemberNum(0);
          setUnit(1);
          setHasLecturer([]);
          setHasStudent([]);
        } else {
          dispatch(editResearchAction(data, auth.accessToken));
        }
      }
    }
  };
  const handleSubmit = () => {
    if (file) {
      submitByFile();
    } else {
      submitNotFile();
    }
  };
  const itemUnit = (title, placeholder) => {
    return (
      <Grid item xs={12} md={6}>
        <Box>
          <div className=''>
            <Typography
              fontWeight={"bold"}
              color={"#333"}
              component={"div"}
              mt={2}
            >
              {title}
            </Typography>
          </div>
          <div className=''>
            <TextField
              id='outlined-name fullWidth name'
              fullWidth
              value={unit}
              name='unit'
              type={"number"}
              onChange={handleChangeUnit}
              placeholder={placeholder}
              error={isValid}
            />
          </div>
        </Box>
      </Grid>
    );
  };
  const renderUnit = () => {
    if (category.id === "BC") {
      if (task.id === "BC04") {
        return itemUnit("Số giờ trình bày: ", "Nhập số giờ trình bày");
      }
      if (task.id === "BC05") {
        return itemUnit("Số giờ tham dự: ", "Nhập số giờ tham dự");
      }
      if (task.id === "BC06") {
        return itemUnit("Số tín chỉ:", "Nhập số tín chỉ");
      }
    }
    if (category.id === "VS") {
      if (task.id === "VS01") {
        return itemUnit("Số trang: ", "Nhập số trang");
      }
      if (task.id === "VS02") {
        return itemUnit("Số tín chỉ: ", "Nhập số tín chỉ");
      }
      if (task.id === "VS03") {
        return itemUnit("Số tín chỉ:", "Nhập số tín chỉ");
      }
    }
  };
  const getDataResearch = () => {
    if (action !== "EDIT") {
      dispatch(
        getResearchByCaseAction("", "", "", "", "", true, "", auth.accessToken)
      );
    }
  };
  return (
    <div>
      <Dialog fullScreen open={isOpen} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
              Cập nhật bài nghiên cứu {item.name}
            </Typography>
            <IconButton
              edge='start'
              color='inherit'
              onClick={() => {
                setIsOpen(false);
                getDataResearch();
              }}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box padding={3}>
          <Box autoComplete='on'>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box>
                  <div className=''>
                    <Typography
                      fontWeight={"bold"}
                      color={"#333"}
                      component={"div"}
                    >
                      Đề tài:
                    </Typography>
                  </div>
                  <div className=''>
                    <Select
                      labelId='list-category-label'
                      id='list-category'
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
                      {listCategory.length > 0 ? (
                        listCategory.map((category) => (
                          <MenuItem
                            key={category._id}
                            value={{
                              _id: category._id,
                              name: category.name,
                              id: category.id,
                            }}
                          >
                            <ListItemText primary={category.name} />
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled value=''></MenuItem>
                      )}
                    </Select>
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <div className=''>
                    <Typography
                      fontWeight={"bold"}
                      color={"#333"}
                      component={"div"}
                    >
                      Công việc:
                    </Typography>
                  </div>
                  <div className=''>
                    <Select
                      labelId='list-task-label'
                      id='list-task'
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
                      {listTask.length > 0 ? (
                        listTask.map((task) => (
                          <MenuItem
                            key={task._id}
                            value={{
                              _id: task._id,
                              research_detail_name: task.research_detail_name,
                              standard_time: task.standard_time,
                              id: task.id,
                            }}
                          >
                            <ListItemText primary={task.research_detail_name} />
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled value=''></MenuItem>
                      )}
                    </Select>
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <div className=''>
                    <Typography
                      fontWeight={"bold"}
                      color={"#333"}
                      component={"div"}
                    >
                      Khoa:
                    </Typography>
                  </div>
                  <div className=''>
                    <Select
                      labelId='list-department-label'
                      id='list-department'
                      fullWidth
                      displayEmpty
                      value={department}
                      onChange={handleChangeDepartment}
                      renderValue={(department) => {
                        if (department.length === 0) {
                          return <small>Lựa chọn khoa</small>;
                        }
                        return department.name;
                      }}
                    >
                      {listDepartment.length > 0 ? (
                        listDepartment.map((department) => (
                          <MenuItem
                            key={department._id}
                            value={{
                              _id: department._id,
                              name: department.name,
                            }}
                          >
                            <ListItemText primary={department.name} />
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled value=''></MenuItem>
                      )}
                    </Select>
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <div className=''>
                    <Typography
                      fontWeight={"bold"}
                      color={"#333"}
                      component={"div"}
                    >
                      Bộ môn:
                    </Typography>
                  </div>
                  <div className=''>
                    <Select
                      labelId='list-subject-label'
                      id='list-subject'
                      fullWidth
                      displayEmpty
                      value={subject}
                      onChange={handleChangeSubject}
                      disabled={department.length === 0 ? true : false}
                      renderValue={() => {
                        if (subject.length === 0) {
                          return <small>Lựa chọn bộ môn</small>;
                        }
                        return subject.name;
                      }}
                    >
                      {listSubject.length > 0 ? (
                        listSubject.map((subject) => (
                          <MenuItem
                            key={subject._id}
                            value={{
                              _id: subject._id,
                              name: subject.name,
                            }}
                          >
                            <ListItemText primary={subject.name} />
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled value=''></MenuItem>
                      )}
                    </Select>
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <div className=''>
                    <Typography
                      fontWeight={"bold"}
                      color={"#333"}
                      component={"div"}
                      mt={2}
                    >
                      Tên bài nghiên cứu:
                    </Typography>
                  </div>
                  <div className=''>
                    <TextField
                      id='outlined-name fullWidth name'
                      fullWidth
                      value={data.topic_name || ""}
                      name='topic_name'
                      onChange={handleChangeValue}
                      placeholder='Nhập tên bài nghiên cứu'
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
                    labelId='demo-multiple-checkbox-label'
                    id='list-lecturer'
                    fullWidth
                    displayEmpty
                    value={data.semester_id ? data.semester_id : ""}
                    name='semester_id'
                    onChange={handleChangeValue}
                    renderValue={(semester) => {
                      if (semester) {
                        return (
                          semester.semester_name + " năm học " + semester.year
                        );
                      } else return <em>Lựa chọn kỳ học</em>;
                    }}
                  >
                    {listSemesters.length > 0
                      ? listSemesters.map((semester) => (
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
              {renderUnit()}
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
                      id='outlined-name link'
                      fullWidth
                      value={data.link || ""}
                      name='link'
                      onChange={handleChangeValue}
                      placeholder='Nhập đường dẫn'
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
                      id='outlined-name member_number'
                      fullWidth
                      value={memberNum}
                      name='member_number'
                      onChange={handleChangeMemberNum}
                      placeholder='Nhập số người tham gia'
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
                    id='lecturer'
                    value={hasLecturer}
                    options={dataLec}
                    getOptionLabel={(option) => option.name}
                    onChange={handleChangeLecture}
                    limitTags={4}
                    disableCloseOnSelect
                    filterSelectedOptions={true}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
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
                      <TextField {...params} placeholder='Chọn giảng viên' />
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
                    multiple
                    fullWidth
                    id='student'
                    value={hasStudent}
                    options={dataStu}
                    getOptionLabel={(option) => option.name}
                    onChange={handleChangeStudent}
                    limitTags={4}
                    disableCloseOnSelect
                    filterSelectedOptions={true}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
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
                        placeholder='Nhập thông tin sinh viên'
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={12}>
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
                  {item.file !== "" && !file && action === "EDIT" ? (
                    <>
                      <Link href={`${data.file}`} target={"_blank"}>
                        <Chip label={"File đính kèm"} sx={{ mr: 2 }} />
                      </Link>
                    </>
                  ) : (
                    <></>
                  )}
                  <label htmlFor='contained-button-file'>
                    <Input
                      // accept='docx'
                      id='contained-button-file'
                      multiple
                      type='file'
                      onChange={handleChangeFile}
                    />

                    <Button
                      variant='contained'
                      component='span'
                      color='success'
                    >
                      Upload
                    </Button>
                  </label>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Button
            variant='contained'
            sx={{ mt: 2, float: "right" }}
            size='large'
            onClick={handleSubmit}
          >
            {action !== "EDIT"
              ? "Đăng bài nghiên cứu"
              : "Cập nhật bài nghiên cứu"}
          </Button>
        </Box>
      </Dialog>
    </div>
  );
}
