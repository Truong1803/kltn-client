import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import AddIcon from '@mui/icons-material/Add';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import ConfirmModal from '../../Common/Alert/Confirm';
import { getAllDepartmentAction } from '../../redux/action/DepartmentAction';
import {
  deleteLecturerAction,
  getAllLecturerAction,
} from '../../redux/action/LecturersAction';
import { getALLPositionAction } from '../../redux/action/PositionAction';
import { getALLRankAction } from '../../redux/action/RankAction';
import {
  getAllSubjectAction,
  getSubjectByDepartmentAction,
} from '../../redux/action/SubjectAction';
import LectureDetail from './LectureDetail';
import LecturerModal from './LectureModal';

function Lectures() {
  const [Department, setDepartment] = useState("");
  const [Subject, setSubject] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [action, setAction] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [item, setItem] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.AuthReducer);
  const lecturers = useSelector((state) => state.LectureReducer);
  const departments = useSelector((state) => state.DepartmentReducer);
  const subjects = useSelector((state) => state.SubjectReducer);
  const ranks = useSelector((state) => state.RankReducer);
  const positions = useSelector((state) => state.PositionReducer);
  const handleChangeDepartment = (event) => {
    setDepartment(event.target.value);
  };
  const handleChangeSubject = (event) => {
    setSubject(event.target.value);
  };
  const handleAction = (action, item) => {
    if (action === "DELETE") {
      setItem(item);
      setOpenDelete(true);
      setIsOpen(false);
    } else if (action === "ADD") {
      setAction(action);
      setIsOpen(!isOpen);
    } else if (action === "EDIT") {
      setAction(action);
      setIsOpen(!isOpen);
      setItem(item);
    } else {
      setItem(item);
      setAction(action);
      setIsOpen(false);
      setOpenDetail(!openDetail);
    }
  };
  const handleDataDepartment = () => {
    dispatch(getAllDepartmentAction(auth.accessToken));
  };
  const handleDataSubjectByDepartment = (department_id) => {
    dispatch(getSubjectByDepartmentAction(department_id, auth.accessToken));
  };
  const handleDataSubject = () => {
    dispatch(getAllSubjectAction(auth.accessToken));
  };
  const handleDataLecturer = () => {
    dispatch(getAllLecturerAction(Department, Subject, auth.accessToken));
  };
  useEffect(() => {
    handleDataDepartment();
    handleDataSubject();
    dispatch(getALLPositionAction(auth.accessToken));
    dispatch(getALLRankAction(auth.accessToken));
  }, []);

  useEffect(() => {
    if (Department === "") {
      setSubject("");
    }
    if (Department._id) {
      handleDataSubjectByDepartment(Department);
    }
    handleDataLecturer();
  }, [Department, Subject]);
  const renderName = (department_id, subject_id) => {
    let departmentName = "";
    let subjectName = "";
    departments?.map((department) =>
      department._id === department_id ? (departmentName = department.name) : ""
    );
    subjects?.map((subject) =>
      subject._id === subject_id ? (subjectName = subject.name) : ""
    );
    return departmentName + " / " + subjectName;
  };
  const renderPosition = (position_id) => {
    let position_name = "";
    if (positions?.length > 0) {
      positions?.map((position) => {
        if (position._id === position_id) {
          position_name = position.position_name;
        }
      });
    }
    return position_name;
  };
  const renderRank = (rank_id) => {
    let rank_name = "";
    if (ranks?.length > 0) {
      ranks?.map((rank) => {
        if (rank._id === rank_id) {
          rank_name = rank.rank_name;
        }
      });
    }
    return rank_name;
  };
  return (
    <Box>
      <Stack
        direction={{ xs: "column", sm: "column", md: "row" }}
        alignItems={{ sm: "center" }}
        justifyContent="space-around"
        mb={5}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={(theme) => ({
            [theme.breakpoints.down("sm")]: { fontSize: "1.25rem" },
          })}
        >
          Danh sách giảng viên
        </Typography>

        <TextField
          id="outlined-select-currency"
          select
          label="Khoa"
          size="small"
          fullWidth
          sx={(theme) => ({
            [theme.breakpoints.down("sm")]: {
              width: "100vh",
            },
            [theme.breakpoints.up("sm")]: {
              width: "100vh",
            },
            [theme.breakpoints.up("md")]: {
              width: "30vh",
            },
          })}
          value={Department}
          onChange={handleChangeDepartment}
        >
          <MenuItem value={""}>Chọn khoa</MenuItem>
          {departments.map((option) => (
            <MenuItem key={option._id} value={option._id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="outlined-select-currency"
          select
          label="Bộ môn"
          size="small"
          value={Subject}
          onChange={handleChangeSubject}
          disabled={Department !== "" ? false : true}
          sx={(theme) => ({
            [theme.breakpoints.down("sm")]: {
              width: "100vh",
              marginTop: 1,
            },
            [theme.breakpoints.up("sm")]: {
              width: "100vh",
              marginTop: 2,
              marginBottom: 1,
            },
            [theme.breakpoints.up("md")]: {
              width: "30vh",
            },
          })}
        >
          <MenuItem value={""}>Chọn bộ môn</MenuItem>
          {subjects.map((option) => (
            <MenuItem key={option._id} value={option._id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleAction("ADD", "");
          }}
          sx={(theme) => ({
            [theme.breakpoints.down("sm")]: {
              marginTop: "1rem",
            },
            [theme.breakpoints.up("sm")]: {
              width: "100vh",
            },
            [theme.breakpoints.up("md")]: {
              width: "30vh",
            },
          })}
        >
          <AddIcon />
        </Button>
      </Stack>
      <Grid container spacing={2}>
        {lecturers.length > 0
          ? lecturers.map((lecturer, index) => {
              return (
                <Grid item xs sm={12} md={6} key={index}>
                  <Card sx={{ display: "flex", padding: "1rem" }}>
                    <Box>
                      <CardContent>
                        <Avatar alt="Remy Sharp" src={lecturer.avatar} />
                        <Stack
                          direction={"row"}
                          justifyContent={"center"}
                          sx={{ mt: 2 }}
                        >
                          <Box alignItems={"center"}>
                            <AssignmentIcon color="primary" />
                            <Typography variant="body2" align="center">
                              4
                            </Typography>
                          </Box>
                          <Box alignItems={"center"}>
                            <FileCopyIcon color="warning" />
                            <Typography variant="body2" align="center">
                              4
                            </Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box flexGrow={1}>
                      <CardContent>
                        <Typography variant="h6" fontWeight={"bold"}>
                          {lecturer.name}
                        </Typography>
                        <Typography variant="body1" fontWeight={"bold"}>
                          {lecturer.department_id && lecturer.subject_id
                            ? renderName(
                                lecturer.department_id,
                                lecturer.subject_id
                              )
                            : "Chưa cập nhật"}
                        </Typography>
                        <Typography variant="body2">
                          Ngày sinh: {lecturer.dob || "Chưa cập nhật"}
                        </Typography>
                        <Typography variant="body2">
                          Email: {lecturer.gmail || "Chưa cập nhật"}
                        </Typography>
                        <Typography variant="body2">
                          Trình độ:{" "}
                          {renderRank(lecturer.rank_id) || "Chưa cập nhật"}
                        </Typography>
                        <Typography variant="body2">
                          Chức vụ:
                          {renderPosition(lecturer.position_id) ||
                            "Chưa cập nhật"}
                        </Typography>

                        <Grid container spacing={1} rowSpacing={1} mt={1}>
                          <Grid xs item>
                            <Button
                              variant="contained"
                              color="success"
                              size="small"
                              fullWidth
                              onClick={() => handleAction("VIEW", lecturer)}
                            >
                              <VisibilityIcon />
                              <Typography variant="p">Xem</Typography>
                            </Button>
                          </Grid>
                          <Grid item xs>
                            <Button
                              variant="contained"
                              color="warning"
                              size="small"
                              fullWidth
                              onClick={() => handleAction("EDIT", lecturer)}
                            >
                              <EditIcon />
                              <Typography variant="p">Sửa</Typography>
                            </Button>
                          </Grid>
                          <Grid item xs>
                            <Button
                              variant="contained"
                              color="error"
                              size="small"
                              fullWidth
                              onClick={() => handleAction("DELETE", lecturer)}
                            >
                              <DeleteIcon />
                              <Typography variant="p">Delete</Typography>
                            </Button>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Box>
                  </Card>
                </Grid>
              );
            })
          : "Không có thông tin giảng viên"}
      </Grid>
      {isOpen && (
        <LecturerModal
          handleAction={handleAction}
          isOpen={isOpen}
          action={action}
          item={item}
          departments={departments}
          setIsOpen={setIsOpen}
        />
      )}
      {openDetail && (
        <LectureDetail
          openDetail={openDetail}
          setOpenDetail={setOpenDetail}
          item={item}
          renderName={renderName}
          renderRank={renderRank}
          renderPosition={renderPosition}
        />
      )}
      {openDelete && (
        <ConfirmModal
          item={item}
          deleteAction={deleteLecturerAction}
          isOpen={openDelete}
          setAction={setAction}
          setIsOpen={setOpenDelete}
        />
      )}
    </Box>
  );
}

export default Lectures;
