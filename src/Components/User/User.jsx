import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Stack,
  Typography,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import UserModal from "./UserModal";
import ConfirmModal from "../../Common/Alert/Confirm";
import {
  deleteLecturerAction,
  getAllLecturerAction,
} from "../../redux/action/LecturersAction";
import { getAllDepartmentAction } from "../../redux/action/DepartmentAction";
import LectureDetail from "../Lecturers/LectureDetail";
import {
  getAllSubjectAction,
  getSubjectByDepartmentAction,
} from "../../redux/action/SubjectAction";
import { getALLPositionAction } from "../../redux/action/PositionAction";
import { getALLRankAction } from "../../redux/action/RankAction";
import UploadModal from "./upLoadModal";
import { GET } from "../../Api/Config";
import { StyledDataGrid } from "../../Common/DataGridCustom";
function User() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [action, setAction] = useState("");
  const [item, setItem] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [department, setDepartment] = useState({ _id: "", name: "" });
  const [subject, setSubject] = useState({ _id: "", name: "" });
  const dispatch = useDispatch();
  const tableRef = useRef();
  const auth = useSelector((state) => state.AuthReducer);
  const departments = useSelector((state) => state.DepartmentReducer);
  const lecturers = useSelector((state) => state.LectureReducer);
  const listSubject = useSelector((state) => state.SubjectReducer);
  const ranks = useSelector((state) => state.RankReducer);
  const positions = useSelector((state) => state.PositionReducer);
  const permission = useSelector((state) => state.CheckPermissionReducer);
  const handleChangeDepartment = (event) => {
    const {
      target: { value },
    } = event;
    setDepartment(value);
    setSubject({ _id: "", name: "" });
  };
  const handleChangeSubject = (event) => {
    const {
      target: { value },
    } = event;
    setSubject(value);
  };
  const removeFilter = () => {
    if (subject._id !== "" || department._id !== "") {
      return (
        <Button
          variant='contained'
          color='error'
          onClick={() => {
            setDepartment({ _id: "", name: "" });
            setSubject({ _id: "", name: "" });
          }}
        >
          Xoá lọc
        </Button>
      );
    }
  };
  const handleDataDepartment = () => {
    dispatch(getAllDepartmentAction(auth.accessToken));
  };
  const handleDataLecturer = () => {
    dispatch(
      getAllLecturerAction(department._id, subject._id, auth.accessToken)
    );
  };
  const handleDataSubject = () => {
    if (department._id === "") {
      dispatch(getAllSubjectAction(auth.accessToken));
    } else {
      dispatch(getSubjectByDepartmentAction(department._id, auth.accessToken));
    }
  };
  useEffect(() => {
    handleDataDepartment();
    handleDataLecturer();
    dispatch(getALLPositionAction(auth.accessToken));
    dispatch(getALLRankAction(auth.accessToken));
  }, []);
  useEffect(() => {
    handleDataLecturer();
  }, [department, subject]);
  useEffect(() => {
    handleDataSubject();
  }, [department]);

  const handleAction = (action, item) => {
    if (action === "DELETE") {
      setItem(item);
      setOpenDelete(true);
      setIsOpen(false);
      setAction(action);
    } else if (action === "ADD") {
      setAction(action);
      setIsOpen(!isOpen);
    } else if (action === "UPLOAD") {
      setAction(action);
      setOpenUpload(!openUpload);
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

  const renderPosition = (position_id) => {
    if (!position_id) {
      return "";
    }
    let position_name = "";
    if (positions.length > 0) {
      positions.map((position) => {
        if (position._id === position_id) {
          position_name = position.position_name;
        }
      });
    }
    return position_name;
  };
  const renderRank = (rank_id) => {
    if (!rank_id) {
      return "Trình độ";
    }
    let rank_name = "";
    if (ranks.length > 0) {
      ranks.map((rank) => {
        if (rank._id === rank_id) {
          rank_name = rank.rank_name;
        }
      });
    }
    return rank_name;
  };
  const renderDepartment = (department_id) => {
    let department_name = "";
    if (departments.length > 0) {
      departments.map((department) => {
        if (department._id === department_id) {
          department_name = department.name;
        }
      });
    }
    return department_name;
  };
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 100,
      flex: 1,
      headerAlign: "center",
      align: "center",
      hide: true,
    },
    {
      field: "user",
      headerName: "Tài khoản",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return params.row.name;
      },
    },
    {
      field: "gmail",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "department_id",
      headerName: "Khoa quản lý",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        if (params.value._id) {
          return renderDepartment(params.value._id);
        } else {
          return renderDepartment(params.value);
        }
      },
    },
    {
      field: "position_id",
      headerName: "Chức vụ",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        if (params.value._id) {
          return renderPosition(params.value._id);
        } else {
          return renderPosition(params.value);
        }
      },
    },
    {
      field: "rank_id",
      headerName: "Trình độ",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        if (params.value._id) {
          return renderRank(params.value._id);
        } else {
          return renderRank(params.value);
        }
      },
    },
    {
      field: "action",
      headerAlign: "center",
      align: "center",
      headerName: "",
      minWidth: 320,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => handleAction("VIEW", params.row)}
              sx={{
                backgroundColor: "#fff",
                borderRadius: 0,
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
              }}
              disableElevation={true}
              variant='outlined'
            >
              <VisibilityIcon color='primary' />
            </Button>
            {permission.map((itemPermission) => {
              if (itemPermission.permission === "EDIT USER") {
                return (
                  <Button
                    onClick={() => handleAction("EDIT", params.row)}
                    sx={{
                      backgroundColor: "#fff",
                      borderRadius: 0,
                    }}
                    disableElevation={true}
                    variant='outlined'
                  >
                    <EditIcon color='primary' />
                  </Button>
                );
              } else {
                return;
              }
            })}
            {permission.map((itemPermission) => {
              if (itemPermission.permission === "DELETE USER") {
                return (
                  <Button
                    onClick={() => handleAction("DELETE", params.row)}
                    sx={{
                      backgroundColor: "#fff",
                      borderRadius: 0,
                      borderTopRightRadius: 5,
                      borderBottomRightRadius: 5,
                    }}
                    disableElevation={true}
                    variant='outlined'
                  >
                    <DeleteIcon color='primary' />
                  </Button>
                );
              } else {
                return;
              }
            })}
          </>
        );
      },
    },
  ];

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
          Danh sách người dùng
        </Typography>
        {permission.map((itemPermission) => {
          if (itemPermission.permission === "CREATE USER") {
            return (
              <Box>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => {
                    handleAction("ADD", "");
                  }}
                >
                  <AddIcon />
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  sx={{ marginLeft: 2 }}
                  onClick={() => {
                    handleAction("UPLOAD", "");
                  }}
                >
                  <DriveFolderUploadIcon />
                </Button>
              </Box>
            );
          } else {
            return;
          }
        })}
      </Stack>
      <Grid container sx={{ marginBottom: 3 }} spacing={3}>
        <Grid item xs={6} md={3}>
          <Box>
            <Select
              labelId='list-year-label'
              id='list-year'
              displayEmpty
              fullWidth
              value={department}
              onChange={handleChangeDepartment}
              renderValue={(department) => {
                if (department && department._id === "") {
                  return <small>Lựa chọn khoa</small>;
                }
                return department.name;
              }}
            >
              {departments?.length > 0 ? (
                departments.map((department, index) => (
                  <MenuItem
                    key={index}
                    value={{ _id: department._id, name: department.name }}
                  >
                    <ListItemText primary={department.name} />
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled value=''></MenuItem>
              )}
            </Select>
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Box>
            <Select
              labelId='list-year-label'
              id='list-year'
              displayEmpty
              fullWidth
              value={subject}
              onChange={handleChangeSubject}
              renderValue={(subject) => {
                if (subject.name === "") {
                  return <small>Lựa chọn bộ môn</small>;
                } else {
                  return subject.name;
                }
              }}
            >
              {listSubject?.length > 0 ? (
                listSubject.map((subject, index) => (
                  <MenuItem
                    key={index}
                    value={{ _id: subject._id, name: subject.name }}
                  >
                    <ListItemText primary={subject.name} />
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled value=''></MenuItem>
              )}
            </Select>
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Box height={"100%"} display='flex'>
            {removeFilter()}
          </Box>
        </Grid>
      </Grid>
      <div style={{ flex: 1 }}>
        <StyledDataGrid
          ref={tableRef}
          rows={lecturers}
          getRowId={(row) => row._id}
          disableSelectionOnClick
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPage) => setPageSize(newPage)}
          autoHeight={true}
          rowsPerPageOptions={[5, 10, 50]}
          pagination
        />
      </div>
      <UserModal
        handleAction={handleAction}
        isOpen={isOpen}
        action={action}
        item={item}
        departments={departments}
        setIsOpen={setIsOpen}
        renderRank={renderRank}
        renderPosition={renderPosition}
      />
      <UploadModal
        handleAction={handleAction}
        isOpen={openUpload}
        action={action}
        setIsOpen={setOpenUpload}
      />
      <LectureDetail
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
        item={item}
        action={action}
        view={"admin"}
      />
      <ConfirmModal
        item={item}
        deleteAction={deleteLecturerAction}
        isOpen={openDelete}
        setAction={setAction}
        setIsOpen={setOpenDelete}
      />
    </Box>
  );
}

export default User;
