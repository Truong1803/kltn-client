import React, { useEffect, useState } from "react";
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
import { createResearchAction } from "../../redux/action/ResearchAction";
import { getAllDepartmentAction } from "../../redux/action/DepartmentAction";
import { getSubjectByDepartmentAction } from "../../redux/action/SubjectAction";
import { SHOW_NOTIFICATION } from "../../redux/type/Alert";
import student from "../../Common/Students";
import { getRoleByIDAction } from "../../redux/action/RoleAction";
const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;
const Input = styled("input")({
  display: "none",
});
function UpdateResearch() {
  const [lecturers, setLecturers] = useState([]);
  const [students, setStudents] = useState([]);
  const [category, setCategory] = useState([]);
  const [task, setTask] = useState([]);
  const [department, setDepartment] = useState([]);
  const [subject, setSubject] = useState([]);
  const [file, setFile] = useState();
  const [memberNum, setMemberNum] = useState(0);
  const [data, setData] = useState({});
  const [isValid, setIsValid] = useState(false);
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
  const info = useSelector((state) => state.UserAuthReducer);
  const roles = useSelector((state) => state.RoleReducer);

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
    if (category.length !== 0) {
      setTask([]);
      getDataTask();
    }
  }, [category]);
  useEffect(() => {
    if (listDepartment.length !== 0) {
      getDataSubjectByDepartment(department._id);
    }
    setSubject("");
  }, [department]);
  useEffect(() => {
    if (info.role) {
      dispatch(getRoleByIDAction(info.role, auth.accessToken));
    }
  }, [info]);
  useEffect(() => {
    if (roles.id_role === "TK") {
      setListDepartment(info.department_id);
    } else {
      setListDepartment(listDepartments);
    }
  }, [roles, listDepartments]);
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

  const handleChangeLecture = (event, value) => setLecturers(value);
  const handleChangeStudent = (event, value) => setStudents(value);
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
    let listLecturer = lecturers.map((lecturer, index) => {
      return { lecture: lecturer._id, name: lecturer.name };
    });
    let checkMember = listLecturer.length + students.length;
    if (checkMember !== parseInt(memberNum)) {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: {
          status: "error",
          message: "S??? l?????ng ng?????i tham gia kh??c v???i gi???ng vi??n v?? sinh vi??n",
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
                auth_student: students,
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
              dispatch(createResearchAction(data, auth.accessToken));
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
              setLecturers([]);
              setStudents([]);
            });
        }
      );
    }
  };
  const submitNotFile = async () => {
    {
      let listLecturer = lecturers.map((lecturer, index) => {
        return { lecture: lecturer._id, name: lecturer.name };
      });
      let checkMember = listLecturer.length + students.length;
      if (checkMember !== parseInt(memberNum)) {
        dispatch({
          type: SHOW_NOTIFICATION,
          payload: {
            status: "error",
            message: "S??? l?????ng ng?????i tham gia kh??c v???i gi???ng vi??n v?? sinh vi??n",
          },
        });
      } else {
        const groupData = {
          auth_lecture: listLecturer,
          category_research_id: category,
          research_detail_id: task,
          auth_student: students,
          file: "",
          member_number: parseInt(memberNum),
          department_id: department,
          subject_id: subject,
          unit,
        };
        Object.entries(groupData).forEach(([key, value]) => {
          data[key] = value;
        });
        await dispatch(createResearchAction(data, auth.accessToken));
        setData([]);
        setSubject([]);
        setTask([]);
        setDepartment([]);
        setCategory([]);
        setFile();
        setMemberNum(0);
        setUnit(1);
        setLecturers([]);
        setStudents([]);
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
        return itemUnit("S??? gi??? tr??nh b??y: ", "Nh???p s??? gi??? tr??nh b??y");
      }
      if (task.id === "BC05") {
        return itemUnit("S??? gi??? tham d???: ", "Nh???p s??? gi??? tham d???");
      }
      if (task.id === "BC06") {
        return itemUnit("S??? t??n ch???:", "Nh???p s??? t??n ch???");
      }
    }
    if (category.id === "VS") {
      if (task.id === "VS01") {
        return itemUnit("S??? trang: ", "Nh???p s??? trang");
      }
      if (task.id === "VS02") {
        return itemUnit("S??? t??n ch???: ", "Nh???p s??? t??n ch???");
      }
      if (task.id === "VS03") {
        return itemUnit("S??? t??n ch???:", "Nh???p s??? t??n ch???");
      }
    }
  };
  return (
    <Box>
      <Stack
        direction={{ sm: "row" }}
        alignItems={{ sm: "center" }}
        justifyContent='space-between'
        mb={5}
      >
        <Typography
          variant='h4'
          gutterBottom
          sx={(theme) => ({
            [theme.breakpoints.down("sm")]: { fontSize: "1.25rem" },
          })}
        >
          C???p nh???t b??i nghi??n c???u
        </Typography>
      </Stack>
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
                  ????? t??i:
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
                      return <small>L???a ch???n danh m???c</small>;
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
                  C??ng vi???c:
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
                      return <small>L???a ch???n c??ng vi???c</small>;
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
                      return <small>L???a ch???n khoa</small>;
                    }
                    return department.name;
                  }}
                >
                  {listDepartment.length > 0 ? (
                    listDepartment.map((department) => (
                      <MenuItem
                        key={department._id}
                        value={{ _id: department._id, name: department.name }}
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
                  B??? m??n:
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
                      return <small>L???a ch???n b??? m??n</small>;
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
                  T??n b??i nghi??n c???u:
                </Typography>
              </div>
              <div className=''>
                <TextField
                  id='outlined-name fullWidth name'
                  fullWidth
                  value={data.topic_name || ""}
                  name='topic_name'
                  onChange={handleChangeValue}
                  placeholder='Nh???p t??n b??i nghi??n c???u'
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
                H???c k???:
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
                    return semester.semester_name + " n??m h???c " + semester.year;
                  } else return <em>L???a ch???n k??? h???c</em>;
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
                            semester.semester_name + " n??m h???c " + semester.year
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
                ???????ng d???n:
              </Typography>
              <div>
                <TextField
                  id='outlined-name link'
                  fullWidth
                  value={data.link || ""}
                  name='link'
                  onChange={handleChangeValue}
                  placeholder='Nh???p ???????ng d???n'
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
                S??? ng?????i tham gia:
              </Typography>
              <div>
                <TextField
                  id='outlined-name member_number'
                  fullWidth
                  value={memberNum}
                  name='member_number'
                  onChange={handleChangeMemberNum}
                  placeholder='Nh???p s??? ng?????i tham gia'
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
                Danh s??ch gi???ng vi??n:
              </Typography>
              <Autocomplete
                multiple
                fullWidth
                id='lecturer'
                value={lecturers}
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
                  <TextField {...params} placeholder='Ch???n gi???ng vi??n' />
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
                Danh s??ch sinh vi??n:
              </Typography>
              <Autocomplete
                disablePortal
                id='combo-box-demo'
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
                    placeholder='Nh???p th??ng tin sinh vi??n'
                  />
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            {permission.map((itemPermission) => {
              if (itemPermission.permission === "CREATE DOCUMENT") {
                return (
                  <Box>
                    <Typography
                      fontWeight={"bold"}
                      color={"#333"}
                      component={"div"}
                      mt={2}
                    >
                      File ????nh k??m:
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
                );
              } else {
                return;
              }
            })}
          </Grid>
        </Grid>
      </Box>

      <Button
        variant='contained'
        sx={{ mt: 2, float: "right" }}
        size='large'
        onClick={handleSubmit}
      >
        ????ng b??i nghi??n c???u
      </Button>
    </Box>
  );
}

export default UpdateResearch;
