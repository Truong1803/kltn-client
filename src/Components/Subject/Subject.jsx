import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
} from '@mui/x-data-grid';

import ConfirmModal from '../../Common/Alert/Confirm';
import { formatDate } from '../../Common/FormatDate/FormatDate';
import { getAllDepartmentAction } from '../../redux/action/DepartmentAction';
import { getAllLecturerAction } from '../../redux/action/LecturersAction';
import {
  deleteSubjectAction,
  getAllSubjectAction,
} from '../../redux/action/SubjectAction';
import SubjectDetail from './SubjectDetail';
import SubjectModal from './SubjectModal';

function Subject() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [action, setAction] = useState("");
  const [item, setItem] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const dispatch = useDispatch();
  const tableRef = useRef();
  const departments = useSelector((state) => state.DepartmentReducer);
  const lecturers = useSelector((state) => state.LectureReducer);
  const subject = useSelector((state) => state.SubjectReducer);
  const auth = useSelector((state) => state.AuthReducer);
  const permission = useSelector((state) => state.CheckPermissionReducer);

  const [dataSubject, setDataSubject] = useState();
  const getDataLecturer = () => {
    dispatch(getAllLecturerAction("", "", auth.accessToken));
  };
  const getDataDepartment = () => {
    dispatch(getAllDepartmentAction(auth.accessToken));
  };
  const getDataSubject = () => {
    dispatch(getAllSubjectAction(auth.accessToken));
  };

  useEffect(() => {
    getDataSubject();
    getDataDepartment();
    getDataLecturer();
  }, []);
  useEffect(() => {
    setDataSubject(subject);
  }, [subject]);
  const handleAction = (action, item) => {
    if (action === "DELETE") {
      setItem(item);
      setOpenDelete(true);
      setIsOpen(false);
    } else if (action === "VIEW") {
      setItem(item);
      setAction(action);
      setIsOpen(false);
      setOpenDetail(!openDetail);
    } else {
      setIsOpen(!isOpen);
      setAction(action);
      setItem(item);
    }
  };
  const renderNameLeader = (item) => {
    let lectureName = "";
    if (lecturers.length > 0) {
      lecturers.map((lecturer) => {
        if (lecturer._id === item) {
          return (lectureName = lecturer.name);
        }
      });
    }
    return lectureName;
  };
  const renderNameDepartment = (item) => {
    let departmentName = "";
    if (departments.length > 0) {
      departments.map((department) => {
        if (department._id === item) {
          departmentName = department.name;
        }
      });
    }
    return departmentName;
  };
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Mã bộ môn",
      minWidth: 120,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Tên bộ môn",
      minWidth: 220,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "department_id",
      headerName: "Khoa quản lý ",
      minWidth: 220,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return renderNameDepartment(params.value._id);
      },
    },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) => formatDate(params.row),
    },
    {
      field: "manager_id",
      headerName: "Trưởng bộ môn",
      minWidth: 220,
      flex: 1,
      headerAlign: "center",
      align: "center",

      valueGetter: (params) => {
        return renderNameLeader(params.value._id);
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
              variant="outlined"
            >
              <VisibilityIcon color="primary" />
            </Button>
            {permission.map((itemPermission) => {
              if (itemPermission.permission === "EDIT SUBJECT") {
                return (
                  <Button
                    onClick={() => handleAction("EDIT", params.row)}
                    sx={{ backgroundColor: "#fff", borderRadius: 0 }}
                    disableElevation={true}
                    variant="outlined"
                  >
                    <EditIcon color="primary" />
                  </Button>
                );
              } else {
                return;
              }
            })}
            {permission.map((itemPermission) => {
              if (itemPermission.permission === "DELETE SUBJECT") {
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
                    variant="outlined"
                  >
                    <DeleteIcon color="primary" />
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
        justifyContent="space-between"
        mb={5}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={(theme) => ({
            [theme.breakpoints.down("sm")]: { fontSize: "1.25rem" },
          })}
        >
          Danh sách bộ môn
        </Typography>
        {permission.map((itemPermission) => {
          if (itemPermission.permission === "CREATE SUBJECT") {
            return (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  handleAction("ADD", "");
                }}
              >
                <AddIcon />
              </Button>
            );
          } else {
            return;
          }
        })}
      </Stack>
      <div style={{ flex: 1 }}>
        <DataGrid
          ref={tableRef}
          rows={dataSubject}
          disableSelectionOnClick
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPage) => setPageSize(newPage)}
          autoHeight={true}
          rowsPerPageOptions={[5, 10, 50]}
          pagination
        />
      </div>
      {isOpen && (
        <SubjectModal
          handleAction={handleAction}
          isOpen={isOpen}
          action={action}
          item={item}
          lecturers={lecturers}
          departments={departments}
          setIsOpen={setIsOpen}
        />
      )}
      {openDetail && (
        <SubjectDetail
          openDetail={openDetail}
          setOpenDetail={setOpenDetail}
          item={item}
          renderNameLeader={renderNameLeader}
          renderNameDepartment={renderNameDepartment}
        />
      )}
      {openDelete && (
        <ConfirmModal
          item={item}
          deleteAction={deleteSubjectAction}
          isOpen={openDelete}
          setAction={setAction}
          setIsOpen={setOpenDelete}
        />
      )}
    </Box>
  );
}

export default Subject;
